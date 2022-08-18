import { boot } from 'quasar/wrappers';
import loadingAnimation from '../components/ui/LoadingAnimation.vue';

export default boot(({ app }) => {
	app.component(loadingAnimation);
});
