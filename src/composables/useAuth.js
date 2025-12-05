import { ref, computed } from "vue";
import { apiPost } from "./useApi";
import { syncLocalSolves } from "./useXW";
import { STORAGE_KEYS, readString, writeString } from "@/utils/storage";
import { clearStoredUser, getStoredUser, saveStoredUser } from "@/utils/user";

const user = ref(getStoredUser());
const token = ref(readString(STORAGE_KEYS.token));

const isAuthenticated = computed(() => !!user.value);

async function authenticate(path, credentials) {
	const data = await apiPost(path, credentials);
	saveStoredUser(data.user);
	writeString(STORAGE_KEYS.token, data.token ?? null);
	await syncLocalSolves();
	return data;
}

export function useAuth() {
	async function login(credentials) {
		return authenticate("/api/login", credentials);
	}

	async function register(credentials) {
		return authenticate("/api/register", credentials);
	}

	function logout() {
		clearStoredUser();
		writeString(STORAGE_KEYS.token, null);
	}

	async function checkAdmin() {
		if (!token.value) {
			return { access: false, message: "No authentication token found." };
		}
		return apiPost("/api/admincheck", { token: token.value });
	}

	return {
		user,
		isAuthenticated,
		login,
		register,
		logout,
		checkAdmin,
	};
}
