<script setup>
	import { ref } from "vue";

	const siteStats = ref([
		{ label: "Registered users", value: "1,842" },
		{ label: "Crosswords published", value: "216" },
		{ label: "Avg. solves per day", value: "482" },
		{ label: "Average completion time", value: "08:43" },
		{ label: "Best solver streak", value: "21 days" },
	]);

	const todayStats = ref([
		{ label: "Today's puzzle solves", value: "137" },
		{ label: "Avg. accuracy", value: "92%" },
		{ label: "Hints used", value: "54" },
		{ label: "Top solver", value: "@puzzler99" },
	]);
</script>

<template>
	<section class="stats-shell">
		<div class="notepad">
			<header class="notepad__header text-center mb-3">
				<h2 class="mb-1">Global Stats</h2>
				<small class="text-muted">Snapshot (mock data)</small>
			</header>

			<div class="notepad__block">
				<h5 class="notepad__title">Site Health</h5>
				<ul class="stat-list">
					<li v-for="stat in siteStats" :key="stat.label" class="stat-row">
						<span class="stat-label">{{ stat.label }}</span>
						<span class="stat-value">{{ stat.value }}</span>
					</li>
				</ul>
			</div>

			<div class="notepad__block mt-4">
				<h5 class="notepad__title">Today</h5>
				<ul class="stat-list">
					<li v-for="stat in todayStats" :key="stat.label" class="stat-row">
						<span class="stat-label">{{ stat.label }}</span>
						<span class="stat-value">{{ stat.value }}</span>
					</li>
				</ul>
			</div>
		</div>
	</section>
</template>

<style scoped>
	.stats-shell {
		padding-top: 1em;
		padding-bottom: 2em;
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 70vh;
	}

	.notepad {
		width: min(680px, 100%);
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.88)),
			repeating-linear-gradient(
				to bottom,
				rgba(0, 0, 0, 0.06) 0,
				rgba(0, 0, 0, 0.06) 1px,
				transparent 22px,
				transparent 24px
			);
		border: 2px solid #222;
		border-radius: 14px;
		padding: 2.5rem 2.25rem;
		position: relative;
	}

	.notepad::before {
		content: "";
		position: absolute;
		left: 16px;
		top: 18px;
		bottom: 18px;
		width: 3px;
		background: rgba(255, 86, 74, 0.5);
	}

	.notepad::after {
		content: "";
		position: absolute;
		left: -10px;
		right: -10px;
		bottom: 14px;
		height: 10px;
		background: rgba(0, 0, 0, 0.08);
		filter: blur(6px);
		z-index: -1;
	}

	.notepad__header h2 {
		font-weight: 800;
	}

	.notepad__title {
		font-weight: 700;
		margin-bottom: 0.5rem;
	}

	.stat-list {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.stat-row {
		display: flex;
		justify-content: space-between;
		padding: 0.45rem 0.35rem;
		border-bottom: 1px dashed rgba(0, 0, 0, 0.15);
	}

	.stat-row:last-child {
		border-bottom: none;
	}

	.stat-label {
		font-weight: 600;
		color: #2c2c2c;
	}

	.stat-value {
		font-weight: 700;
		color: #1d6f8d;
	}
</style>
