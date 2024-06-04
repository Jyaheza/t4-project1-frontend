import apiClient from "./services";

export default {
  getLanguages() {
    return apiClient.get("languages");
  },
  getLanguages(id) {
    return apiClient.get("languages/" + id);
  },
  addLanguages(language) {
    return apiClient.post("languages", language);
  },
  updateLanguages(language) {
    return apiClient.put("languages/" + language.id, language);
  },
  deleteLanguages(languageId) {
    return apiClient.delete("languages/" + languageId);
  },
};