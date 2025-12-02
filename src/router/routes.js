import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "@/composables/useAuth";
import Home from "@/components/views/Home.vue";
import DailyCrossword from "@/components/views/DailyXWord.vue";
import Archive from "@/components/views/Archive.vue";
import Profile from "@/components/views/Profile.vue";
import Admin from "@/components/views/Admin.vue";
import Leaderboard from "@/components/views/Leaderboard.vue";
import HowTo from "@/components/views/HowTo.vue";
import NotFound from "@/components/layout/NotFound.vue";

const routes = [
	{
		path: "/",
		name: "home",
		component: Home,
	},
	{
		path: "/daily",
		name: "daily",
		component: DailyCrossword,
	},
	{
		path: "/crossword",
		name: "crossword",
		component: Archive,
	},
	{
		path: "/crossword/:date",
		name: "crosswordSelect",
		component: Archive,
		props: (route) => ({ date: route.params.date }),
	},
	{
		path: "/random",
		name: "random",
		redirect: () => ({ name: "crosswordSelect", params: { date: getRandomDate() } }),
	},
	{
		path: "/profile",
		name: "profile",
		component: Profile,
	},
	{
		path: "/leaderboard",
		name: "leaderboard",
		component: Leaderboard,
	},
	{
		path: "/howto",
		name: "howto",
		component: HowTo,
	},
	{
		path: "/admin",
		name: "admin",
		component: Admin,
		meta: { requiresAuth: true },
	},
	{
		path: "/404",
		name: "404",
		component: NotFound,
	},
	{
		path: "/:catchAll(.*)*",
		redirect: { name: "404" },
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) return savedPosition;
		return { left: 0, top: 0 };
	},
});

router.beforeEach((to, from) => {
	const { isAuthenticated } = useAuth();
	if (to.meta.requiresAuth && !isAuthenticated.value) {
		return false;
	}

	return true;
});

const getRandomDate = () => {
	return "2025-11-29";
};

export default router;
