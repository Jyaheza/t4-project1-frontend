<script setup>
import moonLogo from "/moon-logo.png";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import UserServices from "../services/UserServices";

const router = useRouter();

const user = ref(null);
const title = ref("Bedtime Stories");
const logoURL = ref("");

onMounted(() => {
  logoURL.value = moonLogo;
  user.value = JSON.parse(localStorage.getItem("user"));
  if (user.value != null)
  {
    // Make sure theres a user logged in and take the first name and last name of the user
    user.value.firstName = JSON.parse(localStorage.getItem("menuBarFirst"));
    user.value.lastName = JSON.parse(localStorage.getItem("menuBarLast"));
    user.value.email = JSON.parse(localStorage.getItem("menuBarEmail"));
  }
});

function logout() {
  UserServices.logoutUser()
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
  // Release the local storage items
  localStorage.removeItem("user");
  localStorage.removeItem("menuBarFirst");
  localStorage.removeItem("menuBarLast");
  user.value = null;
  router.push({ name: "login" });
}

</script>

<template>
  <div>
    <v-app-bar color="primary" app dark>
      <router-link :to="{ name: 'stories' }">
        <v-img
          class="mx-2"
          :src="logoURL"
          height="50"
          width="50"
          contain
        ></v-img>
      </router-link>

      <v-toolbar-title class="title">
        {{ title }}
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn v-if="user !== null" class="mx-2" :to="{ name: 'stories' }">Stories</v-btn>
      <v-btn v-if="user !== null" class="mx-2" :to="{ name: 'maintain' }">
        Maintain
      </v-btn>

      <v-btn v-if="user === null" class="mx-2" :to="{ name: 'login' }">
        Login
      </v-btn>
      <v-menu v-if="user !== null" min-width="200px" rounded>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar class="mx-auto text-center" color="accent" size="large">
              <span class="white--text font-weight-bold">{{
                `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
              }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar color="accent">
                <span class="white--text text-h5">{{
                  `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
                }}</span>
              </v-avatar>
              <h3>{{ `${user.firstName} ${user.lastName}` }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn rounded variant="text" @click="router.push({ name: 'profile'})"> Profile </v-btn>
              <v-btn rounded variant="text" @click="logout()"> Logout </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-app-bar>
  </div>
</template>