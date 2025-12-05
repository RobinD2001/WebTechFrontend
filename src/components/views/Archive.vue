<script setup>
	import { onMounted, ref } from "vue";
	import CrosswordApp from "@/components/xw/CrosswordApp.vue";
	import { getXWInfo } from "@/composables/useXW";
	import { normalizeArchiveDate, todayIsoString, yesterdayIsoString } from "@/utils/date";

	const props = defineProps({
		date: String,
	});

	const todayIso = todayIsoString();
	const defaultDate = yesterdayIsoString();
	const initialDate = normalizeArchiveDate(props.date, defaultDate);

	const selectedDate = ref(initialDate);
	const currentPuzzleDate = ref(initialDate);

	const difficulty = ref("unknown");
	const averageTime = ref("--:--");

	const fetchInfo = async (date) => {
		if (!date) return;
		try {
			const info = await getXWInfo(date);
			difficulty.value = info?.difficulty ?? "unknown";
			averageTime.value = info?.avgTime ?? "--:--";
		} catch (err) {
			console.error("Failed to load crossword info", err);
			difficulty.value = "unknown";
			averageTime.value = "--:--";
		}
	};

	const handleDateBlur = async () => {
		selectedDate.value = normalizeArchiveDate(selectedDate.value, defaultDate);
		await fetchInfo(selectedDate.value);
	};

	const loadPuzzle = async () => {
		const normalized = normalizeArchiveDate(selectedDate.value, defaultDate);
		selectedDate.value = normalized;
		currentPuzzleDate.value = normalized;
		await fetchInfo(currentPuzzleDate.value);
	};

	onMounted(async () => {
		await fetchInfo(currentPuzzleDate.value);
	});
</script>

<template>
	<BContainer fluid class="archive-page">
		<section class="hero">
			<h1>Find a past Mini</h1>
			<p class="tagline">Pick a date to load that day's mini crossword.</p>
		</section>

		<BCard class="panel">
			<BForm @submit.prevent="loadPuzzle">
				<BRow class="gy-2 gx-3 align-items-end">
					<BCol md="4">
						<BFormGroup
							label="Puzzle date"
							label-for="archive-date"
							label-class="fw-bold">
							<BFormInput
								id="archive-date"
								type="date"
								v-model="selectedDate"
								:max="todayIso"
								required
								@blur="handleDateBlur" />
						</BFormGroup>
					</BCol>
					<BCol md="3" class="mb-3 mx-3">
						<BButton type="submit" variant="primary" class="w-100"
							>Load crossword</BButton
						>
					</BCol>
					<BCol md="4" class="text-md-end stats mb-3">
						<div class="stat">
							<span class="label">Difficulty</span>
							<strong>{{ difficulty }}</strong>
						</div>
						<div class="stat">
							<span class="label">Average time</span>
							<strong>{{ averageTime }}</strong>
						</div>
					</BCol>
				</BRow>
			</BForm>
		</BCard>

		<BCard class="panel puzzle-card" v-if="currentPuzzleDate">
			<div class="header">
				<div>
					<p class="muted mb-0">Loaded from {{ currentPuzzleDate }}</p>
				</div>
			</div>
			<CrosswordApp :date="currentPuzzleDate"></CrosswordApp>
		</BCard>
	</BContainer>
</template>

<style scoped>
	.archive-page {
		max-width: 960px;
		margin: 0 auto;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.stats {
		display: flex;
		gap: 1.5rem;
		justify-content: flex-end;
	}

	.stat .label {
		display: block;
		font-size: 0.85rem;
		color: var(--muted);
	}

	.stat strong {
		color: var(--accent);
	}

	.puzzle-card .header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	@media (max-width: 768px) {
		.stats {
			justify-content: flex-start;
		}
	}
</style>
