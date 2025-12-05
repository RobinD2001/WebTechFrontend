const ISO_SLICE_LENGTH = 10;
const DAY_IN_MS = 24 * 60 * 60 * 1000;

export function toIsoDate(date) {
	const parsed = new Date(date);
	return Number.isNaN(parsed.valueOf()) ? null : parsed.toISOString().slice(0, ISO_SLICE_LENGTH);
}

export function todayIsoString() {
	return toIsoDate(new Date());
}

export function yesterdayIsoString() {
	return toIsoDate(Date.now() - DAY_IN_MS);
}

export function parseIsoDate(dateStr) {
	if (!dateStr) return null;
	const [year, month, day] = dateStr.split("-").map(Number);
	if (!year || !month || !day) return null;
	const parsed = new Date(Date.UTC(year, month - 1, day, 8, 0, 0));
	return Number.isNaN(parsed.valueOf()) ? null : parsed;
}

export function normalizeArchiveDate(dateStr, fallback = yesterdayIsoString()) {
	const parsed = parseIsoDate(dateStr);
	if (!parsed) return fallback;

	const today = new Date();
	return parsed > today ? todayIsoString() : toIsoDate(parsed);
}

export function randomDateBetween(startDate, endDate) {
	if (!startDate || !endDate) return null;
	const start = startDate.valueOf();
	const end = endDate.valueOf();
	if (Number.isNaN(start) || Number.isNaN(end) || start > end) return null;

	const randomTime = start + Math.random() * (end - start);
	return new Date(randomTime);
}

export function randomArchiveDate(minIsoDate = "2024-01-01") {
	const today = new Date();
	const startDate = parseIsoDate(minIsoDate) ?? today;
	const endDate = new Date(
		Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 8, 0, 0)
	);
	const randomDate = randomDateBetween(startDate, endDate) ?? endDate;
	return normalizeArchiveDate(toIsoDate(randomDate), toIsoDate(endDate));
}

export function formatFriendlyDate(date = new Date()) {
	return new Date(date).toLocaleDateString(undefined, {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}
