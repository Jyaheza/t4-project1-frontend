<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import UserServices from "../services/UserServices";
import profileComponent from "../components/ProfileComponent.vue";
const router = useRouter();
const user = ref(null);
const users = ref([]);
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});



onMounted(async () => {
  getUser();
  user.value = JSON.parse(localStorage.getItem("user"));
});

async function getUser()
{
  user.value = JSON.parse(localStorage.getItem("user"));
  if (user.value !== null && user.value.id !== null) 
  {
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

      <profileComponent>v-for=</profileComponent>

    </div>
  </v-container>
</template>