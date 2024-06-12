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

        var img = new Image();

        img.src = "../../public/moon-logo-white.jpg";

        doc.addImage(img, "JPG", 0.4, 0.4, 0.8, 0.8);

        doc.setFontSize(16).text(stories.value[0].title, 1.75, 1);

        doc.setLineWidth(0.01).line(0.5, 1.5, 8.0, 1.5);
 
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
                doc.setFontSize(12).text(doc.splitTextToSize(chapterText, 7.5), .5, 1.9);
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