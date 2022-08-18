<template>
	<div>
		<q-header>
			<q-toolbar class="bg-dark row justify-between fixed toolbar">
				<div class="auth-bar">
					<auth-bar></auth-bar>
				</div>
				<div class="name-bar row justify-center">
					<router-link to="/home" class="home">
						<h4>Oak's Lab</h4>
					</router-link>
				</div>
				<div class="menu-bar">
					<menu-bar></menu-bar>
				</div>
			</q-toolbar>
		</q-header>
		<!-- <header class="">
			<div class="nav-bar__mobile">
				<div class="mobile-bars" @click="toggleNav"></div>
				<div class="mobile-filter" @click="toggleFilter" v-if="filterShow"></div>
			</div>
			<transition name="nav-slider">
				<div class="nav-bar__cont" :class="{ active: mobileMenu, inactive: !mobileMenu }">
					<div class="mobile-close" @click="toggleNav"></div>
					<div class="nav-bar__content">
						<div class="nav-bar__left">
							<router-link @click="toggleNav" class="nav-bar__logo-cont" to="/"
								><img
									class="nav-bar__logo-img"
									src="../../assets/logo/TheSiteLogo.png"
									alt="nav-bar__logo-img"
							/></router-link>
							<div class="nav-bar__user-bar">
								<login-bar class="nav-bar__login-bar"></login-bar>
								<user-bar></user-bar>
							</div>
						</div>
						<ul class="nav-bar__nav-items">
							<transition>
								<router-link @click="toggleNav" to="/home" v-if="isLoggedIn"
									><li class="nav-bar__nav-item">
										<div class="mobile__icon-1"></div>
										Home
									</li></router-link
								>
							</transition>

							<transition>
								<router-link
									@click="toggleNav"
									:to="{ name: 'tracking' }"
									v-if="isLoggedIn"
									><li class="nav-bar__nav-item">
										<div class="mobile__icon-2"></div>
										Tracker
									</li></router-link
								></transition
							>
							<transition>
								<router-link @click="toggleNav" to="/collection" v-if="isLoggedIn"
									><li class="nav-bar__nav-item">
										<div class="mobile__icon-3"></div>
										Collection
									</li></router-link
								>
							</transition>

							<transition>
								<router-link @click="toggleNav" to="/statistics" v-if="isLoggedIn"
									><li class="nav-bar__nav-item">
										<div class="mobile__icon-4"></div>
										Statistics
									</li></router-link
								>
							</transition>
						</ul>
					</div>
				</div>
			</transition>
		</header>

		<transition name="mobile-overlay">
			<div class="nav-mobile-overlay" v-if="menuOverlay" @click="closeSliders"></div>
		</transition> -->
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AuthBar from './components/AuthBar.vue';
import MenuBar from './components/MenuBar.vue';

export default {
	components: { AuthBar, MenuBar },
	data() {
		return {
			navActive: false,
			navOverlay: false,
		};
	},
	computed: {
		...mapGetters('authorization', ['isLoggedIn']),
		...mapGetters('navigation', ['menuOverlay', 'mobileMenu']),
		filterShow() {
			return this.$route.name === 'collection' || this.$route.name === 'statistics';
		},
	},
	methods: {
		...mapActions('navigation', [
			'toggleNav',
			'toggleCollectionFilter',
			'toggleStatisticsFilter',
			'closeSliders',
		]),
		toggleNav() {
			if (window.innerWidth < 480) {
				this.toggleNav();
			}
		},
		toggleFilter() {
			if (this.$route.name === 'collection') {
				this.toggleCollectionFilter();
			}
			if (this.$route.name === 'statistics') {
				this.toggleStatisticsFilter();
			}
		},
		closeSliders() {
			this.closeSliders();
		},
	},
};
</script>

<style scoped>
.auth-bar,
.name-bar,
.menu-bar {
	width: 25%;
}

.auth-bar,
.menu-bar {
	height: 100%;
}

.home {
	text-decoration: none;
	color: white;
}

.toolbar {
	border-bottom: 0.2rem solid white;
	height: 5rem;
}

.nav-bar__cont {
	display: flex;
	position: fixed;
	justify-content: center;
	width: 100%;
	background-color: var(--bg-grey);
	border-bottom: 0.4rem solid var(--bg-offwhite2);
	box-shadow: 0px 1.5rem 1.1rem -1.1rem #0000002b;
	z-index: 10;
}

.nav-bar__mobile {
	display: none;
	align-items: center;
	justify-content: space-between;
	position: fixed;
	width: 100%;
	height: 6.5rem;
	background: var(--bg-grey);
	border-bottom: 0.3rem solid var(--bg-offwhite2);
	padding: 0 2rem;
	z-index: 10;
}

.nav-bar__content {
	max-width: 1800px;
	display: flex;
	width: 100%;
	flex-wrap: wrap;
	flex-flow: row;
	align-items: center;
	justify-content: space-between;
	padding: 0 3rem;
	font-size: 1.6rem;
}

