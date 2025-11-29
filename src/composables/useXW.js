import { apiPost, apiGet } from "@/composables/useApi.js";

export async function addCrosswordToDB(payload) {
	const res = await apiPost("/api/crosswords/new", payload);
	console.log(res.message);
	return res;
}

export async function getXWFromDate(date) {
	const formattedDate = new URLSearchParams({
		date: date,
	});
	console.log("useXW:", formattedDate);

	const clues = await apiGet(`/api/crosswords/get?${formattedDate}`);
	console.log(clues.message);
	return clues.clues;
}
