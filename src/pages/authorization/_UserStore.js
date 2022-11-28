import { defineStore } from "pinia";
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

const PokeList = () => import("assets/json/pokemonList.json");

export const useUserStore = defineStore("UserStore", {
  state: () => ({
    uid: null,
    currentUser: null,
    isLoggedIn: false,
    username: null,
    email: null,
    userInfo: {
      username: "",
      collectionSettings: {
        shinyView: "All Normal"
      },
      notifications: {
        whatsNew: false
      },
      selectedGame: "Scarlet / Violet"
    }
  }),

  getters: {},

  actions: {
    async getUsernamesList() {
      try {
        const dbRef = ref(getDatabase());
        const data = await get(child(dbRef, `usernames`));
        return Object.entries(data.val());
      } catch (error) {
        console.log(error);
      }
    },

    async autoAuth(userData) {
      this.isLoggedIn = userData.isLoggedIn;
      this.currentUser = userData.currentUser;
      this.uid = userData.uid;
      this.email = userData.email;
      try {
        const dbRef = await ref(getDatabase());
        const data = await get(child(dbRef, `users/${this.uid}/userInfo/username`));
        if (data) {
          this.username = data.val();
        }
      } catch (e) {
        console.log(e);
      }
    },

    async clientAuth(autoLoginInput) {
      try {
        const verify = await loginClientAuth(autoLoginInput.email, autoLoginInput.password);
        if (verify.errorArray.length > 0) {
          return verify;
        }
      } catch (e) {
        console.log(e);
      }
    },

    async clientAuthSignup(userSignupInput) {
      try {
        const verify = registerClientAuth(
          userSignupInput.username,
          userSignupInput.email,
          userSignupInput.password1,
          userSignupInput.password2
        );
        if (verify.errorArray.length > 0) {
          return verify;
        }
      } catch (e) {
        console.log(e);
      }
    },

    async login(userLoginInput) {
      try {
        await signInWithEmailAndPassword(
          getAuth(),
          userLoginInput.email,
          userLoginInput.password
        );
      } catch (error) {
        const servError = error.message.split(" ")[2];
        return serverError(servError);
      }
    },

    async signup(userSignupInput) {
      try {
        const sendInfo = await createUserWithEmailAndPassword(
          getAuth(),
          userSignupInput.email,
          userSignupInput.password1
        );

        const userUsername = userSignupInput.username;
        const uid = sendInfo.user.uid;

        const usernameDb = await ref(getDatabase(), "usernames");
        const userInfoDb = await ref(getDatabase(), `users/${uid}/userInfo`);

        await update(usernameDb, { [userUsername]: uid });
        await update(userInfoDb, {
          username: userUsername,
          collectionSettings: { shinyView: "All Normal" },
          notifications: { whatsNew: true }
        });

        const userPokedexDb = await ref(getDatabase(), `users/${uid}/pokedex/`);
        const fetchPkDetails = await PokeList();
        const pokelist = fetchPkDetails.default.pokemon;
        // noinspection ES6MissingAwait
        pokelist.forEach(async (p) => {
          await update(userPokedexDb, {
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
        this.username = userUsername;
      } catch (error) {
        const servError = error.message.split(" ")[2];
        return serverError(servError);
      }
    },

    async logout() {
      try {
        const auth = await getAuth();
        await signOut(auth);

        this.isLoggedIn = false;
        this.currentUser = null;
        this.uid = null;
        this.email = null;
        this.username = null;

      } catch (e) {
        console.log(e);
      }
    },

    async updatePasswordDb(userPaswordInputs) {
      const auth = await getAuth();
      const user = auth.currentUser;
      const newPassword = userPaswordInputs.newPass;
      const currentPassword = userPaswordInputs.currentPass;
      try {
        const credential = await EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);
      } catch (e) {
        return {
          error: e,
          message: "An error occurred, please check your password and try again."
        };
      }
      try {
        await updatePassword(user, newPassword);
        return { message: "Successfully Updated Password!" };
      } catch (e) {
        return {
          error: e,
          message: "An error occurred, please check your password and try again."
        };
      }
    },

    async updateEmailDb(userEmailInputs) {
      const auth = getAuth();
      const user = auth.currentUser;
      const currentPassword = userEmailInputs.currentPass;
      const newEmail = userEmailInputs.newEmail;
      try {
        const credential = await EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);
      } catch (e) {
        return {
          error: e,
          message: "An error occurred, please check your email and password and try again."
        };
      }
      try {
        await updateEmail(user, newEmail);
      } catch (e) {
        return {
          error: e,
          message: "An error occurred, please check your email and password and try again."
        };
      }
      this.email = newEmail;
      return { message: "Successfully Updated Email!" };
    },

    async updateUsernameDb(newUsernameInput) {
      const usernames = await this.getUsernamesList();
      let userList = [];
      usernames.map((user) => userList.push(user[0].toLowerCase()));
      if (userList.includes(newUsernameInput.toLowerCase())) {
        return { error: "Username is already in use. Please try again." };
      }
      try {
        const db = await getDatabase();
        const dbRefUserList = ref(db, "usernames");
        const dbRefUserInfo = ref(db, `users/${this.uid}/userInfo`);
        const dbRefDeleteUser = ref(db, `usernames/${this.username}`);
        await update(dbRefUserList, { [newUsernameInput]: this.uid });
        await update(dbRefUserInfo, { username: newUsernameInput });
        await remove(dbRefDeleteUser);
      } catch (e) {
        return { error: "An error occurred, please try again." };
      }
      this.username = newUsernameInput;
      return { message: "Username Successfully Updated!" };
    },

    async deleteAccountDb(userPassword) {
      const auth = getAuth();
      const user = auth.currentUser;
      try {
        const credential = await EmailAuthProvider.credential(user.email, userPassword);
        await reauthenticateWithCredential(user, credential);
      } catch (e) {
        return {
          error: e,
          message: "An error occurred, please check your password and try again."
        };
      }
      try {
        const db = await getDatabase();
        const dbRefDeleteUserList = ref(db, `usernames/${this.username}`);
        const dbRefDeleteUserInfo = ref(db, `users/${this.uid}`);
        await remove(dbRefDeleteUserList);
        await remove(dbRefDeleteUserInfo);
      } catch (e) {
        return {
          error: e,
          message: "An error occurred, please check your password and try again."
        };
      }
      try {
        await deleteUser(user);
      } catch (e) {
        return {
          error: e,
          message: "An error occurred, please check your password and try again."
        };
      }
      await this.logout();
      return { message: "Account Successfully Deleted!" };
    },

    async retrieveUserSettings() {
      const dbRef = await ref(getDatabase());
      const data = await get(child(dbRef, `users/${this.uid}/userInfo/`));
      this.userInfo = data.val();
    },

    async toggleWhatsNew(toggleValue) {
      if (this.userInfo.notifications.whatsNew === true) {
        const dbRef = await ref(getDatabase(), `users/${this.uid}/userInfo/notifications/`);
        await update(dbRef, { whatsNew: toggleValue });
        this.userInfo.notifications.whatsNew = toggleValue;
      }
    },

    async setSelectedGame(userGameSelection) {
      if (this.userInfo.selectedGame === userGameSelection) return;
      const dbRef = await ref(getDatabase(), `users/${this.uid}/userInfo/`);
      await update(dbRef, { selectedGame: userGameSelection });
      this.userInfo.selectedGame = userGameSelection;
    }
  }
});
