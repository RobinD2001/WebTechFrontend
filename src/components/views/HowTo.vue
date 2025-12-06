<script setup>
	import { computed } from "vue";
	import { useI18n } from "vue-i18n";

	const { t, tm } = useI18n();
	const basics = computed(() => tm("howto.basics") || []);
	const controls = computed(() => tm("howto.controls") || []);
	const tips = computed(() => tm("howto.tips") || []);
</script>

<template>
	<BContainer fluid class="howto-page">
		<section class="hero">
			<h1>{{ $t("howto.title") }}</h1>
		</section>

		<BRow class="g-3">
			<BCol lg="7">
				<BCard class="panel">
					<h3>{{ $t("howto.basicsTitle") }}</h3>
					<ul class="list">
						<li v-for="(item, idx) in basics" :key="idx">
							{{ item }}
						</li>
					</ul>
					<h4>{{ $t("howto.controlsTitle") }}</h4>
					<ul class="list">
						<li v-for="(control, idx) in controls" :key="idx">
							<code>{{ control.label }}</code> - {{ control.text }}
						</li>
					</ul>
				</BCard>
			</BCol>

			<BCol lg="5">
				<BCard class="panel">
					<h3>{{ $t("howto.proTipsTitle") }}</h3>
					<ul class="tips">
						<li v-for="tip in tips" :key="tip.title">
							<strong>{{ tip.title }}</strong>
							<p>{{ tip.body }}</p>
						</li>
					</ul>
				</BCard>
			</BCol>
		</BRow>
	</BContainer>
</template>

<style scoped>
	.howto-page {
		max-width: 1100px;
		margin: 0 auto;
		padding: 2.5rem 1.5rem 3rem;
		padding-top: 0;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.hero {
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.eyebrow {
		margin: 0;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		font-size: 0.75rem;
		color: var(--accent-strong);
	}

	.lede {
		margin: 0;
		font-size: 1.05rem;
	}

	.panel {
		border: 1px solid var(--border);
		border-radius: 12px;
		background: var(--card);
		box-shadow: var(--shadow);
	}

	.list {
		padding-left: 1.2rem;
		margin: 0.5rem 0 1rem;
		display: grid;
		gap: 0.4rem;
	}

	.tips {
		list-style: none;
		padding: 0;
		margin: 0.5rem 0 0;
		display: grid;
		gap: 0.75rem;
	}

	.tips p {
		margin: 0.2rem 0 0;
	}

	@media (max-width: 768px) {
		.demo-card {
			grid-template-columns: 1fr;
		}
	}
</style>
