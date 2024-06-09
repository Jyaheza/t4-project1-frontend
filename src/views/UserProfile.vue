<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import UserServices from "../services/UserServices";
import { fi } from "vuetify/locale";
const router = useRouter();
const user = ref(null);
const users = ref([]);
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});



onMounted(async () => {
  await getUser();
  user.value = JSON.parse(localStorage.getItem("users"));
});

async function getUser() {
  user.value = JSON.parse(localStorage.getItem("user"));
  await UserServices.getUserById(user.value.id)
    .then((response) => {
      users.value = response.data;
    })
    .catch((error) => {
      console.log(error);
      snackbar.value.value = true;
      snackbar.value.color = "error";
      snackbar.value.text = error.response.data.message;
    });
}
</script>

<template>
  <v-container>
    <div id="body">
      <v-row align="center" class="mb-4">
        <v-col cols="10">
          <v-card-title class="pl-0 text-h4 font-weight-bold">User Profile</v-card-title>
        </v-col>
      </v-row>
    </div>
  </v-container>
  <v-card class="mx-auto" max-width="1000" tile>
        <v-avatar :rounded="5" size="150">
            <v-img
                :width="800"
                aspect-ratio="16/9"
                src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
            ></v-img>        </v-avatar>
      <v-table class="rounded-lg elevation-5">
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Email</th>
            <th class="text-left">ID</th>
          </tr>
        </thead>
        <tbody>
          <!-- <tr v-for="item in users" :key="item.id"> -->
          <tr>
            <td>{{ users.firstName }} {{ users.lastName }}</td>
            <td>{{ users.email }}</td>
            <td>{{ users.id }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
</template>