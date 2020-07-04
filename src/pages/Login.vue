<template>
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="login"
                  name="login"
                  prepend-icon="mdi-account"
                  type="text"
                  :error="authError"
                  v-model="form.username"
                  :disabled="loginLoading"
                ></v-text-field>

                <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  :error="authError"
                  v-model="form.password"
                  :disabled="loginLoading"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-text class="red--text" v-if="authError">
              Error! Check your login and password.
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :disabled="loginLoading" color="primary" @click="login()"
                >Login</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import Vue from "vue";
import LOGIN from "@/graphql/Login.gql";
import Component from "vue-class-component";

@Component
export default class Login extends Vue {
  authError = false;
  loginLoading = false;

  private form: object = {
    username: "",
    password: ""
  };

  async login() {
    this.loginLoading = true;
    try {
      this.authError = false;
      const { data } = await this.$apollo.mutate({
        mutation: LOGIN,
        variables: {
          data: this.form
        },
        client: "b"
      });

      this.saveUserLocal(data.login.access_token);
      this.$router.push({ path: "/" });
    } catch (e) {
      console.error(e);
      this.authError = true;
    }
    this.loginLoading = false;
  }

  saveUserLocal(token: string): void {
    localStorage.setItem("AUTH_TOKEN", token);
  }
}
</script>
