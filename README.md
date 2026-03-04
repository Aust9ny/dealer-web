# Dealer Web Platform

A comprehensive B2B e-commerce and dashboard platform for dealers, built with Nuxt 3, Vue 3, and Tailwind CSS.

## 🚀 Features

- **📊 Interactive Dashboard:** Real-time sales insights, performance metrics, and monthly growth charts using Chart.js.
- **🛒 Purchase Order (PO) System:** A streamlined 3-step checkout process for dealers:
  1. **Review:** Check items and quantities.
  2. **Delivery:** Select address and shipping methods.
  3. **Payment:** Secure payment processing.
- **📦 Product Management:** Extensive product catalog with categories, search, and detailed product views.
- **👤 User Profiles:** Role-based access and pricing (Technician, Dealer, Franchise).
- **🌍 Internationalization:** Full support for Thai (default) and English languages.
- **📱 Responsive Design:** Mobile-first approach with optimized views for all devices.
- **🛡️ Claims System:** Integrated reporting and decision-making for product claims.

## 🛠️ Tech Stack

- **Framework:** [Nuxt 3](https://nuxt.com/)
- **UI Logic:** [Vue 3](https://vuejs.org/) (Composition API)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management:** Nuxt Composables & `useState`
- **Charts:** [Chart.js](https://www.chartjs.org/) with `vue-chartjs`
- **i18n:** [@nuxtjs/i18n](https://i18n.nuxtjs.org/)
- **Icons:** [Iconify](https://iconify.design/)

## 📦 Project Structure

```text
├── components/          # Reusable Vue components (Domain-driven)
├── composables/         # Shared business logic and state
├── layouts/             # Application layouts
├── middleware/          # Route middleware
├── pages/               # Application routes (File-based routing)
├── public/              # Static assets
├── server/              # Nitro server-side code
├── types/               # TypeScript interfaces and types
└── assets/css/          # Global styles and Tailwind configuration
```

## 🛠️ Setup

### Prerequisites

- Node.js (>= 20.x < 24.x)
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

### Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📖 Documentation

- [Architecture Overview](./docs/ARCHITECTURE.md)

## 📄 License

Private - All rights reserved.
