import apiClient from "./services";

export default {
  getCountries() {
    return apiClient.get("countries");
  },
  getCountriesById(id) {
    return apiClient.get("countries/" + id);
  },
  addCountries(country) {
    return apiClient.post("countries", country);
  },
  updateCountries(country) {
    return apiClient.put("countries/" + country.id, country);
  },
  deleteCountries(countryId) {
    return apiClient.delete("countries/" + countryId);
  },
};