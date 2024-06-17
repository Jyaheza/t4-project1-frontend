<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import StoryServices from "../services/StoryServices";
import SettingsServices from "../services/SettingsServices";
import CharacterServices from "../services/CharacterServices";
import CountriesServices from "../services/CountriesServices";
import StoryPDFServices from "../services/StoryPDFServices.js";

const router = useRouter();
const route = useRoute();
const stories = ref([]);
const isAdd = ref(false);
const isLoading = ref(false);
const settings = ref([]);
const characterNames = ref([]);
const countries = ref([]);
let nextChapterNumber = 0;
const isEditStory = ref(false);
let editedTitle = ref('');

onMounted(async () => {
  await getStory();
});

const newChapter = ref({
  setting: '',
  additionalCharacter1: '',
  additionalCharacter2: '',
  country: '',
});

const snackbar = ref({
  value: false,
  color: "",
  text: "",
});

async function openAddChapter() {
  isLoading.value = true;
  await fetchData();
  isLoading.value = false;
  isAdd.value = true;
}

async function fetchData() {
  getSettings();
  getCharacters();
  getCountries();
}

function closeAddChapter() {
  isAdd.value = false;
}



async function getStory() {
  stories.value = [];
  try {
    const response = await StoryServices.getStory(route.params.id);
    stories.value = response.data.map((storyItem, index) => ({
      ...storyItem,
      index: index + 1,
    }));
    editedTitle.value = stories.value[0].title;
    nextChapterNumber = stories.value.length + 1;
  } catch (error) {
    console.log("Error fetching stories:", error);
  }
}

async function deleteStory(story, item) {

  // Check if the portion is the parent of the story
  if (story.parentId == null) {
    // If it is the parent story, delete all the children stories
    if(confirm("This will delete the whole story, continue?")) {
      let i = item.length - 1;
      while (i > -1) {
        // Loop through all the stories and delete until there is no more
        await StoryServices.deleteStory(story.userId, item[i].storyId);
        i--;
      }
      router.push({name: "stories"});
    }

  }
  // Just delete a chapter
  else if (confirm("Confirm deletion of Chapter " + story.index )) {
    await StoryServices.deleteStory(story.userId, story.storyId);
    await getStory();
  }
}

function editStory() {
  isEditStory.value = !isEditStory.value;
}

async function generateStoryPDF(storyId) {
  try {
    await StoryPDFServices.generateStoryPDF(storyId);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('An error occurred while generating the PDF.');
  }
}

async function addChapter() {
  const storyId = route.params.id;
  const newChapterAttributes = ref([
    { key: 'setting', value: newChapter.value.setting },
    { key: 'additionalCharacter1', value: newChapter.value.additionalCharacter1 },
    { key: 'additionalCharacter2', value: newChapter.value.additionalCharacter2 },
    { key: 'country', value: newChapter.value.country },
  ]);

  try {
    isLoading.value = true;
    const response = await StoryServices.extendStory(storyId, newChapterAttributes.value);
    isLoading.value = false;
    closeAddChapter();
    getStory();
  } catch (error) {
    console.error('Error extending story:', error);
    isLoading.value = false;
  }
}

async function getSettings() {
  try {
    const response = await SettingsServices.getSettings();
    settings.value = response.data.map(setting => setting.name);
  } catch (error) {
    console.error('Error fetching settings:', error);
    settings.value = [];
  }
}

async function getCharacters() {
  try {
    const response = await CharacterServices.getCharacters();
    characterNames.value = response.data.map(character => character.name)
  } catch (error) {
    console.error('Error fetching character:', error);
    characterNames.value = [];
  }
}

async function getCountries() {
  try {
    const response = await CountriesServices.getCountries();
    countries.value = response.data.map(country => country.name)
  } catch (error) {
    console.error('Error fetching country:', error);
    countries.value = [];
  }
}

async function saveStory(story, storyId) {
  await StoryServices.updateStory(storyId, story);
  isEditStory.value = false;
  getStory();
}

const expandedStoryIndexes = ref([1]);

function toggleStory(index) {
  const expandedIndex = expandedStoryIndexes.value.indexOf(index);
  if (expandedIndex === -1) {
    expandedStoryIndexes.value.push(index); // Expand
  } else {
    expandedStoryIndexes.value.splice(expandedIndex, 1); // Collapse
  }
}

