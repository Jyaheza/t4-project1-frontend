<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import UserServices from "../services/UserServices.js";
const router = useRouter();
const localStorageUser = ref(null);
const users = ref([]);
const isEdit = ref(false);
const newUser = ref({
  id: undefined,
  firstName: undefined,
  lastName: undefined,
});
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});





onMounted(async () => {
  await getUser();
  localStorageUser.value = JSON.parse(localStorage.getItem("users"));
});

async function getUser() {
  localStorageUser.value = JSON.parse(localStorage.getItem("user"));
  if (localStorageUser.value !== null && localStorageUser.value.id !== null)
  {
    await UserServices.getUserById(localStorageUser.value.id)
    .then((response) => {
      users.value = response.data;
    })
    .catch((error) => {
      snackbar.value.value = true;
      snackbar.value.color = "error";
      snackbar.value.text = error.response.data.message;
    });
  }
}

function openEdit(users) {
  // Take the users information inputted from the text field and saved to a
  // variable called newUser
  var item = users;
  newUser.value.id = item.id;
  newUser.value.firstName = item.firstName;
  newUser.value.lastName = item.lastName;
  newUser.value.email = item.email;
  isEdit.value = true;
}

async function updateUser() {
  isEdit.value = false;
  // Update the local storage menu bar to display the new updated name
  localStorage.setItem("menuBarFirst", JSON.stringify(newUser.value.firstName));
  localStorage.setItem("menuBarLast", JSON.stringify(newUser.value.lastName));
  await UserServices.updateUsers(newUser.value) // Update the users new credentials
    .then(() => {
      snackbar.value.value = true;
      snackbar.value.color = "green";
      snackbar.value.text = `${newUser.name} updated successfully!`;
    })
    .catch((error) => {
      snackbar.value.value = true;
      snackbar.value.color = "error";
      snackbar.value.text = error.response.data.message;
    });
  await getUser();
}

function closeEdit() {
  isEdit.value = false;
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
        <v-col cols="15" class="d-flex justify-end">
          <!-- Pass the function with the users information to the openEdit function -->
            <v-icon size="small" icon="mdi-pencil" @click.stop="openEdit(users)"></v-icon>
        </v-col>
      <v-table class="rounded-lg elevation-5">
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Email</th>
            <th class="text-left">ID</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <!-- Display the users information in a table -->
            <td>{{ users.firstName }} {{ users.lastName }}</td>
            <td>{{ users.email }}</td>
            <td>{{ users.id }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card>

    <v-dialog persistent :model-value="isEdit" width="800">
      <v-card class="rounded-lg elevation-5">
        <v-card-item>
          <v-card-title class="headline mb-2">
            {{ isEdit ? "Edit User Profile" : "" }}
          </v-card-title>
        </v-card-item>
        <v-card-text>
            <v-text-field
              v-model="newUser.firstName"
              label="First name"
              required
            ></v-text-field>
            <v-text-field
              v-model="newUser.lastName"
              label="Last name"
              required
            ></v-text-field>
            <v-text-field
              v-model="newUser.email"
              label="Email"
              required
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              variant="flat"
              color="secondary"
              @click="isEdit ? closeEdit() : false"
              >Close</v-btn
            >
            <v-btn
              variant="flat"
              color="primary"
              @click="
                updateUser()
              "
              >{{
                isEdit ? "Update User Profile" : ""
              }}</v-btn
            >
          </v-card-actions>
      </v-card>
    </v-dialog>
</template>