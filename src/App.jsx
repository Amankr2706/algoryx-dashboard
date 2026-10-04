import { useState, useMemo } from 'react'
import { Download, Plus, Sparkles } from 'lucide-react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import StatCard from './components/StatCard'
import RevenueChart from './components/RevenueChart'
import OrdersTable from './components/OrdersTable'
import ActivityFeed from './components/ActivityFeed'
import ProfileCard from './components/ProfileCard'
import AddOrderModal from './components/AddOrderModal'
import Invoices from './pages/Invoices'
import Wallet from './pages/Wallet'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import { useToast } from './components/Toast'
import { useDialog } from './components/Dialogs'
import { stats, initialOrders, initialNotifications } from './data/mockData'

const defaultUser = {
  name: 'Aman Kumar',
  email: 'aman@example.com',
  role: 'Frontend Intern',
  location: 'India',
}
const sections = {
  Overview: 'overview',
  Analytics: 'analytics',
  Customers: 'activity',
  Orders: 'orders',
}
const greeting = () => {
  const h = new Date().getHours()
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [page, setPage] = useState('Overview')
  const [active, setActive] = useState('Overview')
  const [search, setSearch] = useState('')
  const [notifications, setNotifications] = useState(initialNotifications)
  const [orders, setOrders] = useState(initialOrders)
  const [showModal, setShowModal] = useState(false)
  const [user, setUser] = useState(() => {
    try {
      return { ...defaultUser, ...JSON.parse(localStorage.getItem('algoryx-user')) }
    } catch {
      return defaultUser
    }
  })
  const toast = useToast()
  const { open: openDialog } = useDialog()

  const saveUser = (u) => {
    setUser(u)
    try {
      localStorage.setItem('algoryx-user', JSON.stringify(u))
    } catch {
      /* ignore */
    }
  }
  const resetUser = () => {
    setUser(defaultUser)
    try {
      localStorage.removeItem('algoryx-user')
    } catch {
      /* ignore */
    }
  }

  const navigate = (name) => {
    setActive(name)
    if (sections[name]) {
      setPage('Overview')
      setTimeout(
        () => document.getElementById(sections[name])?.scrollIntoView({ behavior: 'smooth' }),
        60
      )
    } else {
      setPage(name)
      window.scrollTo({ top: 0 })
    }
  }
  const onSearch = (v) => {
    setSearch(v)
    if (v && page !== 'Overview') navigate('Orders')
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return orders.filter((o) =>
      [o.id, o.customer, o.email, o.status].some((v) => v.toLowerCase().includes(q))
    )
  }, [search, orders])

  const addOrder = (o) => {
    setOrders([
      { ...o, id: `ORD-${1049 + orders.length - initialOrders.length}`, date: 'Just now' },
      ...orders,
    ])
    toast('Order added')
  }

  const exportCsv = () => {
    const rows = [
      ['Order ID', 'Customer', 'Email', 'Amount', 'Status', 'Date'],
      ...orders.map((o) => [o.id, o.customer, o.email, o.amount, o.status, o.date]),
    ]
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(',')).join('\n')
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    a.download = 'orders.csv'
    a.click()
    URL.revokeObjectURL(a.href)
    toast('Orders exported as CSV')
  }
  const show = (p) => (page === p ? '' : 'hidden')
  const logout = () => toast('Logged out successfully (demo)')

  return (
    <div className="min-h-screen">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        active={active}
        onNavigate={navigate}
        pending={orders.filter((o) => o.status === 'Pending').length}
      />
      <div className="lg:pl-64">
        <Topbar
          onMenu={() => setSidebarOpen(true)}
          active={active}
          user={user}
          onNavigate={navigate}
          onLogout={logout}
          search={search}
          setSearch={onSearch}
          notifications={notifications}
          setNotifications={setNotifications}
        />
        <main className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">
          <div className={`space-y-6 ${show('Overview')}`}>
            <section
              id="overview"
              className="flex scroll-mt-20 flex-wrap items-end justify-between gap-4"
            >
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold text-brand">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <h1 className="mt-1 flex items-center gap-2 text-3xl font-extrabold tracking-tight">
                  {greeting()}, {user.name.split(' ')[0]}{' '}
                  <Sparkles className="text-brand" size={26} />
                </h1>
                <p className="mt-1 text-slate-500">
                  Here's what's happening with your business today.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={exportCsv}
                  className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold shadow-sm transition hover:bg-slate-50"
                >
                  <Download size={16} /> Export
                </button>
                <button
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600"
                >
                  <Plus size={16} /> Add new
                </button>
              </div>
            </section>
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((s, i) => (
                <StatCard key={s.title} {...s} delay={i * 80} />
              ))}
            </section>
            <section id="analytics" className="grid scroll-mt-20 gap-6 xl:grid-cols-3">
              <div className="xl:col-span-2">
                <RevenueChart />
              </div>
              <ProfileCard user={user} onNavigate={navigate} />
            </section>
            <section className="grid gap-6 xl:grid-cols-3">
              <div id="orders" className="scroll-mt-20 xl:col-span-2">
                <OrdersTable orders={filtered} />
              </div>
              <div id="activity" className="scroll-mt-20">
                <ActivityFeed />
              </div>
            </section>
          </div>
          <div className={show('Invoices')}>
            <Invoices />
          </div>
          <div className={show('Wallet')}>
            <Wallet />
          </div>
          <div className={show('Settings')}>
            <Settings user={user} onSave={saveUser} onReset={resetUser} />
          </div>
          <div className={show('Profile')}>
            <Profile user={user} onNavigate={navigate} />
          </div>

          <footer className="flex flex-wrap items-center justify-between gap-2 pb-2 text-xs text-slate-400">
            <span>© {new Date().getFullYear()} Algoryx. All rights reserved.</span>
            <span className="flex items-center gap-4">
              <button onClick={() => openDialog('privacy')} className="hover:text-slate-600">
                Privacy
              </button>
              <button onClick={() => openDialog('terms')} className="hover:text-slate-600">
                Terms
              </button>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                All systems operational
              </span>
            </span>
          </footer>
        </main>
      </div>
      {showModal && <AddOrderModal onClose={() => setShowModal(false)} onAdd={addOrder} />}
    </div>
  )
}
