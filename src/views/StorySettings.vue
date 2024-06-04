 <script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import SettingsServices from "../services/SettingsServices.js";

const settings = ref([]);
const isAdd = ref(false);
const isEdit = ref(false);
const user = ref(null);
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const newSetting = ref({
  id: undefined,
  name: undefined,
});

onMounted(async () => {
  await getSettings();
  user.value = JSON.parse(localStorage.getItem("user"));
});

async function getSettings() {
  await SettingsServices.getSettings()
    .then((response) => {
      settings.value = response.data;
    })
    .catch((error) => {
      console.log(error);
      snackbar.value.value = true;
      snackbar.value.color = "error";
      snackbar.value.text = error.response.data.message;
    });
}

async function addSetting() {
  isAdd.value = false;
  delete newSetting.id;
  await SettingsServices.addSettings(newSetting.value)
    .then(() => {
      snackbar.value.value = true;
      snackbar.value.color = "green";
      snackbar.value.text = `${newSetting.value.name} added successfully!`;
    })
    .catch((error) => {
      console.log(error);
      snackbar.value.value = true;
      snackbar.value.color = "error";
      snackbar.value.text = error.response.data.message;
    });
  await getSettings();
}

async function updateSetting() {
  isEdit.value = false;
  await SettingsServices.updateSettings(newSetting.value)
    .then(() => {
      snackbar.value.value = true;
      snackbar.value.color = "green";
      snackbar.value.text = `${newSetting.name} updated successfully!`;
    })
    .catch((error) => {
      console.log(error);
      snackbar.value.value = true;
      snackbar.value.color = "error";
      snackbar.value.text = error.response.data.message;
    });
  await getSettings();
}

function openAdd() {
  newSetting.value.name = undefined;
  isAdd.value = true;
}

function closeAdd() {
  isAdd.value = false;
}

function openEdit(item) {
  newSetting.value.id = item.id;
  newSetting.value.name = item.name;
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
            >Settings
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
          <tr v-for="item in settings" :key="item.name">
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
              >{{ isAdd ? "Add Setting" : isEdit ? "Edit Setting" : "" }}
            </v-card-title>
          </v-card-item>
          <v-card-text>
            <v-text-field
              v-model="newSetting.name"
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
                isAdd ? addSetting() : isEdit ? updateSetting() : false
              "
              >{{
                isAdd ? "Add Setting" : isEdit ? "Update Setting" : ""
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