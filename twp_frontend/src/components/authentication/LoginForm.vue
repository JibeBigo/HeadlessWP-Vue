<template>
  <div>
    <v-card class="px-10 pb-10 registerCard">
      <v-card-title class="justify-center">Login</v-card-title>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

        <v-text-field
          v-model="password"
          :type="show1 ? 'text' : 'password'"
          :counter="10"
          :rules="passwordRules"
          label="Password"
          required
        ></v-text-field>

        <v-btn :disabled="!valid" color="primary" class="mr-4" @click="validate">Login</v-btn>

        <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    show1: false,
    valid: true,
    password: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length >= 4) || "Password must be more than 4 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    // user: {
    //   email: this.email,
    //   password: this.password,
    // },
  }),

  computed: {
    ...mapGetters(["allUsers"]),
  },

  methods: {
    ...mapActions(["fetchUsers", "createUser"]),

    validate() {
      this.$refs.form.validate();
      this.createUser(this.user);
    },
    reset() {
      this.$refs.form.reset();
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
.registerCard {
  max-width: 500px;
  margin: auto;
  margin-top: 100px;
}
</style>