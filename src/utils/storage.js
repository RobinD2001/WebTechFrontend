const warnParseFailure = (key) =>
	console.warn(`Unable to parse JSON value for localStorage key "${key}". Clearing entry.`);

export const STORAGE_KEYS = {
	user: "user",
	token: "token",
	solves: "solves",
};

export function readJson(key, defaultValue = null) {
	const raw = localStorage.getItem(key);
	if (!raw) return defaultValue;
	try {
		return JSON.parse(raw);
	} catch (err) {
		warnParseFailure(key);
		localStorage.removeItem(key);
		return defaultValue;
	}
}

export function writeJson(key, value) {
	if (value === undefined) return;
	if (value === null) {
		localStorage.removeItem(key);
		return;
	}
	localStorage.setItem(key, JSON.stringify(value));
}

export function readString(key, defaultValue = null) {
	return localStorage.getItem(key) ?? defaultValue;
}

export function writeString(key, value) {
	if (value === undefined) return;
	if (value === null) {
		localStorage.removeItem(key);
		return;
	}
	localStorage.setItem(key, value);
}
