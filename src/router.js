import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("./views/Login.vue"),
    },
    {
      path: "/recipes",
      name: "recipes",
      component: () => import("./views/StoriesList.vue"),
    },
    {
      path: "/recipe/:id",
      name: "editRecipe",
      props: true,
      component: () => import("./views/EditRecipe.vue"),
    },
    {
      path: "/ingredients",
      name: "ingredients",
      component: () => import("./views/IngredientList.vue"),
    },
    {
      path: "/maintain",
      name: "maintain",
      component: () => import("./views/StoryMaintain.vue"),
    },
    {
      path: "/stories",
      name: "stories",
      component: () => import("./views/StoriesList.vue"),
    },
    {
      path: "/characters",
      name: "characters",
      component: () => import("./views/StoryCharacterRoles.vue"),
    },
    {
      path: "/countries",
      name: "countries",
      component: () => import("./views/StoryCountries.vue"),
    },
    {
      path: "/languages",
      name: "languages",
      component: () => import("./views/StoryLanguages.vue"),
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("./views/StorySettings.vue"),
    },
    {
      path: "/storypdf",
      name: "storypdf",
      component: () => import("./views/StoryPDF.vue"),
    },
  ],
});

export default router;
