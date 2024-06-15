<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import StoryPDFServices from "../services/StoryPDFServices.js";

const props = defineProps({
    story: {
        required: true,
    },
});

const emit = defineEmits(['storySelected']);

async function generateStoryPDF(storyId) {
  try {
    await StoryPDFServices.generateStoryPDF(storyId);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('An error occurred while generating the PDF.');
  }
}

function navigateToStoryDetail() {
    emit('storySelected', props.story.storyId);
}

</script>

<template>
    <v-card class="rounded-lg elevation-5 mb-8" @click="navigateToStoryDetail">
        <v-card-title class="headline">
            {{ `${story.title}` }}
        </v-card-title>
        <v-card-text class="body-1">
            {{ `${story.story.substring(0, 100)}... ` }}
        </v-card-text>
        <v-card-title class="headline">
            <v-row align="center">
                <v-col cols="1" class="d-flex justify-end">
                    <v-icon size="small" icon="mdi-file-pdf-box" @click.stop="generateStoryPDF(story.storyId);">
                    </v-icon>
                </v-col>
            </v-row>
        </v-card-title>
    </v-card>
</template>
