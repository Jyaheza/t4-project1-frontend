import apiClient from "./services";

export default {
  getCharacters() {
    return apiClient.get("characters");
  },
  getCharactersById(id) {
    return apiClient.get("characters/" + id);
  },
  addCharacters(character) {
    return apiClient.post("characters", character);
  },
  updateCharacters(character) {
    return apiClient.put("characters/" + character.id, character);
  },
  deleteCharacters(characterId) {
    return apiClient.delete("characters/" + characterId);
  },
};