<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-icon @click.stop="drawer">mdi-menu</v-icon>

      <v-spacer></v-spacer>

      <div class="d-flex align-center">
        <v-img
          alt="Pomidor4U Logo"
          class="shrink mr-2"
          contain
          src="./assets/logo.png"
          transition="scale-transition"
          width="40"
        />

        <div class="title">Pomidor4U</div>
      </div>
    </v-app-bar>

    <v-main>
      <v-sheet class="overflow-hidden fill-height" style="position: relative">
        <v-container fluid fill-height>
          <router-view />
        </v-container>

        <nav-bar ref="navBar" />
      </v-sheet>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
    name: 'App',
    components: {
        NavBar
    },
    methods: {
        drawer: function () {
            this.$refs.navBar.open()
        }
    }
}
</script>
