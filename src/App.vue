<template>
  <div class="app">
    <div>
      <!-- Navbar -->
      <Navbar />
      
      <!-- Bootstrap container wrapper div -->
      <div class="container">
        <!-- Bootstrap row wrapper div -->
        <div class="row">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import CountriesList from "./components/CountriesList.vue";
import CountryDetails from "./components/CountryDetails.vue";

export default {
  name: "App",
  data() {},
  components: {
    Navbar,
    CountriesList,
    CountryDetails
  },
};
</script>

<style></style>
