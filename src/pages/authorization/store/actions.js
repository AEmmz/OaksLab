import {
  createUserWithEmailAndPassword,
  deleteUser,
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword
} from "firebase/auth";
import { child, get, getDatabase, ref, remove, update } from "firebase/database";
import { loginClientAuth, registerClientAuth, serverError } from "src/util/auth/formAuth";

const PokeList = () => import("../../../assets/json/pokemonList.json");

export default {
  async getUsernamesList(context) {
    try {
      const dbRef = ref(getDatabase());
      const data = await get(child(dbRef, `usernames`));
      return Object.entries(data.val());
    } catch (error) {
      console.log(error);
    }
  },

  async autoAuth(context, payload) {
    context.commit("autoAuth", payload);
    const dbRef = await ref(getDatabase());
    const data = await get(child(dbRef, `users/${payload.uid}/userInfo/username`));
    if (data) {
      const userInfo = data.val();
      context.commit("setUsername", { username: userInfo });
    }
  },

  async clientAuth(context, payload) {
    const verify = await loginClientAuth(payload.email, payload.password);
    if (verify.errorArray.length > 0) {
      return verify;
    }
  },

  async clientAuthSignup(context, payload) {
    const verify = await registerClientAuth(
      payload.username,
      payload.email,
      payload.password1,
      payload.password2
    );
    if (verify.errorArray.length > 0) {
      return verify;
    }
  },

  async login(context, payload) {
    try {
      const sendInfo = await signInWithEmailAndPassword(
        getAuth(),
        payload.email,
        payload.password
      );
    } catch (error) {
      console.log(error.message);
      const servError = error.message.split(" ")[2];
      const errorHandler = await serverError(servError);
      return errorHandler;
    }
  },

  async signup(context, payload) {
    try {
      const sendInfo = await createUserWithEmailAndPassword(
        getAuth(),
        payload.email,
        payload.password1
      );

      const uid = sendInfo.user.uid;
      const dbRef = await ref(getDatabase(), "usernames");
      const dbRef2 = await ref(getDatabase(), `users/${uid}/userInfo`);

      const uName = payload.username;
      const updateUsernames = await update(dbRef, { [uName]: sendInfo.user.uid });
      const updateUsernames2 = await update(dbRef2, { username: uName });

      const dexRef = await ref(getDatabase(), `users/${uid}/pokedex/`);
      const fetchPkDetails = await PokeList();
      const pokelist = fetchPkDetails.default.pokemon;
      // noinspection ES6MissingAwait
      pokelist.forEach(async (p) => {
        const dexNo = p.dexNo;
        const name = p.name;
        const pkId = p.apiNo;
        const type1 = p.types[0];
        const type2 = p.types[1] || null;
        await update(dexRef, {
          [pkId]: {
            name: name,
            type1: type1,
            type2: type2,
            dexNo: dexNo,
            catch: {
              normalCaught: false
            }
          }
        });
      });
      context.commit("setUsername", { username: uName });
    } catch (error) {
      console.log(error.message);
      const servError = error.message.split(" ")[2];
      const errorHandler = await serverError(servError);
      return errorHandler;
    }
  },

  async logout({ commit }) {
    const auth = await getAuth();
    const logout = await signOut(auth);
    commit("logout");
  },

  async updatePasswordDb(context, payload) {
    const auth = await getAuth();
    const user = auth.currentUser;
    const newPassword = payload.newPass;
    const currentPassword = payload.currentPass;
    try {
      const credential = await EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
    } catch (e) {
      return { error: e, message: "An error occurred, please check your password and try again." };
    }
    try {
      await updatePassword(user, newPassword);
      return { message: "Successfully Updated Password!" };
    } catch (e) {
      return { error: e, message: "An error occurred, please check your password and try again." };
    }
  },

  async updateEmailDb(context, payload) {
    const auth = getAuth();
    const user = auth.currentUser;
    const currentPassword = payload.currentPass;
    const newEmail = payload.newEmail;
    try {
      const credential = await EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
    } catch (e) {
      return { error: e, message: "An error occurred, please check your email and password and try again." };
    }
    try {
      await updateEmail(user, newEmail);
    } catch (e) {
      return { error: e, message: "An error occurred, please check your email and password and try again." };
    }
    context.commit("setEmail", { email: newEmail });
    return { message: "Successfully Updated Email!" };

  },

  async updateUsernameDb(context, payload) {
    const usernames = await context.dispatch("getUsernamesList");
    let userList = [];
    usernames.map((user) => userList.push(user[0].toLowerCase()));
    if (userList.includes(payload.toLowerCase())) {
      return { error: "Username is already in use. Please try again." };
    }
    try {
      const uid = context.rootGetters["authorization/uid"];
      const oldUsername = context.rootGetters["authorization/username"];
      const db = await getDatabase();
      const dbRefUserList = ref(db, "usernames");
      const dbRefUserInfo = ref(db, `users/${uid}/userInfo`);
      const dbRefDeleteUser = ref(db, `usernames/${oldUsername}`);
      await update(dbRefUserList, { [payload]: uid });
      await update(dbRefUserInfo, { username: payload });
      await remove(dbRefDeleteUser);
    } catch (e) {
      return { error: "An error occurred, please try again." };
    }
    context.commit("setUsername", { username: payload });
    return { message: "Username Successfully Updated!" };

  },

  async deleteAccountDb(context, payload) {
    const auth = getAuth();
    const user = auth.currentUser;
    const currentPassword = payload;
    try {
      const credential = await EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
    } catch (e) {
      return { error: e, message: "An error occurred, please check your password and try again." };
    }
    try {
      const uid = context.rootGetters["authorization/uid"];
      const username = context.rootGetters["authorization/username"];
      const db = await getDatabase();
      const dbRefDeleteUserList = ref(db, `usernames/${username}`);
      const dbRefDeleteUserInfo = ref(db, `users/${uid}`);
      await remove(dbRefDeleteUserList);
      await remove(dbRefDeleteUserInfo);
    } catch (e) {
      return { error: e, message: "An error occurred, please check your password and try again." };
    }
    try {
      await deleteUser(user);
    } catch (e) {
      return { error: e, message: "An error occurred, please check your password and try again." };
    }
    context.commit("logout");
    return { message: "Account Successfully Deleted!" };
  }
};