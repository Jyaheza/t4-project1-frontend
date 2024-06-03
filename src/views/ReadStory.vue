<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
import UserServices from "../services/UserServices";
import StoryServices from "../services/StoryServices";

const route = useRoute();
const stories = ref([]);
const activeTab = ref(null);

onMounted(async () => {
  await getStory();
});

async function getStory() {
  await StoryServices.getStory(route.params.id)
    .then((response) => {
      response.data.forEach((storyItem, index) => {
        stories.value.push(storyItem);
      });
    })
    .catch((error) => {
      console.log(error);
    });

  stories.value.forEach((story, index) => {
    story.index = index + 1;
  });
}

function deleteStory() {
  alert('Delete story not implemented yet.')
}

function editStory() {
  alert('Edit story not implemented yet.');
}

function generatePDF() {
  alert('PDF generation not implemented yet.');
}

function addChapter(storyId){
  alert('Add chapter is not implemented yet');
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
</style>

<template>
  <v-container>
    <v-row v-for="(story, index) in stories" :key="story.id">
      {{ console.log(story) }}
      <v-col cols="12">
        <div class="story-header elevation-3" @click="toggleStory(index + 1)">
          <div class="story-title">
            <h2 v-if="story.index === 1">{{ story.title }}</h2>
            <h3 v-if="story.index > 1">{{ `Chapter ${story.index}` }}</h3>
          </div>
          <div v-if="story.index === 1" class="story-actions">
            <v-icon class="mr-4" size="large" icon="mdi-delete" @click.stop="deleteStory(story.id)">
            </v-icon>
            <v-icon class="mr-4" size="large" icon="mdi-pencil" @click.stop="editStory(story.id)">
            </v-icon>
            <v-icon class="mr-4" size="large" icon="mdi-file-pdf-box" @click.stop="generatePDF(story.id)">
            </v-icon>
            <v-btn @click.stop="addChapter(story.id)">Add chapter</v-btn>
          </div>
        </div>
        <div v-show="expandedStoryIndexes.includes(index + 1)" class="story-content">
            <div style="white-space: pre-line;" class="pt-5 pr-5 pl-5 pb-5 justify-content-xxl-center align-center">
              <v-row class="m-4">
                {{ story.story }}
              </v-row>
            </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
