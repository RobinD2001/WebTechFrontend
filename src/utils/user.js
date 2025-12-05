import { readJson, writeJson, STORAGE_KEYS } from "@/utils/storage";

export function getStoredUser() {
	return readJson(STORAGE_KEYS.user);
}

export function saveStoredUser(user) {
	writeJson(STORAGE_KEYS.user, user);
}

export function clearStoredUser() {
	writeJson(STORAGE_KEYS.user, null);
}

export function resolveUsername(user = getStoredUser()) {
	if (!user) return null;
	return user.name ?? null;
}
