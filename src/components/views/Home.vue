<script setup>
	import { computed, onMounted, reactive, ref } from "vue";
	import { useRoute } from "vue-router";
	import { useI18n } from "vue-i18n";
	import { getDailyLeaderboard } from "@/composables/useStats";
	import Preview from "@/components/xw/Preview.vue";
	import Auth from "@/components/auth/Auth.vue";
	import LeaderboardList from "@/components/leaderboard/LeaderboardList.vue";
	import { DEFAULT_LOCALE } from "@/i18n";

	const showAuth = ref(false);
	const leaderboard = ref([]);
	const loadingLeaderboard = ref(false);
	const errorLeaderboard = ref("");
	const route = useRoute();
	const locale = computed(() => route.params.locale || DEFAULT_LOCALE);
	const { t, tm } = useI18n();

	const openAuth = () => {
		showAuth.value = true;
	};

	async function loadMiniLeaderboard() {
		loadingLeaderboard.value = true;
		errorLeaderboard.value = "";
		try {
			const data = await getDailyLeaderboard();
			leaderboard.value = data?.leaderboard || [];
		} catch (err) {
			errorLeaderboard.value = err?.message || t("errors.loadDailyLeaderboard");
			leaderboard.value = [];
		} finally {
			loadingLeaderboard.value = false;
		}
	}

	onMounted(() => {
		loadMiniLeaderboard();
	});

	const funfacts = computed(() => tm("home.funFacts") || []);
	const randomFunFact = computed(() => {
		const list = funfacts.value || [];
		return list.length ? list[Math.floor(Math.random() * list.length)] : "";
	});
</script>

<template>
	<BContainer fluid class="home">
		<section class="hero">
			<p class="eyebrow">{{ $t("home.eyebrow") }}</p>
			<h1>{{ $t("home.title") }}</h1>
			<p class="tagline">{{ $t("home.tagline") }}</p>
			<div class="hero-actions">
				<BButton
					variant="outline-dark"
					class="cta"
					:to="{ name: 'daily', params: { locale } }">
					<span class="cta-icon">▶</span>
					{{ $t("home.playNow") }}
				</BButton>
				<BButton
					variant="text"
					class="link-btn"
					:to="{ name: 'crossword', params: { locale } }">
					{{ $t("home.yesterdayCta") }}
				</BButton>
			</div>
		</section>

		<BRow class="align-items-stretch">
			<BCol lg="7">
				<BCard class="panel h-100" body-class="p-0">
					<Preview />
				</BCard>
			</BCol>

			<BCol lg="5">
				<LeaderboardList
					variant="daily"
					:items="leaderboard"
					:loading="loadingLeaderboard"
					:error="errorLeaderboard"
					:limit="5">
					<template #footer>
						<BButton variant="text" class="link-btn mt-2" @click="openAuth">
							{{ $t("home.loginCta") }}
						</BButton>
						<Auth v-model="showAuth" />
					</template>
				</LeaderboardList>
			</BCol>
		</BRow>

		<BRow class="cta-grid g-3">
			<BCol lg="4">
				<BCard class="panel sction h-100">
					<h4>{{ $t("home.funFactTitle") }}</h4>
					<p class="mb-0">{{ randomFunFact }}</p>
				</BCard>
			</BCol>
			<BCol lg="4">
				<BCard class="panel action h-100">
					<h4>{{ $t("home.yesterdayTitle") }}</h4>
					<p>{{ $t("home.yesterdayDescription") }}</p>
					<BButton
						variant="text"
						class="link-btn"
						:to="{ name: 'crossword', params: { locale } }">
						{{ $t("home.play") }}
					</BButton>
				</BCard>
			</BCol>
			<BCol lg="4">
				<BCard class="panel action h-100">
					<h4>{{ $t("home.randomTitle") }}</h4>
					<p>{{ $t("home.randomDescription") }}</p>
					<BButton
						variant="text"
						class="link-btn"
						:to="{ name: 'random', params: { locale } }">
						{{ $t("home.play") }}
					</BButton>
				</BCard>
			</BCol>
		</BRow>
	</BContainer>
</template>

<style scoped>
	.home {
		max-width: 1100px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.hero-actions {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.panel h3 {
		margin-top: 0;
		margin-bottom: 1rem;
	}

	.leaderboard .center {
		display: block;
		margin: 0 auto;
	}

	.action {
		margin-top: 0;
		margin-bottom: 0.3rem;
	}

	@media (max-width: 980px) {
		.hero-actions {
			flex-direction: column;
		}
	}
</style>
