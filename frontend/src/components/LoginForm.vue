<template>
  <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
    <div>
      <v-tabs v-model="tab" show-arrows icons-and-text grow>
        <v-tabs-slider></v-tabs-slider>
        <v-tab v-for="i in tabs" :key="i.name">
          <v-icon large>{{ i.icon }}</v-icon>
          <div class="caption py-1">{{ i.name }}</div>
        </v-tab>
        <v-tab-item>
          <v-card class="px-4">
            <v-card-text>
              <v-form ref="loginForm" v-model="valid" lazy-validation>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      label="E-mail"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="password"
                      :append-icon="show ? 'eye' : 'eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="show ? 'text' : 'password'"
                      label="Hasło"
                      maxlength="64"
                      hint="Minimalna długość 10 znaków"
                      counter
                      @click:append="show = !show"
                    ></v-text-field>
                  </v-col>
                  <v-col class="d-flex" cols="12" sm="6" xsm="12"> </v-col>
                  <v-spacer></v-spacer>
                  <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                    <v-btn
                      x-large
                      block
                      :disabled="!valid"
                      color="success"
                      @click="login"
                    >
                      Login
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card class="px-4">
            <v-card-text>
              <v-form ref="registerForm" v-model="valid" lazy-validation>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="name"
                      :rules="[rules.required]"
                      label="Imię"
                      maxlength="20"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      label="E-mail"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="password"
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="show ? 'text' : 'password'"
                      maxlength="64"
                      label="Hasło"
                      hint="Przynajmniej 10 znaków"
                      counter
                      @click:append="show = !show"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      block
                      v-model="verify"
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, passwordMatch]"
                      :type="show ? 'text' : 'password'"
                      maxlength="64"
                      label="Potwierdź hasło"
                      counter
                      @click:append="show = !show"
                    ></v-text-field>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                    <v-btn
                      x-large
                      block
                      :disabled="!valid"
                      color="success"
                      @click="register"
                      >Register</v-btn
                    >
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </div>
  </v-dialog>
</template>
<script>
export default {
    name: 'LoginForm',
    computed: {
        passwordMatch () {
            return () => this.password === this.verify || 'Password must match'
        }
    },
    methods: {
        login: async function () {
            try {
                await this.$store.dispatch('login', {
                    email: this.email,
                    password: this.password
                })

                this.$router.push({ name: 'Home' })
            } catch (error) {
                console.error(error)
            }
        },
        register: async function () {
            try {
                await this.$store.dispatch('register', {
                    name: this.name,
                    email: this.email,
                    password: this.password
                })

                this.$router.push({ name: 'Home' })
            } catch (error) {
                console.error(error)
            }
        }
    },
    data: () => ({
        dialog: true,
        tab: 0,
        tabs: [
            { name: 'Zaloguj się', icon: 'mdi-account' },
            { name: 'Utwórz konto', icon: 'mdi-account-outline' }
        ],
        valid: true,
        name: '',
        email: '',
        password: '',
        verify: '',
        emailRules: [
            (v) => !!v || 'Wymagane pole',
            (v) => /.+@.+\..+/.test(v) || 'E-mail musi być prawidłowy'
        ],
        show: false,
        rules: {
            required: (value) => !!value || 'Wymagane pole',
            min: (v) => (v && v.length >= 10) || 'Minimum 10 znaków'
        }
    })
}
</script>
