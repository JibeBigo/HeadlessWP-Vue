<template>
  <v-app>      
    <NavBar/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "./components/layouts/Navbar"

export default {
  name: 'App',

  components: {
    NavBar
  },

};
</script>


