import { defineStore } from "pinia";

export default defineStore("countries", {
  state() {
    return {
      countriesList: [],
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
