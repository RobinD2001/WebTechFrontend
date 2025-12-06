<script setup>
	import { computed } from "vue";
	import { useRoute } from "vue-router";
	import {
		faGithub,
		faXTwitter,
	} from "@fortawesome/free-brands-svg-icons";
	import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
	import { DEFAULT_LOCALE } from "@/i18n";

	const route = useRoute();
	const locale = computed(() => route.params.locale || DEFAULT_LOCALE);
</script>

<template>
  <footer class="mt-auto">
    <div class="container">
      <div class="row">
        <div class="col-md-6 mb-3">
          <h5>{{ $t("footer.aboutTitle") }}</h5>
          <p class="mb-0" v-for="(line, idx) in $t('footer.aboutText').split('\\n')" :key="idx">
            {{ line }}
          </p>
        </div>
        <div class="col-md-3 mb-3">
          <h5>{{ $t("footer.quickLinks") }}</h5>
          <ul class="list-unstyled">
            <li>
              <router-link class="nav-link" :to="{ name: 'home', params: { locale } }">
                {{ $t("footer.home") }}
              </router-link>
            </li>
            <li>
              <router-link class="nav-link" :to="{ name: 'daily', params: { locale } }">
                {{ $t("footer.daily") }}
              </router-link>
            </li>
            <li>
              <router-link class="nav-link" :to="{ name: 'crossword', params: { locale } }">
                {{ $t("footer.archive") }}
              </router-link>
            </li>
          </ul>
        </div>
        <div class="col-md-3 mb-3">
          <h5>{{ $t("footer.followUs") }}</h5>
          <ul class="list-inline social-icons">
            <li class="list-inline-item">
              <a href="https://www.x.com" class="text-dark">
                <FontAwesomeIcon :icon="faXTwitter"
              /></a>
            </li>
            <li class="list-inline-item">
              <a href="https://www.github.com" class="text-dark">
                <FontAwesomeIcon :icon="faGithub" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <hr class="mb-4" />
      <div class="row">
        <div class="col-md-12 text-center">
          <p>{{ $t("footer.copyright") }}</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.social-icons a {
  font-size: 1rem;
}
</style>
