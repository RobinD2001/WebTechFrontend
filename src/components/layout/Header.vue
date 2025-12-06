<script setup>
	import { computed, ref } from "vue";
	import { useRoute, useRouter } from "vue-router";
	import Auth from "@/components/auth/Auth.vue";
	import { useAuth } from "@/composables/useAuth";
	import { faUser } from "@fortawesome/free-regular-svg-icons";
	import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
	import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/i18n";

	const { isAuthenticated } = useAuth();
	const showAuth = ref(false);
	const route = useRoute();
	const router = useRouter();
	const locale = computed(() => {
		const param = route.params.locale;
		if (Array.isArray(param)) return param[0] || DEFAULT_LOCALE;
		return param || DEFAULT_LOCALE;
	});
	const localeValue = computed(() => locale.value || DEFAULT_LOCALE);
	const locales = SUPPORTED_LOCALES;
	const localeFlags = {
		en: "🇬🇧",
		de: "🇩🇪",
	};
	const buttonLabel = computed(
		() => localeFlags[localeValue.value] || localeValue.value.toUpperCase()
	);

	const switchLocale = (targetLocale) => {
		if (targetLocale === localeValue.value) return;
		router.push({
			name: route.name || "home",
			params: { ...route.params, locale: targetLocale },
			query: route.query,
			hash: route.hash,
		});
	};

	const toggleLocale = () => {
		const idx = locales.indexOf(localeValue.value);
		const next = locales[(idx + 1) % locales.length] || DEFAULT_LOCALE;

		switchLocale(next);
	};

	const openAuth = () => {
		showAuth.value = true;
	};
</script>

<template>
	<BNavbar toggleable="sm" class="bg-body-tertiary" aria-label="Main navigation">
		<BContainer fluid class="d-flex align-items-center">
			<BNavbarBrand
				:to="{ name: 'home', params: { locale: localeValue } }"
				tag="router-link"
				aria-label="Go to homepage">
				<img src="/favicon-32x32.png" alt="Crossword app logo" />
			</BNavbarBrand>
			<BNavbarToggle target="header-nav" class="ms-auto d-sm-none"></BNavbarToggle>
			<BCollapse
				id="header-nav"
				is-nav
				class="ms-sm-4 flex-grow-1 d-sm-flex align-items-center">
				<BNavbarNav class="me-sm-auto mb-2 mb-sm-0">
					<BNavItem :to="{ name: 'daily', params: { locale: localeValue } }" tag="router-link">
						{{ $t("nav.daily") }}
					</BNavItem>
					<BNavItem :to="{ name: 'crossword', params: { locale: localeValue } }" tag="router-link">
						{{ $t("nav.archive") }}
					</BNavItem>
					<BNavItem :to="{ name: 'leaderboard', params: { locale: localeValue } }" tag="router-link">
						{{ $t("nav.leaderboard") }}
					</BNavItem>
					<BNavItem :to="{ name: 'howto', params: { locale: localeValue } }" tag="router-link">
						{{ $t("nav.howto") }}
					</BNavItem>
				</BNavbarNav>
				<BNavItem class="ms-sm-3 list-unstyled">
					<BButton
						variant="link"
						class="locale-toggle"
						aria-label="Toggle language"
						@click="toggleLocale">
						{{ buttonLabel }}
					</BButton>
				</BNavItem>
				<BNavItem class="d-flex user ms-sm-1">
					<router-link
						v-if="isAuthenticated"
						class="icon-btn"
						:to="{ name: 'profile', params: { locale: localeValue } }"
						aria-label="Profile">
						<font-awesome-icon :icon="faUser" />
					</router-link>
					<BButton
						v-else
						variant="outline-dark"
						class="btn"
						aria-label="Login"
						@click="openAuth">
						{{ $t("nav.signIn") }}
					</BButton>
				</BNavItem>
			</BCollapse>
		</BContainer>
	</BNavbar>
	<Auth v-model="showAuth" />
</template>

<style scoped>
	.icon-btn {
		width: 38px;
		height: 38px;
		border-radius: 50%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: 2px solid #333;
		color: #333;
		background: transparent;
		padding: 0;
	}

	.icon-btn:hover,
	.icon-btn:focus {
		color: #000;
		border-color: #000;
	}

	.user {
		margin-left: 2em;
	}

	.locale-toggle {
		background-color: transparent;
		border: none;
		font-size: 1.1rem;
		text-decoration: none;
		cursor: pointer;
		box-shadow: none;
		padding-top: 0.6em;
	}
</style>
