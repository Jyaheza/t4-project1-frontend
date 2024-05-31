import apiClient from "./services";

export default {
  getStories() {
    return apiClient.get("stories");
  },
  getStoriesByUserId(userId) {
    return apiClient.get(`stories/${userId}`);
  },
  getStory(id) {
    return apiClient.get(`stories/${id}`);
  },
  addStory(userId) {
    return apiClient.post(`stories/${userId}`);
  },
  updateStory(storyId, story) {
    return apiClient.put(`stories/${storyId}`, story);
  },
  deleteStory(storyId) {
    return apiClient.delete(`stories/${storyId}`);
  },
  extendStory(storyId) {
    return apiClient.post(`stories/extend/${storyId}`);
  }
};
