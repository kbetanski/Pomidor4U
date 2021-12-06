<template>
  <v-form ref="loginForm" v-model="valid" lazy-validation>
    <v-text-field
      v-model="loginEmail"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
      v-model="loginPassword"
      :type="password"
      label="Password"
      counter
    ></v-text-field>
  </v-form>
</template>
