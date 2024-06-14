import jsPDF from "jspdf";
import { useRoute } from "vue-router";
import "jspdf-autotable";
import { ref } from "vue";
import StoryServices from "./StoryServices.js";

const route = useRoute();

export default {
    async generateStoryPDF(storyId) {
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "in",
            format: "letter",
        });

        let stories = [];
        stories = await getStory(storyId);

        doc.setFontSize(16).text(doc.splitTextToSize(stories.value[0].title, 7.5), .5, .75);

        doc.setLineWidth(0.01).line(0.5, 1.25, 8.0, 1.25);
 
        stories.value.forEach(story => {
            let chapterText = '';
            let isFirstChapter = true;

            if (story.index > 1) {
                doc.addPage('letter', 'portrait');
                chapterText += `\n\n Chapter ${story.index} \n\n`
                isFirstChapter = false;
            }

            doc.setFontSize(10).text(stories.value[0].title, 0.5, doc.internal.pageSize.height - 0.5);
            doc.setFontSize(10).text(story.index.toString(), 7.5, doc.internal.pageSize.height - 0.5);

            chapterText += story.story;

            if(isFirstChapter){
                doc.setFontSize(12).text(doc.splitTextToSize(chapterText, 7.5), .5, 1.75);
            } else{
                doc.setFontSize(12).text(doc.splitTextToSize(chapterText, 7.5), .5, .5);
            }
        });

        doc.save(`${stories.value[0].title}.pdf`);
    }
}

async function getStory(id) {
    const stories = ref([]);
    try {
        const response = await StoryServices.getStory(id);
        stories.value = response.data.map((storyItem, index) => ({
            ...storyItem,
            index: index + 1,
        }));
    } catch (error) {
        console.log("Error fetching stories:", error);
    }

    return stories;
}