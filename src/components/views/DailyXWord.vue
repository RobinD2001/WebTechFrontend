<script setup>
	import CrosswordApp from "@/components/xw/CrosswordApp.vue";
	import { computed } from "vue";
	const today = computed(() => {
		return new Date().toLocaleString("en-US").substring(0, 10);
	});
</script>

<template>
	<h1>
		Crossword of the day: {{ new Date(today).getDate() }}.{{ new Date(today).getMonth() }}.{{
			new Date(today).getFullYear()
		}}
	</h1>
	<br />

	<CrosswordApp :date="today" />
</template>

<style scoped>
	.cell--selected {
		fill: blue;
		border: 5px solid black;
	}

	.cell {
		stroke-width: 3;
		stroke: black;
	}
</style>
