<template>
  <!-- Country Details (Bootstrap column) -->
  <div class="col-7" v-if="singleCountry.alpha2Code !== ''">
    <img
      :src="`https://flagpedia.net/data/flags/w580/${singleCountry.alpha2Code.toLowerCase()}.png`"
      alt="country flag"
      style="width: 300px"
    />
    <h1>{{ singleCountry.name }}</h1>
    <table class="table">
      <thead></thead>
      <tbody>
        <tr>
          <td style="width: 30%">Capital</td>
          <td>{{ singleCountry.capital }}</td>
        </tr>
        <tr>
          <td>Area</td>
          <td>{{ singleCountry.area }} km <sup>2</sup></td>
        </tr>
        <tr>
          <td>Borders</td>
          <td>
            <ul>
              <li
                v-for="(borderCountry, index) in singleCountry.borders"
                :key="index"
              >
                <router-link :to="`/list/${borderCountry.alpha3Code}`">
                  {{ borderCountry.name }}
                </router-link>
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import CountriesStore from "../stores/CountriesStore";
import { mapState, mapActions, mapStores } from "pinia";

export default {
  name: "CountryDetails",
  data() {
    return {
      countryCode: "",
    };
  },
  computed: {
    ...mapState(CountriesStore, ["singleCountry"]),
  },
  methods: {
    ...mapActions(CountriesStore, ['_getCountryByCode']),
  },
  created() {
    // Get alpha3Code from params
    const { alpha3Code } = this.$route.params;
    this.countryCode = alpha3Code;

    // Once we have the countryCode, we can get the single country info
    this._getCountryByCode(this.countryCode);
    // console.log(this.country);

    //Watcher on URL params
    this.$watch(
      () => this.$route.params,
      (newParams, oldParams) => {
        console.log('newParams.alpha3Code --> ', newParams.alpha3Code)
        this._getCountryByCode(newParams.alpha3Code);
      }
    );
  },
};
</script>

<style></style>
