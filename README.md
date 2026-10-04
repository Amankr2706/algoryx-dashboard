# Algoryx React Dashboard

A modern, responsive, SaaS-style admin dashboard built for **Task 1** of the Algoryx Frontend Internship.

**Live demo:** _add your Vercel link here_

## 💻 Tech stack
React 18 (Vite), Tailwind CSS, Lucide React icons, React Hooks (`useState`, `useMemo`, `useEffect`, `useRef`, `useContext`)

## 🚀 Features
- Responsive sidebar with grouped navigation, live order badge and upgrade card (slides in on mobile)
- Top navigation with breadcrumb, search bar (Ctrl/Cmd + K shortcut), help, notifications and profile menu
- Greeting header with live date, **Export** (downloads orders as CSV) and **Add new** (validated order form)
- Dashboard stat cards
- Interactive revenue chart with range selector and hover values
- Recent activity feed (expandable)
- Recent orders table with status filter, global search and expandable list
- User profile card
- Light animations, hover effects and toast feedback on every button
- Working Invoices (filter, mark paid, download), Wallet (add funds, withdraw), Settings (edit profile, preferences) and Profile pages
- Help center, plans and privacy/terms dialogs
- Fully responsive: mobile, tablet, desktop

## Screenshots

### **Dashboard overview**  :


### **Invoices and Wallet**  :


### **Invoices and Wallet**  :


## 📂 Folder structure
```
src/
  pages/        Invoices, Wallet, Settings, Profile
  components/   Sidebar, Topbar, NotificationPanel, StatCard, OrdersTable, ProfileCard, RevenueChart, ActivityFeed, AddOrderModal, Toast
  data/         mockData.js
  App.jsx
  main.jsx
```

## Run locally
```
npm install
npm run dev
```
Build for production: `npm run build`

## Author
Aman Kumar Raman
