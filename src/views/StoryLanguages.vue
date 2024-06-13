<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import LanguagesServices from "../services/LanguagesServices.js";

const languages = ref([]);
const isAdd = ref(false);
const isEdit = ref(false);
const user = ref(null);
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const newLanguage = ref({
  id: undefined,
  name: undefined,
});

onMounted(async () => {
  await getLanguages();
  user.value = JSON.parse(localStorage.getItem("user"));
});

async function getLanguages() {
  await LanguagesServices.getLanguages()
    .then((response) => {
      languages.value = response.data;
    })
    .catch((error) => {
      console.log(error);
      snackbar.value.value = true;
      snackbar.value.color = "error";
      snackbar.value.text = error.response.data.message;
    });
}

async function addLanguage() {
  isAdd.value = false;
  delete newLanguage.id;
  await LanguagesServices.addLanguages(newLanguage.value)
    .then(() => {
      snackbar.value.value = true;
      snackbar.value.color = "green";
      snackbar.value.text = `${newLanguage.value.name} added successfully!`;
    })
    .catch((error) => {
      console.log(error);
      snackbar.value.value = true;
      snackbar.value.color = "error";
      snackbar.value.text = error.response.data.message;
    });
  await getLanguages();
}

async function updateLanguage() {
  isEdit.value = false;
  await LanguagesServices.updateLanguages(newLanguage.value)
    .then(() => {
      snackbar.value.value = true;
      snackbar.value.color = "green";
      snackbar.value.text = `${newLanguage.name} updated successfully!`;
    })
    .catch((error) => {
      console.log(error);
      snackbar.value.value = true;
      snackbar.value.color = "error";
      snackbar.value.text = error.response.data.message;
    });
  await getLanguages();
}

function openAdd() {
  newLanguage.value.name = undefined;
  isAdd.value = true;
}

function closeAdd() {
  isAdd.value = false;
}

function openEdit(item) {
  newLanguage.value.id = item.id;
  newLanguage.value.name = item.name;
  isEdit.value = true;
}

function closeEdit() {
  isEdit.value = false;
}

function closeSnackBar() {
  snackbar.value.value = false;
}
</script>

<template>
  <v-container>
    <div id="body">
      <v-row align="center" class="mb-4">
        <v-col cols="10"
          ><v-card-title class="pl-0 text-h4 font-weight-bold"
            >Languages
          </v-card-title>
        </v-col>
        <v-col class="d-flex justify-end" cols="2">
          <v-btn v-if="user !== null" color="accent" @click="openAdd()"
            >Add</v-btn
          >
        </v-col>
      </v-row>

      <v-table class="rounded-lg elevation-5">
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in languages" :key="item.name">
            <td>{{ item.name }}</td>
            <td>
              <v-icon
                size="small"
                icon="mdi-pencil"
                @click="openEdit(item)"
              ></v-icon>
            </td>
          </tr>
        </tbody>
      </v-table>

      <v-dialog persistent :model-value="isAdd || isEdit" width="800">
        <v-card class="rounded-lg elevation-5">
          <v-card-item>
            <v-card-title class="headline mb-2"
              >{{ isAdd ? "Add Language" : isEdit ? "Edit Language" : "" }}
            </v-card-title>
          </v-card-item>
          <v-card-text>
            <v-text-field
              v-model="newLanguage.name"
              label="Name"
              required
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              variant="flat"
              color="secondary"
              @click="isAdd ? closeAdd() : isEdit ? closeEdit() : false"
              >Close</v-btn
            >
            <v-btn
              variant="flat"
              color="primary"
              @click="
                isAdd ? addLanguage() : isEdit ? updateLanguage() : false
              "
              >{{
                isAdd ? "Add Language" : isEdit ? "Update Language" : ""
              }}</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar v-model="snackbar.value" rounded="pill">
        {{ snackbar.text }}

        <template v-slot:actions>
          <v-btn
            :color="snackbar.color"
            variant="text"
            @click="closeSnackBar()"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-container>
</template>