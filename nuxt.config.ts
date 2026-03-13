import { defineNuxtConfig } from 'nuxt/config';
import tailwindcss from '@tailwindcss/vite';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    adviceApi: process.env.ADV_API || '',
    adviceToken: process.env.TOKEN || '',
    basketId: 'MTA1NjYw',
  },
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
    'nuxt-viewport',
    '@nuxtjs/i18n',
  ],

  i18n: {
    // v10 resolves paths from `restructureDir` (default: "i18n"), so keep it at project root.
    restructureDir: '.',
    detectBrowserLanguage: false,
    // 1. บอกให้ Nuxt ใช้ไฟล์ config แยกที่เราสร้างไว้
    vueI18n: './i18n.config.ts', 
    
    // 2. กำหนดกลยุทธ์ (Strategy) แนะนำให้ใช้ 'no_prefix' ถ้าไม่ต้องการให้ URL เปลี่ยนเป็น /en/category
    strategy: 'no_prefix',
    
    // 3. กำหนดภาษาเริ่มต้น
    defaultLocale: 'th',
    locales: [
      { code: 'th', iso: 'th-TH', language: 'th-TH' },
      { code: 'en', iso: 'en-US', language: 'en-US' }
    ],
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
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
