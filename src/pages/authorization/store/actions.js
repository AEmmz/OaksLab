import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	sendEmailVerification,
} from 'firebase/auth';
import { getDatabase, ref, child, get, update } from 'firebase/database';
import { loginClientAuth, serverError, registerClientAuth } from '../../../util/auth/formAuth';

const PokeList = () => import('../../../assets/json/pokemonList.json');

export default {
	async getUsernamesList(context) {
		try {
			const dbRef = ref(getDatabase());
			const data = await get(child(dbRef, `usernames`));
			const usernames = await Object.entries(data.val());
			return usernames;
		} catch (error) {
			console.log(error);
		}
	},

	async autoAuth(context, payload) {
		context.commit('autoAuth', payload);
		const dbRef = await ref(getDatabase());
		const data = await get(child(dbRef, `users/${payload.uid}/userInfo`));
		if (data.size === 1) {
			const userInfo = await Object.entries(data.val());
			context.commit('setUsername', { username: userInfo[0][1] });
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
			const servError = error.message.split(' ')[2];
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
			const dbRef = await ref(getDatabase(), 'usernames');
			const dbRef2 = await ref(getDatabase(), `users/${uid}/userInfo`);

			const uName = payload.username;
			const updateUsernames = await update(dbRef, { [uName]: sendInfo.user.uid });
			const updateUsernames2 = await update(dbRef2, { username: uName });

			const dexRef = await ref(getDatabase(), `users/${uid}/pokedex/`);
			const fetchPkDetails = await PokeList();
			const pokelist = fetchPkDetails.default.pokemon;
			pokelist.forEach(async (p) => {
				const dexNo = p.dexNo;
				const name = p.name;
				const pkId = p.apiNo;
				const type1 = p.types[0];
				const type2 = p.types[1] || null;
				const updateDb = await update(dexRef, {
					[pkId]: {
						name: name,
						type1: type1,
						type2: type2,
						dexNo: dexNo,
						catch: {
							normalCaught: false,
							shinyCaught: false,
							alphaCaught: false,
							shinyAlphaCaught: false,
							megaCaught: false,
							shinyMegaCaught: false,
							gigantamaxCaught: false,
							shinyGigantamaxCaught: false,
							pokerusCaught: false,
							shinyPokerusCaught: false,
							favoriteCaught: false,
						},
						count: {
							normalCount: 0,
							shinyCount: 0,
							alphaCount: 0,
							shinyAlphaCount: 0,
							megaCount: 0,
							shinyMegaCount: 0,
							gigantamaxCount: 0,
							shinyGigantamaxCount: 0,
							pokerusCount: 0,
							shinyPokerusCount: 0,
							favoriteCount: 0,
						},
					},
				});
			});
			context.commit('setUsername', { username: uName });
		} catch (error) {
			console.log(error.message);
			const servError = error.message.split(' ')[2];
			const errorHandler = await serverError(servError);
			return errorHandler;
		}
	},

	// async (context, payload) {
	// 	const sendInfo = await createUserWithEmailAndPassword(
	// 		getAuth(),
	// 		payload.email,
	// 		payload.password
	// 	);
	// },
	async logout({ commit }) {
		// const logout = await signOut(getters.auth);
		console.log('hi');
		const auth = await getAuth();
		const logout = await signOut(auth);
		commit('logout');
	},
};
