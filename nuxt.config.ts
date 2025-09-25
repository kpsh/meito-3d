// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@vueuse/nuxt',
    '@tresjs/nuxt',
  ],
  ssr: false,
  devtools: { enabled: true },

  app: {
    baseURL: '/meito-3d/',
    head: {
      title: 'Meito 3D',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Meito 3D - Tokyo based blacksmith specializing in traditional knives and blades.' },
        { name: 'keywords', content: 'Meito, 3D Models, 3D Generation, Blades, Knives, Swords, Traditional Craftsmanship, Japan Swords, Katana' },
        { name: 'author', content: 'kpsh.github.io' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
  },

  compatibilityDate: '2025-07-16',

  eslint: {
    config: {
      stylistic: true,
    },
  },
})
