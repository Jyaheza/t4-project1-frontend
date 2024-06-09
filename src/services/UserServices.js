import apiClient from "./services";

export default {
  getUser() {
    return apiClient.get("users");
  },

  async addUser(user) {
    return await apiClient.post("users", user);
  },

  async loginUser(user) {
    return await apiClient.post("login", user.value, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        crossDomain: true,
        Authorization:
          "Basic " + btoa(user.value.email + ":" + user.value.password),
      },
    });
  },
  logoutUser() {
    return apiClient.post("logout");
  },
};
