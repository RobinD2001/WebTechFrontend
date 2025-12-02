<script setup>
	import { ref, watch } from "vue";
	import CrosswordApp from "../xw/CrosswordApp.vue";

	const statusOptions = ["private", "scheduled", "public"];

	const today = new Date();
	const currentYear = today.getFullYear();
	const currentWeek = getISOWeek(today);

	const selectedYear = ref(currentYear);
	const selectedWeek = ref(currentWeek);
	const selectedDate = ref("");
	const weekEntries = ref([]);

	const yearOptions = [currentYear, currentYear + 1];
	const weekOptions = Array.from({ length: 53 }, (_, i) => i + 1);

	function toIso(dateObj) {
		return dateObj.toISOString().slice(0, 10);
	}

	function getISOWeek(date) {
		const tmp = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
		const dayNum = tmp.getUTCDay() || 7;
		tmp.setUTCDate(tmp.getUTCDate() + 4 - dayNum);
		const yearStart = new Date(Date.UTC(tmp.getUTCFullYear(), 0, 1));
		return Math.ceil(((tmp - yearStart) / 86400000 + 1) / 7);
	}

	function getISOWeekStart(year, week) {
		const simple = new Date(Date.UTC(year, 0, 1 + (week - 1) * 7));
		const dayOfWeek = simple.getUTCDay() || 7;
		const isoWeekStart = new Date(simple);
		isoWeekStart.setUTCDate(simple.getUTCDate() - dayOfWeek + 1);
		return isoWeekStart;
	}

	function buildWeek(year, week) {
		const start = getISOWeekStart(year, week);
		return Array.from({ length: 7 }, (_, i) => {
			const day = new Date(start);
			day.setUTCDate(start.getUTCDate() + i);
			return { date: toIso(day), status: "private" };
		});
	}

	function refreshWeek(year, week) {
		const newWeek = buildWeek(year, week);
		weekEntries.value = newWeek;
		const inWeek = newWeek.find((d) => d.date === selectedDate.value);
		selectedDate.value = inWeek ? inWeek.date : newWeek[0]?.date ?? selectedDate.value;
	}

	function cycleStatus(entry) {
		const idx = statusOptions.indexOf(entry.status);
		const nextIdx = (idx + 1) % statusOptions.length;
		entry.status = statusOptions[nextIdx];
	}

	function statusVariant(status) {
		if (status === "public") return "success";
		if (status === "scheduled") return "warning";
		return "secondary";
	}

	function handleSelectDate(date) {
		selectedDate.value = date;
	}

	refreshWeek(currentYear, currentWeek);

	watch([selectedYear, selectedWeek], ([year, week]) => {
		refreshWeek(Number(year), Number(week));
	});
</script>

<template>
	<BContainer fluid class="schedule-page">
		<BCard class="panel mb-3">
			<BRow class="g-3 mb-2">
				<BCol md="6">
					<BFormGroup label="Year" label-for="year-select" label-class="fw-bold">
						<BFormSelect
							id="year-select"
							v-model="selectedYear"
							:options="yearOptions" />
					</BFormGroup>
				</BCol>
				<BCol md="6">
					<BFormGroup label="Week" label-for="week-select" label-class="fw-bold">
						<BFormSelect
							id="week-select"
							v-model="selectedWeek"
							:options="weekOptions" />
					</BFormGroup>
				</BCol>
			</BRow>
			<BListGroup flush>
				<BListGroupItem
					v-for="entry in weekEntries"
					:key="entry.date"
					:active="entry.date === selectedDate"
					class="d-flex align-items-center justify-content-between"
					@click="handleSelectDate(entry.date)">
					<div class="fw-semibold">{{ entry.date }}</div>
					<BButton
						size="sm"
						:variant="statusVariant(entry.status)"
						class="text-capitalize"
						@click.stop="cycleStatus(entry)">
						{{ entry.status }}
					</BButton>
				</BListGroupItem>
			</BListGroup>
		</BCard>

		<BCard class="panel">
			<CrosswordApp :date="selectedDate" />
		</BCard>
	</BContainer>
</template>

<style scoped>
	.schedule-page {
		max-width: 1100px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}
</style>
