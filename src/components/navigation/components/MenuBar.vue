<template>
	<q-tabs active-color="light" active-bg-color="primary" shrink class="menu-cont">
		<q-route-tab label="Tracker" to="/tracker" v-if="isLoggedIn"></q-route-tab>
		<q-route-tab label="Collection" to="/collection" v-if="isLoggedIn"></q-route-tab>
		<q-route-tab label="Statistics" to="/statistics" v-if="isLoggedIn"></q-route-tab>
	</q-tabs>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	computed: {
		...mapGetters('authorization', ['isLoggedIn']),
	},
};
</script>

<style scoped>
.menu-cont {
	height: 100%;
}
</style>
