<script setup>
	import CrosswordApp from "@/components/xw/CrosswordApp.vue";
	import { computed } from "vue";
	const today = computed(() => {
		return new Date().setHours(0, 0, 0, 0);
	});
</script>

<template>
	<h1>Crossword Demo</h1>
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
