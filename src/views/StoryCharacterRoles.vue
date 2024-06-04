<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import CharacterServices from "../services/CharacterServices.js";

// const units = [
//   "cup",
//   "gallon",
//   "gram",
//   "kilogram",
//   "liter",
//   "milliliter",
//   "ounce",
//   "pint",
//   "piece",
//   "pound",
//   "quart",
//   "tablespoon",
//   "teaspoon",
//   "unit",
// ];

const characters = ref([]);
const isAdd = ref(false);
const isEdit = ref(false);
const user = ref(null);
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const newCharacter = ref({
  id: undefined,
  name: undefined,
});

onMounted(async () => {
  await getCharacters();
  user.value = JSON.parse(localStorage.getItem("user"));
});

async function getCharacters() {
  await CharacterServices.getCharacters()
    .then((response) => {
      characters.value = response.data;
    })
    .catch((error) => {
      console.log(error);
      snackbar.value.value = true;
      snackbar.value.color = "error";
      snackbar.value.text = error.response.data.message;
    });
}

async function addCharacter() {
  isAdd.value = false;
  delete newCharacter.id;
  await CharacterServices.addCharacters(newCharacter.value)
    .then(() => {
      snackbar.value.value = true;
      snackbar.value.color = "green";
      snackbar.value.text = `${newCharacter.value.name} added successfully!`;
    })
    .catch((error) => {
      console.log(error);
      snackbar.value.value = true;
      snackbar.value.color = "error";
      snackbar.value.text = error.response.data.message;
    });
  await getCharacters();
}

async function updateCharacter() {
  isEdit.value = false;
  await CharacterServices.updateCharacters(newCharacter.value)
    .then(() => {
      snackbar.value.value = true;
      snackbar.value.color = "green";
      snackbar.value.text = `${newCharacter.name} updated successfully!`;
    })
    .catch((error) => {
      console.log(error);
      snackbar.value.value = true;
      snackbar.value.color = "error";
      snackbar.value.text = error.response.data.message;
    });
  await getCharacters();
}

function openAdd() {
  newCharacter.value.name = undefined;
  isAdd.value = true;
}

function closeAdd() {
  isAdd.value = false;
}

function openEdit(item) {
  newCharacter.value.id = item.id;
  newCharacter.value.name = item.name;
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
            >Characters
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
          <tr v-for="item in characters" :key="item.name">
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
              >{{ isAdd ? "Add Character" : isEdit ? "Edit Character" : "" }}
            </v-card-title>
          </v-card-item>
          <v-card-text>
            <v-text-field
              v-model="newCharacter.name"
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
                isAdd ? addCharacter() : isEdit ? updateCharacter() : false
              "
              >{{
                isAdd ? "Add Character" : isEdit ? "Update Character" : ""
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
