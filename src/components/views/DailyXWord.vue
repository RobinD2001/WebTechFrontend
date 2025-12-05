<script setup>
	import CrosswordApp from "@/components/xw/CrosswordApp.vue";
	import { computed } from "vue";
	import { formatFriendlyDate, todayIsoString } from "@/utils/date";

	const todayIso = computed(() => todayIsoString());
	const todayLabel = computed(() => formatFriendlyDate());
</script>

<template>
	<BContainer fluid class="daily-page">
		<section class="hero">
			<p class="eyebrow">Today's Mini</p>
			<h1>Crossword of the day</h1>
		</section>

		<BCard class="panel">
			<div class="muted">Published {{ todayLabel }}</div>
			<CrosswordApp :date="todayIso" />
		</BCard>
	</BContainer>
</template>

<style scoped>
	.daily-page {
		max-width: 960px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}
</style>
