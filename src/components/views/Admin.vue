<script setup>
	import { onMounted, ref } from "vue";
	import { useI18n } from "vue-i18n";
	import AddCrossword from "@/components/admin/AddCrossword.vue";
	import GlobalStats from "@/components/admin/GlobalStats.vue";
	import Schedule from "@/components/admin/Schedule.vue";
	import { useAuth } from "@/composables/useAuth";

	const activeContainer = ref(0);
	const isAdmin = ref(false);
	const isCheckingAccess = ref(true);
	const { t } = useI18n();
	const noAccessMsg = ref(t("admin.noAccess"));
	const { checkAdmin } = useAuth();

	onMounted(async () => {
		try {
			const checkData = await checkAdmin();
			isAdmin.value = !!checkData?.access;
			noAccessMsg.value = checkData?.message ?? t("admin.noAccess");
		} catch (err) {
			console.error("Admin check failed", err);
			isAdmin.value = false;
			noAccessMsg.value = err.message;
		} finally {
			isCheckingAccess.value = false;
		}
	});
</script>

<template>
	<BContainer class="p-2 pt-3">
		<h1>{{ $t("admin.title") }}</h1>
		<p>{{ $t("admin.subtitle") }}</p>
		<BTabs v-if="isAdmin" v-model="activeContainer" class="px=3em">
			<BTab :title="$t('admin.tabs.builder')">
				<AddCrossword />
			</BTab>
			<BTab :title="$t('admin.tabs.stats')">
				<GlobalStats />
			</BTab>
			<BTab :title="$t('admin.tabs.schedule')">
				<Schedule />
			</BTab>
		</BTabs>
		<BAlert :model-value="!isAdmin && !isCheckingAccess" variant="danger">{{
			noAccessMsg
		}}</BAlert>
	</BContainer>
</template>
