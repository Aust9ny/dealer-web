# Architecture Overview - Dealer Web

This document provides a high-level view of the technical architecture and design principles of the `dealer-web` platform.

## 🏗️ Core Principles

- **Nuxt 3 First:** Leveraging the full potential of Nuxt 3's file-based routing, auto-imports, and server-side rendering (SSR) capabilities.
- **Composition API:** Heavily utilizing Vue 3's Composition API through Composables to encapsulate business logic and shared state.
- **Domain-Driven Components:** Components are organized by domain (e.g., `dashboard/`, `po/`, `product/`) to ensure scalability and maintainability.
- **TypeScript First:** Comprehensive typing for all data models (PO, Product, User, etc.) to ensure type safety and developer productivity.
- **Tailwind CSS 4:** Optimized styling using the latest Tailwind features for a fast, responsive, and modern UI.

## 🔄 Data Flow & State Management

The application avoids complex state management libraries like Pinia for most features, preferring Nuxt's built-in `useState` and shared Composables:

### Authentication & Authorization (`composables/auth/`)
- **`useAuth`**: Manages the active user's session, profile details, and role-based pricing logic.
- **`useUser`**: Mock or API-driven user data provider.
- **Role-Based Access**: The application adjusts UI elements and product pricing dynamically based on the user's role (Technician, Dealer, Franchise).

### Purchase Order (PO) Flow (`composables/po/`)
- **`usePOFlow`**: Orchestrates the 3-step PO process (Review -> Address -> Payment).
- **`usePOCheckoutState`**: Manages the transient state of the checkout process, ensuring data persistence between steps.
- **Middleware**: `middleware/po-owner.ts` ensures users can only access their own purchase orders.

### Dashboard & Analytics (`composables/dashboard/`)
- **`useDashboard`**: Handles data fetching and transformation for charts and performance metrics.
- **`useNavigation`**: Dynamically generates menu structures based on user roles and application state.

## 🗺️ Routing Strategy

- **Dashboard:** `/`
- **Product Catalog:** `/category`, `/category/[id]`, `/product/[slug]`
- **Purchase Orders:** `/po/[id]`, `/po/[id]/address`, `/po/[id]/payment`
- **User Profile:** `/Dealer_Profile`, `/Dealer_Profile/information`, `/Dealer_Profile/change-password`
- **Claims:** `/claim/claim_Report`, `/claim/claim_Decision`

## 🌍 Internationalization (i18n)

Configured in `nuxt.config.ts` and `i18n.config.ts`:
- **Default Locale:** Thai (`th`)
- **Supported:** English (`en`)
- **Strategy:** `no_prefix` for a cleaner URL structure (language state is managed via cookies/state).

## 📊 Analytics & Visualization

- Uses `Chart.js` with `vue-chartjs` for rendering sales performance charts.
- Charts are wrapped in `ClientOnly` to ensure proper hydration and browser-only rendering.

## 📦 Component Library

Components are located in `components/` and are auto-imported by Nuxt. They are categorized to keep the directory manageable:
- `layout/`: Shared layout components (Topbar, Footer, Nav).
- `product/`: Components related to product listings and display.
- `po/`: Components specific to the Purchase Order flow.
- `dashboard/`: Visualizations and widgets for the main dashboard.
- `skeleton/`: Loading state placeholders.

## 🛠️ Performance Optimizations

- **Image Optimization:** Uses `@nuxt/image` for responsive and optimized image delivery.
- **Lazy Loading:** Leveraging Nuxt's default lazy loading for components and routes.
- **Viewport Detection:** `nuxt-viewport` is used to conditionally render components or apply styles based on device size.

## 📝 Data Models & Field Names

- **Phone Numbers:**
  - `tel`: Used for stock notifications and general user contact.
  - `phone`: Specifically used for shipping addresses in the address detail page.
