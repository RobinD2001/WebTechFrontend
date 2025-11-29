<script setup>
	import { ref } from "vue";
	import AddCrossword from "@/components/admin/AddCrossword.vue";
	import GlobalStats from "@/components/admin/GlobalStats.vue";
	import { BTab, BTabs } from "bootstrap-vue-3";

	const activeContainer = ref(0);
</script>

<template>
	<BContainer class="p-2 pt-3">
		<h1>Admin</h1>
		<p>Super secret page to do special stuff</p>
		<BTabs v-model="activeContainer" class="px=3em">
			<BTab title="Crossword Builder">
				<AddCrossword />
			</BTab>
			<BTab title="Global stats">
				<GlobalStats />
			</BTab>
		</BTabs>
	</BContainer>
</template>
