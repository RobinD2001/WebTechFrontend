<script setup>
	import notFoundImg from "@/assets/img/404.png";
</script>

<template>
	<BContainer fluid class="notfound">
		<BRow class="hero">
			<BImg class="image" :src="notFoundImg"></BImg>
			<p class="eyebrow">Oh, no!</p>
			<h1>404 Not found</h1>
		</BRow>
		<BRow>
			<BCard>
				<BCardBody>
					It seems like the site you're trying to access doesn't exist.
				</BCardBody>
			</BCard>
		</BRow>
	</BContainer>
</template>

<style scoped>
	.notfound {
		max-width: 1100px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.hero {
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.eyebrow {
		margin: 0;
		font-weight: 600;
	}

	.image {
		max-width: 50%;
		align-self: center;
	}
</style>
