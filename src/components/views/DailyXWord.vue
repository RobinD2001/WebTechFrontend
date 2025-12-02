<script setup>
	import CrosswordApp from "@/components/xw/CrosswordApp.vue";
	import { computed } from "vue";
	const todayDate = computed(() => new Date());
	const todayIso = computed(() => todayDate.value.toISOString().split("T")[0]);
	const todayLabel = computed(() => todayDate.value.toLocaleDateString());
</script>

<template>
	<BContainer fluid class="daily-page">
		<section class="hero">
			<p class="eyebrow">Today's Mini</p>
			<h1>Crossword of the day</h1>
		</section>

		<BCard class="panel">
			<div class="puzzle-meta muted">Published {{ todayLabel }}</div>
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

	.puzzle-meta {
		margin-bottom: 0.75rem;
	}
</style>