</script>

<style>
.story-header {
  cursor: pointer;
  padding: 10px;
  background-color: #b5bedd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.story-title {
  flex-grow: 1;
}

.story-actions {
  display: flex;
  align-items: center;
}

.story-content {
  padding: 10px;
  background-color: #fafafa;
  border-top: 1px solid #ddd;
}

.single-line-textarea {
  resize: none;
  overflow: visible;
  height: auto;
  border: 1px solid #ccc;
  width: 70%;
}

.h2-textarea {
  font-size: 1.2em;
  font-weight: bold;
  line-height: 1.2em;
  padding: 0.2em 0.5em;
  height: 1.75em;
  background-color: white;
}
</style>

<template>
  <v-container>
    <v-row v-for="(story, index) in stories" :key="story.id">
      <v-col cols="12">
        <div class="story-header elevation-3" @click="toggleStory(index + 1)">
          <v-row>
            <v-col cols="12" md="8" lg="9" xl="10">
              <div class="story-title">
                <template v-if="story.index === 1">
                  <div v-if="!isEditStory">
                    <h2 class="d-inline">{{ story.title }}</h2>
                    <v-icon class="ml-4 pb-2" size="large" icon="mdi-pencil" @click.stop="editStory"></v-icon>
                  </div>
                  <div class="pt-2" v-else>
                    <textarea @click.stop v-model="editedTitle"
                      class="single-line-textarea h2-textarea">{{ story.title }}</textarea>
                    <div class="d-inline">
                      <v-icon class="ml-4 pb-6" size="large" icon="mdi-content-save"
                        @click.stop="saveStory({ storyID: story.storyId, userId: story.userId, story: story.story, title: editedTitle, parentId: story.parentId }, story.storyId)">
                      </v-icon>
                      <v-icon class="pb-6 pl-1" size="large" icon="mdi-cancel"
                        @click.stop="isEditStory = false"></v-icon>
                    </div>
                  </div>
                </template>
                <h3 v-if="story.index > 1">{{ `Chapter ${story.index}` }}</h3>
              </div>
            </v-col>
            <v-col cols="12" md="4" lg="3" xl=2>
              <div v-if="story.index === 1" class="story-actions">
                <v-icon class="mr-4" size="large" icon="mdi-file-pdf-box" @click.stop="generateStoryPDF(story.storyId)">
                </v-icon>
                <v-btn @click.stop="openAddChapter()">Add chapter</v-btn>
              </div>
              <v-icon class="mr-4" size="large" icon="mdi-delete" @click.stop="deleteStory(story, stories)" ></v-icon>
            </v-col>
          </v-row>
        </div>
        <div v-show="expandedStoryIndexes.includes(index + 1)" class="story-content">
          <div style="white-space: pre-line;" class="pt-5 pr-5 pl-5 pb-5 justify-content-xxl-center align-center">
            <v-row class="m-4">
              {{ story.story }}
            </v-row>
          </div>
        </div>
        <!-- Loading Spinner -->
        <v-dialog v-model="isLoading" hide-overlay persistent width="300">
          <v-card>
            <v-card-text>
              <v-row align="center" justify="center">
                Generating Chapter {{ nextChapterNumber }}. Please wait...
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </v-row>
            </v-card-text>
          </v-card>
        </v-dialog>
        <v-dialog persistent v-model="isAdd" width="800">
          <v-card class="rounded-lg elevation-5">
            <v-card-title class="headline mb-2">Add Chapter</v-card-title>
            <v-card-text>
              <v-select v-model="newChapter.setting" :items="settings" label="Story Setting" required></v-select>

              <v-select v-model="newChapter.additionalCharacter1" :items="characterNames" label="Additional Character 1"
                required></v-select>

              <v-select v-model="newChapter.additionalCharacter2" :items="characterNames" label="Additional Character 2"
                required></v-select>

              <v-select v-model="newChapter.country" :items="countries" label="Country" required></v-select>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn variant="flat" color="secondary" @click="closeAddChapter">Close</v-btn>
              <v-btn variant="flat" color="primary" @click="addChapter">Add Chapter</v-btn>
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
      </v-col>
    </v-row>
  </v-container>
</template>
