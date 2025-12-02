<script setup>
	import { ref, watch } from "vue";

	const grid = ref([]);
	const rows = ref(0);
	const cols = ref(0);

	const props = defineProps({
		grid: {
			type: Object,
			default: () => ({ rows: 0, cols: 0, cells: [] }),
		},
	});

	watch(
		() => props.grid,
		(newGrid) => {
			setGrid(newGrid);
		},
		{ immediate: true, deep: true }
	);

	function setGrid(newGrid) {
		if (!newGrid || !newGrid.cells) {
			grid.value = [];
			rows.value = 0;
			cols.value = 0;
			return;
		}

		grid.value = newGrid.cells;
		rows.value = newGrid.rows || 0;
		cols.value = newGrid.cols || 0;
	}

	const hasGrid = () => rows.value > 0 && cols.value > 0;
</script>

<template>
	<BContainer fluid class="grid-wrapper">
		<div v-if="!hasGrid()" class="text-muted">No grid to show yet.</div>
		<div v-else>
			<BRow v-for="(row, rIdx) in grid" :key="`row-${rIdx}`" class="g-2">
				<BCol v-for="(cell, cIdx) in row" :key="`cell-${rIdx}-${cIdx}`" class="cell-col">
					<BCard
						:class="[
							'cell-card',
							{ 'bg-dark text-light': cell.isBlock, 'bg-warning': cell.conflict },
						]">
						<BCardBody
							class="p-1 position-relative d-flex align-items-center justify-content-center">
							<span v-if="cell.clueNumber" class="clue-number">{{
								cell.clueNumber
							}}</span>
							<span v-if="!cell.isBlock" class="cell-letter">{{ cell.letter }}</span>
						</BCardBody>
					</BCard>
				</BCol>
			</BRow>
		</div>
	</BContainer>
</template>

<style scoped>
	.grid-wrapper {
		max-width: 100%;
		transform: scale(0.9);
		transform-origin: top left;
	}

	.cell-col {
		padding: 0.15rem;
	}

	.cell-card {
		width: 100%;
		aspect-ratio: 1 / 1;
		position: relative;
		border: 1px solid #ccc;
		display: flex;
		align-items: stretch;
		overflow: hidden;
	}

	.cell-card .card-body {
		width: 100%;
		height: 100%;
		display: grid;
		place-items: center;
		position: relative;
		padding: 0.35rem;
	}

	.cell-letter {
		font-weight: 800;
		font-size: clamp(1.2rem, 3vw, 2rem);
		text-transform: uppercase;
		line-height: 1;
	}

	.clue-number {
		position: absolute;
		top: 6px;
		left: 8px;
		font-size: 0.9rem;
		font-weight: 700;
		line-height: 1;
	}
</style>
