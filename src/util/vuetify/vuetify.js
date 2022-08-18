// Styles
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { aliases, fa } from 'vuetify/iconsets/fa';
import { typeAliases, typeIcons } from './icons/type-icons';
import { caughtAliases, caughtIcons } from './icons/caught-icons';

// Icons

export default createVuetify({
	icons: {
		defaultSet: 'fa',
		aliases: {
			...aliases,
			...typeAliases,
			...caughtAliases,
		},
		sets: {
			fa,
			typeIcons,
			caughtIcons,
		},
	},
	theme: {
		defaultTheme: 'pokeCustom',
		themes: {
			pokeCustom: {
				dark: false,
				colors: {
					primary: '#343434',
					secondary: '#f5f3f5',
					accent: '#c33c54',
					background: '#d1dede',
					error: '#e91e63',
					success: '#69923a',
					success2: '#17a39d',

					default: '#5c5c5c',
					bug: '#69923a',
					dark: '#5c5c5c',
					dragon: '#3183af',
					electric: '#ceb512',
					fairy: '#f939bf',
					fighting: '#d56723',
					fire: '#ca5502',
					flying: '#0f97bd',
					ghost: '#7b62a3',
					grass: '#719e2e',
					ground: '#938239',
					ice: '#188fb4',
					normal: '#7d888c',
					poison: '#7e3c90',
					psychic: '#bd0f74',
					rock: '#87741c',
					steel: '#697377',
					water: '#31719b',
				},
			},
		},
	},
});
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
