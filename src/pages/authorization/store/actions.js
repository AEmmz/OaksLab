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
// import { updateBetaKeys, getBetaKeys } from "src/util/auth/AddBetaKeysScript.js";

const PokeList = () => import("../../../assets/json/pokemonList.json");

export default {
  async getUsernamesList() {
    try {
      const dbRef = ref(getDatabase());
      const data = await get(child(dbRef, `usernames`));
      return Object.entries(data.val());
    } catch (error) {
      console.log(error);
    }
  },

  async autoAuth(context, payload) {
    try {
      context.commit("autoAuth", payload);
      const dbRef = await ref(getDatabase());
      const data = await get(child(dbRef, `users/${payload.uid}/userInfo/username`));
      if (data) {
        const userInfo = data.val();
        context.commit("setUsername", { username: userInfo });
      }
    } catch (e) {
      console.log(e);
    }
  },

  async clientAuth(context, payload) {
    try {
      const verify = await loginClientAuth(payload.email, payload.password);
      if (verify.errorArray.length > 0) {
        return verify;
      }
    } catch (e) {
      console.log(e);
    }
  },

  async clientAuthSignup(context, payload) {
    try {
      const verify = await registerClientAuth(
        payload.username,
        payload.email,
        payload.password1,
        payload.password2
        // payload.betaKey
      );
      if (verify.errorArray.length > 0) {
        return verify;
      }
    } catch (e) {
      console.log(e);
    }
  },

  async login(context, payload) {
    try {
      await signInWithEmailAndPassword(
        getAuth(),
        payload.email,
        payload.password
      );
    } catch (error) {
      const servError = error.message.split(" ")[2];
      return serverError(servError);
    }
  },

  async signup(context, payload) {
    try {
      //NEEDED FOR BETA ACCESS
      // const betaKeys = await getBetaKeys();
      // if (!betaKeys || !betaKeys.includes(payload.betaKey)) {
      //   return {
      //     error: "(auth/invalid-beta-key).",
      //     message: "Beta key is invalid or was already used. Please verify you input and try again.",
      //     field: "beta"
      //   };
      // }

      const sendInfo = await createUserWithEmailAndPassword(
        getAuth(),
        payload.email,
        payload.password1
      );

      const uid = sendInfo.user.uid;
      const dbRef = await ref(getDatabase(), "usernames");
      const dbRef2 = await ref(getDatabase(), `users/${uid}/userInfo`);

      const uName = payload.username;
      await update(dbRef, { [uName]: sendInfo.user.uid });
      await update(dbRef2, { username: uName });
      // await updateBetaKeys(payload.betaKey, betaKeys);


      const dexRef = await ref(getDatabase(), `users/${uid}/pokedex/`);
      const fetchPkDetails = await PokeList();
      const pokelist = fetchPkDetails.default.pokemon;
      // noinspection ES6MissingAwait
      pokelist.forEach(async (p) => {
        await update(dexRef, {
          [p.apiNo]: {
            name: p.name,
            type1: p.types[0],
            type2: p.types[1] || null,
            dexNo: p.dexNo,
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
      return serverError(servError);
    }
  },

  async logout({ commit }) {
    try {
      const auth = await getAuth();
      await signOut(auth);
      commit("logout");
    } catch (e) {
      console.log(e);
    }
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
    try {
      const credential = await EmailAuthProvider.credential(user.email, payload);
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
