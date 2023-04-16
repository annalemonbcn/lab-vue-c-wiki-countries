<template>
  <!-- Countries List (Bootstrap column) -->
  <div class="col-5" style="max-height: 90vh; overflow: scroll">
    <ul class="list-group">
      <li
        class="li-country"
        v-for="(country, index) in countriesList"
        :key="index"
      >
        <router-link
          class="list-group-item list-group-item-action"
          :to="`/list/${country.alpha3Code}`"
        >
          <img
            :src="`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`"
          />
          <p>{{ country.name.common }}</p>
        </router-link>
      </li>
    </ul>
  </div>

  <div class="col-7" style="max-height: 90vh">
    <router-view />
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import CountriesStore from "../stores/CountriesStore.js";

export default {
  name: "CountriesList",
  data() {
    return {};
  },
  computed: {
    ...mapState(CountriesStore, ["countriesList"]),
  },
  methods: {
    ...mapActions(CountriesStore, ["_fetchAllCountries"]),
  },
  created() {
    this._fetchAllCountries();
  },
};
</script>

<style scoped>
.li-country {
  list-style: none;
}
</style>
