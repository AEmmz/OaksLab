import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword
} from "firebase/auth";
import { child, get, getDatabase, ref, update } from "firebase/database";
import { loginClientAuth, registerClientAuth, serverError } from "../../../util/auth/formAuth";

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
    const data = await get(child(dbRef, `users/${payload.uid}/userInfo`));
    if (data.size === 1) {
      const userInfo = Object.entries(data.val());
      context.commit("setUsername", { username: userInfo[0][1] });
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
    const auth = getAuth();
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
      return { message: "Successfully Updated Email!" };
    } catch (e) {
      return { error: e, message: "An error occurred, please check your email and password and try again." };
    }
  }
};
