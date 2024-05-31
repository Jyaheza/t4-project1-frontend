<script setup>
import { ref } from "vue";

const showStory = ref(false);

defineProps({
    story: {
        required: true,
    },
});

function deleteStory(){
    alert('Delete story not implemented yet.')
}

function editStory(){
    alert('Edit story not implemented yet.');
}

</script>

<template>
    <v-card class="rounded-lg elevation-5 mb-8" @click="showStory = !showStory">
        <v-card-text class="body-1">
            {{ `${story.story.substring(0, 100)}... ` }}
        </v-card-text>
        <v-card-title class="headline">
            <v-row align="center">
                <v-col class="d-flex justify-end">
                    <v-icon
                        size="small"
                        icon="mdi-delete"
                        @click.stop="deleteStory();">
                    </v-icon>
                </v-col>
                <v-col class="justify-end">
                    <v-icon
                        size="small"
                        icon="mdi-pencil"
                        @click.stop="editStory();">
                    </v-icon>
                </v-col>
            </v-row>
        </v-card-title>
    </v-card>
</template>