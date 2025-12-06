<script setup>
	import { onMounted, ref, computed } from "vue";
	import { useRoute, useRouter } from "vue-router";
	import { useI18n } from "vue-i18n";
	import { useAuth } from "@/composables/useAuth";
	import { getStats } from "@/composables/useStats";
	import { resolveUsername } from "@/utils/user";
	import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
	import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
	import { DEFAULT_LOCALE } from "@/i18n";

	const { logout, user } = useAuth();
	const route = useRoute();
	const router = useRouter();
	const locale = computed(() => route.params.locale || DEFAULT_LOCALE);
	const { t } = useI18n();

	const stats = ref(null);
	const loading = ref(false);
	const error = ref("");

	const statsApi = getStats();

	const username = computed(() => resolveUsername(user.value) ?? t("profile.guest"));

	const goBack = () => {
		if (window?.history?.length > 1) {
			router.back();
		} else {
			router.push({ name: "home", params: { locale: locale.value } });
		}
	};

	function formatDate(value) {
		if (!value) return "—";
		const date = new Date(value);
		return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString();
	}

	function formatSeconds(value) {
		if (value === null || value === undefined) return "—";
		const totalSeconds = Math.round(Number(value));
		if (!Number.isFinite(totalSeconds)) return "—";
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = totalSeconds % 60;
		return `${minutes}:${String(seconds).padStart(2, "0")}`;
	}

	async function loadStats() {
		loading.value = true;
		error.value = "";
		try {
			stats.value = await statsApi.getUser();
		} catch (err) {
			error.value = err?.message || t("errors.profileStats");
			stats.value = null;
		} finally {
			loading.value = false;
		}
	}

	onMounted(() => {
		loadStats();
	});
</script>

<template>
	<BContainer class="profile-page py-4">
		<BRow class="align-items-center mb-4 g-3">
			<BCol cols="auto">
				<BButton
					variant="outline-dark"
					class="back-btn"
					aria-label="Go back"
					@click="goBack">
					<FontAwesomeIcon :icon="faChevronLeft" />
				</BButton>
			</BCol>
			<BCol>
				<h1 class="mb-2">{{ $t("profile.title") }}</h1>
				<p class="mb-0">{{ $t("profile.welcome", { name: username }) }}</p>
			</BCol>
			<BCol cols="auto">
				<router-link :to="{ name: 'home', params: { locale } }">
					<BButton variant="warning" @click="logout()">{{ $t("profile.logout") }}</BButton>
				</router-link>
			</BCol>
		</BRow>

		<BAlert v-if="error" variant="danger" show>{{ error }}</BAlert>

		<BCard class="panel">
			<div class="d-flex align-items-center justify-content-between mb-3">
				<h4 class="mb-0">{{ $t("profile.statsTitle") }}</h4>
				<BSpinner v-if="loading" small />
			</div>

			<div v-if="!loading && stats" class="stats-grid">
				<div class="stat">
					<div class="label">{{ $t("profile.joined") }}</div>
					<div class="value">{{ formatDate(stats.joinedAt) }}</div>
				</div>
				<div class="stat">
					<div class="label">{{ $t("profile.lastPlayed") }}</div>
					<div class="value">{{ formatDate(stats.lastPlayedAt) }}</div>
				</div>
				<div class="stat">
					<div class="label">{{ $t("profile.solved") }}</div>
					<div class="value">{{ stats.totalSolved ?? 0 }}</div>
				</div>
				<div class="stat">
					<div class="label">{{ $t("profile.currentStreak") }}</div>
					<div class="value">{{ stats.currentStreak ?? 0 }} {{ $t("profile.days") }}</div>
				</div>
				<div class="stat">
					<div class="label">{{ $t("profile.bestStreak") }}</div>
					<div class="value">{{ stats.bestStreak ?? 0 }} {{ $t("profile.days") }}</div>
				</div>
				<div class="stat">
					<div class="label">{{ $t("profile.avg14") }}</div>
					<div class="value">{{ formatSeconds(stats.average14Days) }}</div>
				</div>
				<div class="stat">
					<div class="label">{{ $t("profile.avgOverall") }}</div>
					<div class="value">{{ formatSeconds(stats.averageOverall) }}</div>
				</div>
			</div>

			<p v-else-if="!loading" class="mb-0 muted">{{ $t("profile.noStats") }}</p>
		</BCard>
	</BContainer>
</template>

<style scoped>
	.profile-page {
		max-width: 900px;
	}

	.back-btn {
		width: 2em;
		height: 2em;
		border-radius: 50%;
		font-size: 1.4rem;
		font-weight: 700;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding-top: 0.4em;
		margin-bottom: 1.5em;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 1rem;
	}

	.stat {
		border: 1px solid var(--border);
		border-radius: 10px;
		padding: 0.9rem 1rem;
		background: var(--card);
		box-shadow: var(--shadow);
	}

	.label {
		font-size: 0.9rem;
		color: var(--muted);
	}

	.value {
		font-size: 1.3rem;
		font-weight: 700;
		color: var(--accent);
	}
</style>
