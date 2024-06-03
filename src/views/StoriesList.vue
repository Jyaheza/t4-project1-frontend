<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import StoryCard from "../components/StoryCardComponent.vue";
import StoryServices from "../services/StoryServices.js";
import CharacterServices from "../services/CharacterServices";
import SettingsServices from "../services/SettingsServices.js";
import CountriesServices from "../services/CountriesServices.js";
import LanguagesServices from "../services/LanguagesServices.js";


const router = useRouter();
const stories = ref([]);
const isAdd = ref(false);
const user = ref(null);
const loading = ref(false);
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const newStory = ref({
  setting: "", 
  country: "",
  leadCharacter: "",
  leadCharacterSpecies: "",
  secondaryCharacter: "", 
  characterObjective: "",
  storyLanguage: "" 
});

const leadCharacters = ref([]);
const secondaryCharacters = ref([]);
const settings = ref([]);
const languages = ref([]);
const countries = ref([]);

onMounted(async () => {
  await getStories();
  user.value = JSON.parse(localStorage.getItem("user"));
  await loadDropdownData(); 
});

async function getStories() {
  user.value = JSON.parse(localStorage.getItem("user"));
  if (user.value !== null && user.value.id !== null) {
    await StoryServices.getStoriesByUserId(user.value.id)
      .then((response) => {
        stories.value = response.data;
      })
      .catch((error) => {
        console.log(error);
        snackbar.value.value = true;
        snackbar.value.color = "error";
        snackbar.value.text = error.response.data.message;
      });
  } else {
    await StoryServices.getStories()
      .then((response) => {
        stories.value = response.data;
      })
      .catch((error) => {
        console.log(error);
        snackbar.value.value = true;
        snackbar.value.color = "error";
        snackbar.value.text = error.response.data.message;
      });
  }
}

async function loadDropdownData() {
  try {
    const [charactersResponse, settingsResponse, languagesResponse, countryResponse] = await Promise.all([
      CharacterServices.getCharacters(),
      SettingsServices.getSettings(),
      LanguagesServices.getLanguages(),
      CountriesServices.getCountries()
    ]);

    leadCharacters.value = charactersResponse.data;
    secondaryCharacters.value = charactersResponse.data;
    settings.value = settingsResponse.data;
    languages.value = languagesResponse.data;
    countries.value = countryResponse.data;
  } catch (error) {
    console.log(error);
    snackbar.value.value = true;
    snackbar.value.color = "error";
    snackbar.value.text = "Failed to load dropdown data.";
  }
}

async function generateStory() {
  loading.value = true;
  try {
    await StoryServices.addStory(user.value.id, {
      storyParams: [
        { key: 'setting', value: newStory.value.setting },
        { key: 'country', value: newStory.value.country },
        { key: 'lead character', value: newStory.value.leadCharacter },
        { key: 'lead character species', value: newStory.value.leadCharacterSpecies },
        { key: 'secondary character', value: newStory.value.secondaryCharacter },
        { key: 'character objective', value: newStory.value.characterObjective },
        { key: 'story language', value: newStory.value.storyLanguage },
      ],
    });
    snackbar.value.value = true;
    snackbar.value.color = "green";
    snackbar.value.text = `Story added successfully!`;
    closeAdd();
  } catch (error) {
    console.log(error);
    snackbar.value.value = true;
    snackbar.value.color = "error";
    snackbar.value.text = error.response.data.message;
  } finally {
    loading.value = false;
    await getStories();
  }
}

function openAdd() {
  isAdd.value = true;
}

function closeAdd() {
  isAdd.value = false;
}

function closeSnackBar() {
  snackbar.value.value = false;
}

function viewStory(storyId) {
  router.push({ name: 'readStory', params: { id: storyId } });
}
</script>

<template>
  <v-container>
    <div id="body">
      <v-row align="center" class="mb-4">
        <v-col cols="10">
          <v-card-title class="pl-0 text-h4 font-weight-bold">Stories</v-card-title>
        </v-col>
        <v-col class="d-flex justify-end" cols="2">
          <v-btn v-if="user !== null" color="accent" @click="openAdd">Add</v-btn>
        </v-col>
      </v-row>

      <StoryCard v-for="story in stories" :key="story.storyId" :story="story" @click="viewStory(story.storyId)"/>

      <v-dialog persistent v-model="isAdd" width="800">
        <v-card class="rounded-lg elevation-5">
          <v-card-title class="headline mb-2">Add Story</v-card-title>
          <v-card-text>
            <v-select
              v-model="newStory.setting"
              :items="settings.map(setting => setting.name)"
              label="Story Setting"
              required
            ></v-select>

            <v-select
              v-model="newStory.country"
              :items="countries.map(country => country.name)"
              label="Country"
              required
            ></v-select>

            <v-select
              v-model="newStory.leadCharacter"
              :items="leadCharacters.map(character => character.name)"
              label="Lead Character"
              required
            ></v-select>

            <v-text-field
              v-model="newStory.leadCharacterSpecies"
              label="Lead Character Species"
              required
            ></v-text-field>

            <v-select
              v-model="newStory.secondaryCharacter"
              :items="secondaryCharacters.map(character => character.name)"
              label="Secondary Character"
              required
            ></v-select>

            <v-text-field
              v-model="newStory.characterObjective"
              label="Character Objective"
              required
            ></v-text-field>

            <v-select
              v-model="newStory.storyLanguage"
              :items="languages.map(language => language.name)"
              label="Story Language"
              required
            ></v-select>

            <v-progress-linear v-if="loading" indeterminate color="blue" class="mb-2"></v-progress-linear>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn variant="flat" color="secondary" @click="closeAdd">Close</v-btn>
            <v-btn :disabled="loading" variant="flat" color="primary" @click="generateStory">Add Story</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      
      <v-snackbar v-model="snackbar.value" rounded="pill">
        {{ snackbar.text }}
        <template v-slot:actions>
          <v-btn :color="snackbar.color" variant="text" @click="closeSnackBar()">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-container>
</template>

