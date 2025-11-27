import { apiPost, apiGet } from "@/composables/useApi.js";

export async function getLatestXW() {
	let today = Date.now();
	console.log(today);

	//const clues = apiGet("/api/crosswords");
	return [];
}

export async function getXWFromDate(date) {
	const clues = await apiPost("/api/crosswords", { date: date });
	console.log(clues.message);
	return clues.clues;
}
