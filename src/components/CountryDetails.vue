<template>
  <!-- Country Details (Bootstrap column) -->
  <div class="col-7">
    <img v-if="country.alpha2Code !== ''"
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
              <li v-for="(borderCountry, index) in country.borders" :key="index">
                <router-link :to="`/list/${borderCountry}`">
                  {{ borderCountry }}
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
export default {
  name: "CountryDetails",
  data(){
    return {
      countryCode: '',
      country: {
        name: '',
        alpha2Code: '',
        capital: '',
        area: '',
        borders: []
      }
    }
  },
  methods: {
    async _getCountry(countryCode){
      const data = await fetch(`https://ih-countries-api.herokuapp.com/countries/${countryCode}`);
      const response = await data.json();
      const { name, alpha2Code, capital, area, borders } = response;
      this.country.name = name.common;
      this.country.alpha2Code = alpha2Code;
      this.country.capital = capital.join(', ');
      this.country.area = area;
      this.country.borders = borders;
    }
  },
  created(){
    const { alpha3Code } = this.$route.params;
    this.countryCode = alpha3Code;
    this._getCountry(alpha3Code);

    this.$watch(
      () => this.$route.params,
      (newParams, oldParams) => {
        this._getCountry(newParams.alpha3Code);
      }
    )
  }
};
</script>
<style></style>