<template>
  <v-navigation-drawer v-model="drawer" absolute temporary>
    <v-list-item>
      <v-list-item-avatar color="primary" >
        {{ this.getName()[0] }}
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>{{ this.getName() }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>
    <v-list :key="this.$store.isLoggedIn" dense>
        <div v-for="item in routes" :key="item.meta.title">
      <v-list-item v-if="hide(item)" link>
        <v-list-item-icon>
          <v-icon>{{ item.meta.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title @click="router.push({ name: item.name })">{{
            item.meta.title
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
        </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import router from '../router'

export default {
    name: 'NavBar',
    computed: {
        routes: function () {
            return this.router.getRoutes()
        }
    },
    methods: {
        open: function () {
            this.drawer = !this.drawer
        },
        hide: function (route) {
            if (route.name === this.$router.currentRoute.name) {
                return
            }

            if (this.$store.getters.isLoggedIn) {
                return route.meta.requiresAuth
            } else if (!this.$store.getters.isLoggedIn) {
                return !route.meta.requiresAuth
            }
        },
        getName: function () {
            return this.$store.getters.name
        }
    },
    data: () => ({
        router: router,
        drawer: null
    })
}
</script>
