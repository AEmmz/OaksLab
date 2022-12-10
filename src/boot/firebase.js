import { boot } from "quasar/wrappers";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useUserStore } from "pages/authorization/_UserStore";

const config = {
  apiKey: "AIzaSyAquwvDRvTgvwq1ka09nhoTRILea8sUhsA",
  authDomain: "theshinyobjects-ea7ba.firebaseapp.com",
  databaseURL: "https://theshinyobjects-ea7ba-default-rtdb.firebaseio.com",
  projectId: "theshinyobjects-ea7ba",
  storageBucket: "theshinyobjects-ea7ba.appspot.com",
  messagingSenderId: "783817676267",
  appId: "1:783817676267:web:2a0af5c46bd0427a9775ae"
};

const app = initializeApp(config);
const db = getFirestore(app);

export { db };

export default boot(async () => {
  const authStatus = () => {
    return new Promise((resolve, reject) => {
      try {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const userStore = useUserStore();
            userStore.autoAuth({
              isLoggedIn: true,
              uid: user.uid,
              email: user.email
            }).catch(err =>
              console.log(err));
            resolve(user);
          }
          if (!user) {
            resolve(false);
          }
        });
      } catch (error) {
        reject("Database Call Failed");
      }
    });
  };
  await authStatus();
});
