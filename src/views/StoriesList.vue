<template>
  <v-container>
    <div id="body">
      <v-row align="center" class="mb-4">
        <v-col cols="10">
          <v-card-title class="pl-0 text-h4 font-weight-bold">Recipes</v-card-title>
        </v-col>
        <v-col class="d-flex justify-end" cols="2">
          <v-btn v-if="user !== null" color="accent" @click="openAdd">Add</v-btn>
        </v-col>
      </v-row>

      <RecipeCard
        v-for="recipe in recipes"
        :key="recipe.id"
        :recipe="recipe"
        @deletedList="getRecipes"
      />

      <v-dialog persistent v-model="isAdd" width="800">
        <v-card class="rounded-lg elevation-5">
          <v-card-title class="headline mb-2">Add Story</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="newStory.setting"
              label="Story Setting"
              required
            ></v-text-field>

            <v-select
              v-model="newStory.leadCharacterName"
              :items="leadCharacterNames"
              label="Lead Character Name"
              required
            ></v-select>

            <v-text-field
              v-model="newStory.leadCharacterSpecies"
              label="Lead Character Species"
              required
            ></v-text-field>

            <v-select
              v-model="newStory.secondaryCharacter"
              :items="secondaryCharacters"
              label="Secondary Character"
              required
            ></v-select>

            <v-text-field
              v-model="newStory.characterObjective"
              label="Character Objective"
              required
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn variant="flat" color="secondary" @click="closeAdd">Close</v-btn>
            <v-btn variant="flat" color="primary" @click="addStory">Add Story</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-snackbar v-model="snackbar.value" rounded="pill">
        {{ snackbar.text }}

        <template v-slot:actions>
          <v-btn :color="snackbar.color" variant="text" @click="closeSnackBar">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import StoryCard from "../components/StoryCardComponent.vue";
import StoryServices from "../services/StoryServices.js";

const stories = ref([]);
const isAdd = ref(false);
const user = ref(null);
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const newStory = ref({
  storyId: "",
  userId: "",
  story: 0,
  parentId: "",
  createdAt: "",
  updatedAt: ""
});

onMounted(async () => {
  await getStories();
  user.value = JSON.parse(localStorage.getItem("user"));
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

async function addStory() {
  isAdd.value = false;
  await RecipeServices.addStory(user.value.id)
    .then(() => {
      snackbar.value.value = true;
      snackbar.value.color = "green";
      snackbar.value.text = `Story added successfully!`;
    })
    .catch((error) => {
      console.log(error);
      snackbar.value.value = true;
      snackbar.value.color = "error";
      snackbar.value.text = error.response.data.message;
    });
  await getStories();
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
</script>

<template>
  <v-container>
    <div id="body">
      <v-row align="center" class="mb-4">
        <v-col cols="10"><v-card-title class="pl-0 text-h4 font-weight-bold">Stories</v-card-title>
        </v-col>
        <v-col class="d-flex justify-end" cols="2">
          <v-btn v-if="user !== null" color="accent" @click="openAdd()">Add</v-btn>
        </v-col>
      </v-row>

      <StoryCard v-for="story in stories" :story="story" @deletedList="getLists()" />

      <v-dialog persistent v-model="isAdd" width="800">
        <v-card class="rounded-lg elevation-5">
          <v-card-title class="headline mb-2">Add Recipe </v-card-title>
          <v-card-text>
            <v-text-field v-model="newRecipe.name" label="Name" required>
            </v-text-field>

            <v-text-field v-model.number="newRecipe.servings" label="Number of Servings" type="number">
            </v-text-field>
            <v-text-field v-model.number="newRecipe.time" label="Time to Make (in minutes)" type="number">
            </v-text-field>

            <v-textarea v-model="newRecipe.description" label="Description">
            </v-textarea>
            <v-switch v-model="newRecipe.isPublished" hide-details inset
              :label="`Publish? ${newRecipe.isPublished ? 'Yes' : 'No'}`"></v-switch>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn variant="flat" color="secondary" @click="closeAdd()">Close</v-btn>
            <v-btn variant="flat" color="primary" @click="addRecipe()">Add Recipe</v-btn>
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
