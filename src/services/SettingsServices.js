import apiClient from "./services";

export default {
  getSettings() {
    return apiClient.get("settings");
  },
  getSettingsById(id) {
    return apiClient.get("settings/" + id);
  },
  addSettings(setting) {
    return apiClient.post("settings", setting);
  },
  updateSettings(setting) {
    return apiClient.put("settings/" + setting.id, setting);
  },
  deleteSettings(settingId) {
    return apiClient.delete("settings/" + settingId);
  },
};