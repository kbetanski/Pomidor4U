<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-icon @click.stop="drawer = !drawer">mdi-menu</v-icon>

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
        <v-container
          fluid
          fill-height
        >
            <router-view />
        </v-container>

        <v-navigation-drawer v-model="drawer" absolute temporary>
          <v-list-item>
            <v-list-item-avatar>
              <v-img
                src="https://randomuser.me/api/portraits/men/78.jpg"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>John Leider</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list dense>
            <v-list-item v-for="item in items" :key="item.title" link>
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>

            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-sheet>
    </v-main>
  </v-app>
</template>

<script>
export default {
    name: 'App',

    data: () => ({
        drawer: null,
        items: [
            {
                title: 'Czasomierz',
                icon: 'mdi-clock-outline'
            },
            {
                title: 'Zadania',
                icon: 'mdi-clipboard-list-outline'
            },
            {
                title: 'Profil',
                icon: 'mdi-card-account-details-outline'
            },
            {
                title: 'Wyloguj',
                icon: 'mdi-exit-to-app'
            }
        ]
    })
}
</script>
