# Algoryx React Dashboard

A modern, responsive, SaaS-style admin dashboard built for **Task 1** of the Algoryx Frontend Internship.

**Live demo:** https://algoryx-dashboard-psi.vercel.app

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

### **Dashboard Overview**  :
<img width="1898" height="862" alt="Dashboard Overview" src="https://github.com/user-attachments/assets/0c2e7b1c-4a64-44ed-84a4-9dee7f69711a" />

### **Orders Table**  :
<img width="1898" height="864" alt="Orders Table" src="https://github.com/user-attachments/assets/6d91fd67-e90d-482b-b062-d0a46800f22b" />

### **Invoices and Wallet**  :
<img width="1898" height="861" alt="Invoice" src="https://github.com/user-attachments/assets/0dec7046-f58f-443a-a0ad-0e38c9dc09e3" />
<img width="1916" height="863" alt="Wallet" src="https://github.com/user-attachments/assets/c67259e9-adf7-4462-89fb-85d114da5159" />

### **Profile Card**  :
<img width="1917" height="862" alt="Profile Card" src="https://github.com/user-attachments/assets/44da3a02-7dc2-4e1d-9592-46b06cc39842" />

### **Mobile View**  :
<img width="828" height="465" alt="Mobile View" src="https://github.com/user-attachments/assets/56a9a677-f6e0-4ef9-8dc0-9eb20d9ff6f7" />


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
