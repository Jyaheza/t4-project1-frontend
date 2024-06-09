import apiClient from "./services";

export default {
  getStories() {
    return apiClient.get("stories");
  },
  getStoriesByUserId(userId) {
    return apiClient.get(`stories/${userId}`);
  },
  getStory(id) {
    return apiClient.get(`stories/read/${id}`);
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
  async extendStory(storyId, payload) {
    return await apiClient.post(`stories/extend/${storyId}`, {"storyParams": payload});
  }
};
