import { defineNuxtConfig } from 'nuxt/config'
import tailwindcss from '@tailwindcss/vite'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  future: { compatibilityVersion: 3 },
  css: ['@/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ]
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/hints',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
  ]
})
