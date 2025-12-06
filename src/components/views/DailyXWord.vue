<script setup>
	import { computed } from "vue";
	import { useI18n } from "vue-i18n";
	import CrosswordApp from "@/components/xw/CrosswordApp.vue";
	import { formatFriendlyDate, todayIsoString } from "@/utils/date";

	const todayIso = computed(() => todayIsoString());
	const todayLabel = computed(() => formatFriendlyDate());
	const { t } = useI18n();
	const publishedLabel = computed(() => t("dailyPage.published", { date: todayLabel.value }));
</script>

<template>
	<BContainer fluid class="daily-page">
		<section class="hero">
			<p class="eyebrow">{{ $t("dailyPage.eyebrow") }}</p>
			<h1>{{ $t("dailyPage.title") }}</h1>
		</section>

		<CrosswordApp :date="todayIso" />
		<div class="muted text-end mb-2em">{{ publishedLabel }}</div>
	</BContainer>
</template>

<style scoped>
	.daily-page {
		max-width: 960px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		background-color: transparent;
	}
</style>
