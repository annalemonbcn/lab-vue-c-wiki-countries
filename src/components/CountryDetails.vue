<template>
  <!-- Country Details (Bootstrap column) -->
  <div class="col-7">
    <img
      v-if="country.alpha2Code !== ''"
      :src="`https://flagpedia.net/data/flags/w580/${country.alpha2Code.toLowerCase()}.png`"
      alt="country flag"
      style="width: 300px"
    />
    <h1>{{ country.name }}</h1>
    <table class="table">
      <thead></thead>
      <tbody>
        <tr>
          <td style="width: 30%">Capital</td>
          <td>{{ country.capital }}</td>
        </tr>
        <tr>
          <td>Area</td>
          <td>{{ country.area }} km <sup>2</sup></td>
        </tr>
        <tr>
          <td>Borders</td>
          <td>
            <ul>
              <li
                v-for="(borderCountry, index) in country.borders"
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
      countryCode: '',
      country: {
        name: "",
        alpha2Code: "",
        capital: "",
        area: "",
        borders: [],
      },
    };
  },
  computed: {
    ...mapState(CountriesStore, ["countriesList"]),
  },
  methods: {
    ...mapActions(CountriesStore, ["_fetchAllCountries"]),
    
    // Filter the array of countries based on the country code
    _getCountryInfo(code) {
      // Loop the countriesList array
      for (let i = 0; i < this.countriesList.length; i++) {

        if (this.countriesList[i].alpha3Code === code) {

          const { name, alpha2Code, capital, area, borders } = this.countriesList[i];
          // Data equivalence
          this.country.name = name.common;
          this.country.alpha2Code = alpha2Code;
          this.country.capital = capital.join(", ");
          this.country.area = area;
          // Borders equivalence
          for(let y = 0; y < borders.length; y++){
            this.country.borders.push({name: this._getCountryName(borders[y]), alpha3Code: borders[y]});
          }
        }
      }
      console.log(this.country.borders);
    },
    _getCountryName(code){
      for(let i = 0; i < this.countriesList.length; i++){
        if (this.countriesList[i].alpha3Code === code) {
          return this.countriesList[i].name.common;
        }
      }
    }
  },
  created() {
    // Get alpha3Code from params
    const { alpha3Code } = this.$route.params;
    this.countryCode = alpha3Code;

    // Once we have the countryCode, we can get the single country info
    this._getCountryInfo(this.countryCode);

    //Watcher on URL params
    this.$watch(
      () => this.$route.params,
      (newParams, oldParams) => {
        this._getCountryInfo(newParams.alpha3Code);
      }
    );
  },
};
</script>

<style></style>