.nav-bar__left {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.nav-bar__logo-img {
	width: 5rem;
	transition: all 1000ms;
}
.nav-bar__logo-img:hover {
	filter: saturate(130%);
	transform: scale(1.1);
	cursor: pointer;
}
.nav-bar__user-bar {
	display: flex;
	min-width: 300px;
	align-items: center;
}

.nav-bar__nav-items {
	display: flex;
	flex-wrap: wrap;
	list-style: none;
	padding: 0;
}

.nav-bar__nav-items a {
	text-decoration: none;
	transition: all 500ms;
	flex-grow: 1;
	text-align: center;
	line-height: 6.5rem;
	color: var(--bg-offwhite2);
	padding: 0 3rem;
}

.nav-bar__nav-items a:hover,
.nav-bar__nav-items a:active,
a.router-link-active {
	background-color: var(--main-red);
	transform: scale(1.1);
	cursor: pointer;
}

.nav-mobile-overlay {
	display: block;
	position: fixed;
	background: #343434da;
	width: 100%;
	height: 100%;
	z-index: 10;
}

.mobile__icon-1 {
	display: none;
	mask: url(../../assets/icons/PokeballIcon.svg) no-repeat center / contain;
	-webkit-mask: url(../../assets/icons/PokeballIcon.svg) no-repeat center / contain;
	background-color: #ffffff3f;
	width: 3rem;
	height: 3rem;
}
.mobile__icon-2 {
	display: none;
	mask: url(../../assets/icons/ShineIcon.svg) no-repeat center / contain;
	-webkit-mask: url(../../assets/icons/ShineIcon.svg) no-repeat center / contain;
	background-color: #ffffff3f;
	width: 3rem;
	height: 3rem;
}
.mobile__icon-3 {
	display: none;
	mask: url(../../assets/icons/AlphaIcon.svg) no-repeat center / contain;
	-webkit-mask: url(../../assets/icons/AlphaIcon.svg) no-repeat center / contain;
	background-color: #ffffff3f;
	width: 3rem;
	height: 3rem;
}
.mobile__icon-4 {
	display: none;
	mask: url(../../assets/icons/HeartIcon.svg) no-repeat center / contain;
	-webkit-mask: url(../../assets/icons/HeartIcon.svg) no-repeat center / contain;
	background-color: #ffffff3f;
	width: 3rem;
	height: 3rem;
}

.mobile-bars {
	display: none;
	mask: url(../../assets/icons/NavMenu.svg) no-repeat center / contain;
	-webkit-mask: url(../../assets/icons/NavMenu.svg) no-repeat center / contain;
	background-color: var(--bg-offwhite2);
	width: 3rem;
	height: 3rem;
}
.mobile-filter {
	display: none;
	mask: url(../../assets/icons/FilterList.svg) no-repeat center / contain;
	-webkit-mask: url(../../assets/icons/FilterList.svg) no-repeat center / contain;
	background-color: var(--bg-offwhite2);
	width: 3rem;
	height: 3rem;
}

.mobile-close {
	margin-right: 2rem;
	margin-top: -1rem;
	align-self: flex-end;
	display: none;
	mask: url(../../assets/icons/Close.svg) no-repeat center / contain;
	-webkit-mask: url(../../assets/icons/Close.svg) no-repeat center / contain;
	background-color: var(--bg-offwhite2);
	width: 2rem;
	height: 2rem;
}

.v-enter-from,
.v-leave-to,
.mobile-overlay-enter-from,
.mobile-overlay-leave-to {
	opacity: 0;
}

.v-enter-active {
	transition: all 0.5s ease-out;
}
.v-leave-active {
	transition: all 0.5s ease-in;
}

.v-enter-to,
.v-leave-from,
.mobile-overlay-enter-to,
.mobile-overlay-leave-from {
	opacity: 1;
}

.mobile-overlay-enter-active {
	transition: all 0.2s ease-out;
}
.mobile-overlay-leave-active {
	transition: all 0.2s ease-in;
}

.nav-slider-enter-from,
.nav-slider-leave-to {
	opacity: 0;
}

.nav-slider-enter-active {
	transition: all 0.5s ease-out;
}
.nav-slider-leave-active {
	transition: all 0.5s ease-in;
}

.nav-slider-enter-to,
.nav-slider-leave-from {
	opacity: 1;
}

@media (max-width: 77rem) {
}

@media (max-width: 48rem) {
	.nav-bar__mobile {
		display: flex;
	}
	.nav-bar__cont {
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		width: 28rem;
		height: 100%;
		border-bottom: none;
		border-right: 0.4rem solid var(--bg-offwhite2);
		padding: 3rem 0;
		box-shadow: 1.5rem 0 1.1rem -1.1rem #0000002b;
		z-index: 11;
		left: -80%;
		gap: 3rem;
		transition: 0.3s all ease-in-out;
	}

	.nav-bar__cont.active {
		left: 0;
	}
	.nav-bar__content {
		max-width: none;
		flex-direction: column;
		/* align-items: flex-start; */
		padding: 0 0;
		gap: 3rem;
	}

	.nav-bar__left {
		flex-direction: column;
		gap: 2rem;
		width: 100%;
	}

	.nav-bar__user-bar {
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		min-width: 0;
		width: 100%;
	}

	.nav-bar__nav-items {
		flex-direction: column;
		width: 100%;
	}

	.nav-bar__nav-items a {
		border-top: 0.1rem solid #ffffff3f;
		border-bottom: 0.1rem solid #ffffff3f;
		text-align: left;
	}

	.nav-bar__nav-items a:hover,
	.nav-bar__nav-items a:active,
	a.router-link-active {
		transform: scale(1);
	}

	.nav-bar__nav-item {
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	/* .nav-mobile-overlay .active {
		display: block;
	} */

	.mobile__icon-1,
	.mobile__icon-2,
	.mobile__icon-3,
	.mobile__icon-4,
	.mobile-bars,
	.mobile-close,
	.mobile-filter {
		display: block;
	}

	a.router-link-active .mobile__icon-1,
	a.router-link-active .mobile__icon-2,
	a.router-link-active .mobile__icon-3,
	a.router-link-active .mobile__icon-4 {
		background-color: var(--bg-offwhite2);
	}
}
</style>
