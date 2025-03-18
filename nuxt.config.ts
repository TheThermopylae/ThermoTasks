// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,
  css: ['~/assets/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      bodyAttrs: {
        dir: 'rtl'
      },
      // link: [
      //   { rel: 'icon', href: '/logo.png' }
      // ]
    },
  },
  modules: [
    'motion-v/nuxt',
  ],
  // build: {
  //   transpile: ['vue-toastification']
  // }
})