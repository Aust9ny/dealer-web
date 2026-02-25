import { defineNuxtConfig } from 'nuxt/config';
import tailwindcss from '@tailwindcss/vite';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['@/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
    server: {
      allowedHosts: [
        'dispatch-queens-injection-counting.trycloudflare.com', // ใส่ชื่อที่มันแจ้ง error มา
        '.trycloudflare.com' // หรือใส่แบบ wildcard เพื่อให้ครอบคลุมทุกลิงก์ของ Cloudflare
      ]
    }
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/hints',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/fonts',
    'nuxt-viewport'
  ],
  viewport: {
    // ตั้งค่า breakpoints ตามที่คุณต้องการ (หรือใช้ค่าเริ่มต้น)
    breakpoints: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
});
