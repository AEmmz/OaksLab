import actions from './actions.js';
import mutations from './mutations.js';
import getters from './getters.js';

import counter from '../counter/index.js';
import caughtButtons from '../caught-buttons/index.js';
import pokemonForms from '../pokemon-forms/index.js';

export default {
	modules: {
		counter: counter,
		caught: caughtButtons,
		forms: pokemonForms,
	},
	namespaced: true,
	state() {
		return {
			pkId: '',
			pkIdVar: '',
			pkName: '',
			pkType1: '',
			pkType2: '',
			pkImageNormal: '',
			pkImageShiny: '',
			pkUserInfo: null,
			pkSprite: '',
			isForms: true,
		};
	},
	mutations,
	actions,
	getters,
};
