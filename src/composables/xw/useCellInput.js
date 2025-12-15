import { ref, computed, watch, nextTick } from "vue";

export function useCellInput(props, emit) {
	const inputRef = ref(null);

	// Allow ASCII letters/numbers plus German umlauts/ß
	const allowedInput = /[A-Za-z0-9\u00c4\u00d6\u00dc\u00e4\u00f6\u00fc\u00df]/u;

	function sanitizeInput(val) {
		if (val === "" || val == null) {
			return { value: "", valid: true };
		}

		const match = String(val).match(allowedInput);
		if (!match) {
			return { value: "", valid: false };
		}

		return { value: match[0].toUpperCase(), valid: true };
	}

	const displayValue = computed({
		get() {
			return props.cell.value;
		},
		set(val) {
			const prev = props.cell.value;
			const { value: next, valid } = sanitizeInput(val);
			if (!valid) return;

			emit("update:value", next);
			if (next) {
				emit("typed", { previous: prev, current: next });
			}
		},
	});

	const isSelected = computed({
		get() {
			return props.cell.isSelected;
		},
		set() {
			emit("update:isSelected", true);
		},
	});

	function onBeforeInput(e) {
		if (!["insertText", "insertFromPaste"].includes(e.inputType)) return;

		const { value: next, valid } = sanitizeInput(e.data);
		if (!valid) {
			e.preventDefault();
			return;
		}

		e.preventDefault();
		displayValue.value = next;
	}

	function onKeydown(e) {
		if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
			e.preventDefault();
			emit("move", e.key);
			return;
		}
		if (e.key === "Backspace") {
			e.preventDefault();
			emit("backspace");
			return;
		}
	}

	function onTab() {
		interacted();
	}

	function interacted() {
		isSelected.value = !isSelected.value;
	}

	watch(
		() => props.isActive,
		(active) => {
			if (active) {
				nextTick(() => {
					if (inputRef.value) {
						inputRef.value.focus();
						inputRef.value.select?.();
					}
				});
			}
		},
		{ immediate: true }
	);

	const cellClasses = computed(() => {
		return {
			"text-center": true,
			"xw-cell-input": true,
			"xw-cell-highlighted": props.cell.isHighlighted,
			"xw-cell-selected": isSelected.value,
			"xw-cell-block": props.cell.isBlock,
		};
	});

	const cellAriaLabel = computed(() => {
		const rowNumber = props.cell.row + 1;
		const colNumber = props.cell.col + 1;
		const clueInfo = props.cell.clueNumber ? `, clue ${props.cell.clueNumber}` : "";
		const contentState = props.cell.value ? `, contains '${props.cell.value}'` : ", empty";
		return `Crossword cell row ${rowNumber}, column ${colNumber}${clueInfo}${contentState}`;
	});

	return {
		inputRef,
		displayValue,
		isSelected,
		cellClasses,
		cellAriaLabel,
		onBeforeInput,
		onKeydown,
		onTab,
		interacted,
	};
}
