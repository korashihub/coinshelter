// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  routeRules: {
    "/": { prerender: true },
  },
  css: ["~/assets/css/main.css"],
  modules: [
    "@nuxt/ui",
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  ui: {
    icons: ["solar", "heroicons"],
  },
  colorMode: {
    preference: "dark",
  },
  googleFonts: {
    families: {
      Manrope: [200, 300, 400, 500, 600, 700, 800],
    },
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
});
