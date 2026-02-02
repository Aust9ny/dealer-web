// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import process from 'node:process';

export default withNuxt(
  {
    // These rules apply to all files
    rules: {
      // Allow single-word components like index.vue or app.vue
      'vue/multi-word-component-names': 'off',
      
      // Basic code quality
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-unused-vars': 'warn',
      
      // Formatting preferences
      'quotes': ['error', 'single'],
      'semi': ['error', 'always']
    }
  }
);