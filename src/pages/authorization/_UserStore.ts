//Firebase
import {
  createUserWithEmailAndPassword, deleteUser, EmailAuthProvider, getAuth,
  reauthenticateWithCredential, signInWithEmailAndPassword, signOut,
  updateEmail, updatePassword
} from "firebase/auth";
import { child, get, getDatabase, ref, remove, update } from "firebase/database";

//Stores
import { defineStore } from "pinia";

//Imports
import {
  loginClientAuth,
  registerClientAuth,
  serverError
} from "pages/authorization/utility/authorizationValidation";

const PokeList = () => import("assets/json/pokemonList.json");

//Interfaces
import IUser from "src/interfaces/user/IUser";
import IUserDb from "src/interfaces/user/IUserDb";
import IUserLogin from "src/interfaces/user/IUserLogin";
import IUserRegister from "src/interfaces/user/IUserRegister";
import IUserPasswordReset from "src/interfaces/user/IUserPasswordReset";
import IUserEmailReset from "src/interfaces/user/IUserEmailReset";

//Types
import { GameNameType } from "src/util/types/GameNameType";

type UserState = {
  uid: string | null,
  isLoggedIn: boolean,
  username: string | null,
  email: string | null,
  userInfo: IUserDb
}

export const useUserStore = defineStore("UserStore", {
  state: (): UserState => ({
    uid: null,
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

  actions: {
    async getUsernamesList() {
      try {
        const dbRef = ref(getDatabase());
        const rawUsernames = await get(child(dbRef, `usernames`));
        return Object.keys(rawUsernames.val() as [string, string]);
      } catch (err) {
        console.log(err);
      }
    },

    async autoAuth(userData: IUser) {
      this.isLoggedIn = userData.isLoggedIn;
      this.uid = userData.uid;
      this.email = userData.email;
      try {
        const dbRef = ref(getDatabase());
        const rawUsername = await get(child(dbRef, `users/${this.uid}/userInfo/username`));
        if (rawUsername) {
          this.username = rawUsername.val() as string;
        }
      } catch (err) {
        console.log(err);
      }
    },

    clientAuth(autoLoginInput: IUserLogin) {
      try {
        const verify = loginClientAuth(autoLoginInput.email, autoLoginInput.password);
        if (verify.errorArray.length > 0) {
          return verify;
        }
      } catch (err) {
        console.log(err);
      }
    },

    async clientAuthSignup(userSignupInput: IUserRegister) {
      try {
        const verify = await registerClientAuth(
          userSignupInput.username,
          userSignupInput.email,
          userSignupInput.password1,
          userSignupInput.password2
        );
        if (verify.errorArray.length > 0) {
          return verify;
        }
      } catch (err) {
        console.log(err);
      }
    },

    async login(userLoginInput: IUserLogin) {
      try {
        await signInWithEmailAndPassword(
          getAuth(),
          userLoginInput.email,
          userLoginInput.password
        );
      } catch (error) {
        if (error instanceof Error) {
          const servError = error.message.split(" ")[2];
          return serverError(servError);
        }
      }
    },

    async signup(userSignupInput: IUserRegister) {
      try {
        const sendInfo = await createUserWithEmailAndPassword(
          getAuth(),
          userSignupInput.email,
          userSignupInput.password1
        );

        const userUsername = userSignupInput.username;
        const uid = sendInfo.user.uid;

        const usernameDb = ref(getDatabase(), "usernames");
        const userInfoDb = ref(getDatabase(), `users/${uid}/userInfo`);

        await update(usernameDb, { [userUsername.toLowerCase()]: uid });
        await update(userInfoDb, {
          username: userUsername,
          collectionSettings: { shinyView: "All Normal" },
          notifications: { whatsNew: true }
        });

        this.username = userUsername;
      } catch (error) {
        if (error instanceof Error) {
          const servError = error.message.split(" ")[2];
          return serverError(servError);
        }
      }
    },

    async logout() {
      try {
        const auth = getAuth();
        await signOut(auth);
        this.isLoggedIn = false;
        this.uid = null;
        this.email = null;
        this.username = null;

      } catch (err) {
        console.log(err);
      }
    },

    async updatePasswordDb(userPasswordInputs: IUserPasswordReset) {
      const auth = getAuth();
      const user = auth.currentUser;
      const newPassword = userPasswordInputs.newPass;
      const currentPassword = userPasswordInputs.currentPass;
      try {
        if (!user || !user.email) {
          return {
            error: new Error("Invalid user"),
            message: "An error occurred, please check your password and try again."
          };
        }
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
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

    async updateEmailDb(userEmailInputs: IUserEmailReset) {
      const auth = getAuth();
      const user = auth.currentUser;
      const currentPassword = userEmailInputs.currentPass;
      const newEmail = userEmailInputs.newEmail;
      try {
        if (!user || !user.email) {
          return {
            error: new Error("Invalid user"),
            message: "An error occurred, please check your password and try again."
          };
        }
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
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

    async updateUsernameDb(newUsernameInput: string) {
      const usernames = await this.getUsernamesList();
      const userList: string[] = [];
      if (usernames) {
        usernames.map((user) => userList.push(user[0].toLowerCase()));
      }
      if (userList.includes(newUsernameInput.toLowerCase())) {
        return { error: "Username is already in use. Please try again." };
      }
      try {
        const db = getDatabase();
        const dbRefUserList = ref(db, "usernames");
        if (!this.uid || !this.username) {
          return {
            error: "An error occurred, please try again."
          };
        }
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

    async deleteAccountDb(userPassword: string) {
      const auth = getAuth();
      const user = auth.currentUser;
      try {
        if (!user || !user.email) {
          return {
            error: new Error("Invalid user"),
            message: "An error occurred, please check your password and try again."
          };
        }
        const credential = EmailAuthProvider.credential(user.email, userPassword);
        await reauthenticateWithCredential(user, credential);
      } catch (e) {
        return {
          error: e,
          message: "An error occurred, please check your password and try again."
        };
      }
      try {
        const db = getDatabase();
        if (!this.username || !this.uid) {
          return {
            error: new Error("Invalid user"),
            message: "An error occurred, please check your credentials and try again."
          };
        }
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
      const dbRef = ref(getDatabase());
      if (!this.uid) return;
      const rawUserInfo = await get(child(dbRef, `users/${this.uid}/userInfo/`));
      this.userInfo = rawUserInfo.val() as IUserDb;
    },

    async toggleWhatsNew(toggleValue: boolean) {
      if (this.userInfo?.notifications?.whatsNew === true && this.uid) {
        const dbRef = ref(getDatabase(), `users/${this.uid}/userInfo/notifications/`);
        await update(dbRef, { whatsNew: toggleValue });
        this.userInfo.notifications.whatsNew = toggleValue;
      } else return;
    },

    async setSelectedGame(userGameSelection: GameNameType) {
      if (this.userInfo.selectedGame === userGameSelection || !this.uid) return;
      const dbRef = ref(getDatabase(), `users/${this.uid}/userInfo/`);
      await update(dbRef, { selectedGame: userGameSelection });
      this.userInfo.selectedGame = userGameSelection;
    }
  }
});
