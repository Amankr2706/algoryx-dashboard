import {
  LayoutGrid,
  BarChart3,
  Users,
  Package,
  FileText,
  Wallet,
  Settings,
  X,
  Hexagon,
  Sparkles,
  LifeBuoy,
} from 'lucide-react'
import { useDialog } from './Dialogs'

const groups = [
  {
    label: 'Workspace',
    items: [
      { name: 'Overview', icon: LayoutGrid, target: 'overview' },
      { name: 'Analytics', icon: BarChart3, target: 'analytics' },
      { name: 'Customers', icon: Users, target: 'activity' },
      { name: 'Orders', icon: Package, target: 'orders', badge: true },
    ],
  },
  {
    label: 'Manage',
    items: [
      { name: 'Invoices', icon: FileText },
      { name: 'Wallet', icon: Wallet },
      { name: 'Settings', icon: Settings },
    ],
  },
]

export default function Sidebar({ open, onClose, active, onNavigate, pending }) {
  const { open: openDialog } = useDialog()
  const go = ({ name }) => {
    onNavigate(name)
    onClose()
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-navy-900 text-slate-300 transition-transform duration-300 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <div className="flex items-center gap-2.5 text-lg font-extrabold text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand">
              <Hexagon size={20} />
            </span>{' '}
            Algoryx
          </div>
          <button onClick={onClose} className="lg:hidden" aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 pt-3">
          {groups.map((g) => (
            <div key={g.label} className="mb-5">
              <p className="px-3 pb-2 text-xs font-semibold text-slate-500">{g.label}</p>
              <div className="space-y-1">
                {g.items.map((it) => (
                  <button
                    key={it.name}
                    onClick={() => go(it)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${active === it.name ? 'bg-brand text-white' : 'hover:bg-navy-800 hover:text-white'}`}
                  >
                    <it.icon size={18} /> {it.name}
                    {it.badge && pending > 0 && (
                      <span className="ml-auto rounded-full bg-white/15 px-2 py-0.5 text-xs">
                        {pending}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="space-y-3 p-3">
          <div className="rounded-xl bg-navy-800 p-4">
            <div className="flex items-center justify-between">
              <span className="rounded-lg bg-brand/20 p-2 text-brand">
                <Sparkles size={16} />
              </span>
              <span className="rounded-md bg-emerald-400/15 px-2 py-0.5 text-xs font-bold text-emerald-300">
                PRO
              </span>
            </div>
            <p className="mt-3 text-sm font-bold text-white">Unlock more insights</p>
            <p className="mt-1 text-xs text-slate-400">
              Get advanced analytics and unlimited exports.
            </p>
            <button
              onClick={() => openDialog('plans')}
              className="mt-3 text-xs font-bold text-brand hover:underline"
            >
              Upgrade plan
            </button>
          </div>
          <a
            href="mailto:hr@algoryx.in?subject=Dashboard%20support"
            className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-slate-400 hover:text-white"
          >
            <LifeBuoy size={16} /> Need help?{' '}
            <span className="font-semibold text-slate-200">Support</span>
          </a>
        </div>
      </aside>
    </>
  )
}
