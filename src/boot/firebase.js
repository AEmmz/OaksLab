import { boot } from 'quasar/wrappers';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import store from '../store/index';

const config = {
	apiKey: 'AIzaSyAquwvDRvTgvwq1ka09nhoTRILea8sUhsA',
	authDomain: 'theshinyobjects-ea7ba.firebaseapp.com',
	databaseURL: 'https://theshinyobjects-ea7ba-default-rtdb.firebaseio.com',
	projectId: 'theshinyobjects-ea7ba',
	storageBucket: 'theshinyobjects-ea7ba.appspot.com',
	messagingSenderId: '783817676267',
	appId: '1:783817676267:web:2a0af5c46bd0427a9775ae',
};

export default boot(async ({ app, store }) => {
	const authStatus = () => {
		return new Promise((resolve, reject) => {
			try {
				initializeApp(config);
				const auth = getAuth();
				onAuthStateChanged(auth, (user) => {
					if (user) {
						store.dispatch('authorization/autoAuth', {
							isLoggedIn: true,
							uid: user.uid,
							currentUser: user.auth.currentUser,
							auth: auth,
						});
						resolve(user);
					}
					if (!user) {
						console.log('logged out');
						resolve(false);
					}
				});
			} catch (error) {
				reject('Database Call Failed');
			}
		});
	};

	const user = await authStatus();
});
// export default boot(({ app, store }) => {
// 	initializeApp(config);
// 	const auth = getAuth();
// 	onAuthStateChanged(auth, (user) => {
// 		if (user) {
// 			store.dispatch('authorization/autoAuth', {
// 				isLoggedIn: true,
// 				uid: user.uid,
// 				currentUser: user.auth.currentUser,
// 				auth: auth,
// 			});
// 		}
// 		if (!user) {
// 			console.log('logged out');
// 		}
// 	});
// });
