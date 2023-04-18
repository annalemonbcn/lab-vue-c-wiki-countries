import { defineStore } from "pinia";

export default defineStore("countries", {
  state() {
    return {
      countriesList: [],
      singleCountry: {},
    };
  },
  actions: {
    async _fetchAllCountries() {
      const data = await fetch(
        "https://ih-countries-api.herokuapp.com/countries"
      );
      const response = await data.json();
      this.countriesList = response;
      this._orderCountriesList();
    },
    _getCountryByCode(code) {
      const country = this.countriesList.find(
        (country) => country.alpha3Code === code
      );
      
      // Data equivalence
      this.singleCountry = {
        name: country.name.common,
        alpha2Code: country.alpha2Code,
        capital: country.capital.join(", "),
        area: country.area,
        borders: []
      };

      // Loop to get name of each border
      for (let i = 0; i < country.borders.length; i++) {
        this.singleCountry.borders.push({
          name: this._getCountryName(country.borders[i]),
          alpha3Code: country.borders[i],
        });
      }

      return this.singleCountry;
    },
    _getCountryName(code) {
      const country = this.countriesList.find(country => country.alpha3Code === code);
      return country.name.common;
    },
    _orderCountriesList() {
      this.countriesList.sort((a, b) => {
        if (a.name.common < b.name.common) {
          return -1;
        }
        if (a.name.common > b.name.common) {
          return 1;
        }
        return 0;
      });
    },
  },
});
