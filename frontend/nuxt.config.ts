// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL, // Access the environment variable here
    },
  },
  css: [
    "~/assets/css/tailwind.css",
    '~/assets/global.css',
    '@fortawesome/fontawesome-free/css/all.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@pinia/nuxt', // This will automatically set up Pinia for you
  ],
})
