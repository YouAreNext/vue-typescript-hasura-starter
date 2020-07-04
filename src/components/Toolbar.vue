<template>
  <div>
    <v-navigation-drawer app fixed v-model="showMenu">
      <v-list dense>
        <v-list-item>
          <v-list-item-action>
            <v-icon>settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="getMe()">
          <v-list-item-action>
            <v-icon>help</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Help</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-action>
            <v-icon>logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logut</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app fixed dark color="primary">
      <v-app-bar-nav-icon @click.stop="toggleMenu"></v-app-bar-nav-icon>

      <v-toolbar-title>Vue News</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import GET_ME from "@/graphql/GetMe.gql";

@Component
export default class TopToolbar extends Vue {
  showMenu = false;
  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }
  async getMe() {
    const res = await this.$apollo.query({
      query: GET_ME,
      variables: {
        id: "1"
      }
    });

    console.log(res);
  }
  logout(): void {
    localStorage.removeItem("AUTH_TOKEN");
    this.$router.push({ path: "/login" });
  }
}
</script>
