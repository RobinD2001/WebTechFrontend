<script setup>
	const props = defineProps({ modelValue: Boolean });
	const emit = defineEmits(["update:modelValue"]);
	const onUpdate = (val) => emit("update:modelValue", val);
</script>

<template>
	<BModal
		:model-value="props.modelValue"
		@update:model-value="onUpdate"
		ok-only="true"
		title="Congrats">
		You've finished the Crossword! Come back tomorrow to play again or try older Minis in the
		Archive!
	</BModal>
</template>
