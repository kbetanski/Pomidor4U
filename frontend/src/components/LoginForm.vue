<template>
  <v-form v-model="valid" @submit.prevent="login">
    <v-col cols="auto">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            :rules="passwordRules"
            :counter="10"
            label="Hasło"
            required
            type="password"
          ></v-text-field>

          <v-btn color="primary" @click="login()">
            Zaloguj się
          </v-btn>
    </v-col>
  </v-form>
</template>
<script>

export default {
    data: () => ({
        valid: false,
        name: '',
        nameRules: [
            v => !!v || 'Name is required',
            v => v.length <= 10 || 'Name must be less than 10 characters'
        ],
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        password: '',
        passwordRules: [
            v => !!v || 'Password is required',
            v => v.length >= 10 || 'Password must be more than 10 characters',
            v => v.length <= 64 || 'Password must be less than 64 characters'
        ]
    }),
    methods: {
        login: async function () {
            try {
                await this.$store.dispatch('login', {
                    email: this.email,
                    password: this.password
                })

                this.$router.push({ name: 'Home', path: '/' })
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>
