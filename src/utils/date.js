const ISO_SLICE_LENGTH = 10;
const DAY_IN_MS = 24 * 60 * 60 * 1000;
const BERLIN_TZ = "Europe/Berlin";
const RELEASE_HOUR_BERLIN = 9;

function getBerlinOffsetMs(utcTimestamp) {
	try {
		const formatter = new Intl.DateTimeFormat("en-US", {
			timeZone: BERLIN_TZ,
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			hourCycle: "h23",
		});
		const parts = formatter.formatToParts(new Date(utcTimestamp));
		const get = (type) => Number(parts.find((p) => p.type === type)?.value ?? 0);
		const berlinAsUtc = Date.UTC(
			get("year"),
			get("month") - 1,
			get("day"),
			get("hour"),
			get("minute"),
			get("second")
		);
		return berlinAsUtc - utcTimestamp;
	} catch (e) {
		return 60 * 60 * 1000 * 2;
	}
}

function berlinReleaseUtcDate(year, monthIndex, day) {
	const targetUtc = Date.UTC(year, monthIndex, day, RELEASE_HOUR_BERLIN, 0, 0);
	const offsetMs = getBerlinOffsetMs(targetUtc);
	return new Date(targetUtc - offsetMs);
}

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
	const parsed = berlinReleaseUtcDate(year, month - 1, day);
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

export function randomArchiveDate(minIsoDate = "2025-12-01") {
	const today = new Date();
	const startDate = parseIsoDate(minIsoDate) ?? today;
	const endDate = berlinReleaseUtcDate(today.getFullYear(), today.getMonth(), today.getDate());
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
