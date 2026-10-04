import { useState, useRef, useEffect } from 'react'
import {
  Menu,
  Search,
  Bell,
  HelpCircle,
  ChevronDown,
  User,
  Settings,
  LifeBuoy,
  LogOut,
} from 'lucide-react'
import NotificationPanel from './NotificationPanel'
import Avatar from './Avatar'
import { useDialog } from './Dialogs'

export default function Topbar({
  onMenu,
  active,
  user,
  onNavigate,
  onLogout,
  search,
  setSearch,
  notifications,
  setNotifications,
}) {
  const [showNotes, setShowNotes] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const inputRef = useRef(null)
  const { open: openDialog } = useDialog()
  const unread = notifications.filter((n) => !n.read).length
  const hint = typeof navigator !== 'undefined' && /Mac/i.test(navigator.platform) ? '⌘K' : 'Ctrl K'

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const menuItems = [
    { label: 'View profile', icon: User, run: () => onNavigate('Profile') },
    { label: 'Account settings', icon: Settings, run: () => onNavigate('Settings') },
    { label: 'Help center', icon: LifeBuoy, run: () => openDialog('help') },
    { label: 'Log out', icon: LogOut, run: onLogout },
  ]

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6">
      <button
        onClick={onMenu}
        className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>
      <p className="hidden text-sm md:block">
        <span className="text-slate-400">Workspace</span>{' '}
        <span className="mx-1 text-slate-300">/</span>{' '}
        <span className="font-semibold">{active}</span>
      </p>

      <div className="relative ml-auto max-w-sm flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          ref={inputRef}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search anything..."
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-16 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
        <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[11px] font-semibold text-slate-400 sm:block">
          {hint}
        </kbd>
      </div>

      <button
        onClick={() => openDialog('help')}
        className="hidden rounded-lg p-2 text-slate-500 hover:bg-slate-100 sm:block"
        aria-label="Help"
      >
        <HelpCircle size={20} />
      </button>

      <div className="relative">
        <button
          onClick={() => {
            setShowNotes((s) => !s)
            setShowMenu(false)
          }}
          className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          aria-label="Notifications"
        >
          <Bell size={20} />
          {unread > 0 && (
            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {unread}
            </span>
          )}
        </button>
        {showNotes && (
          <NotificationPanel
            notifications={notifications}
            setNotifications={setNotifications}
            onClose={() => setShowNotes(false)}
          />
        )}
      </div>

      <div className="relative">
        <button
          onClick={() => {
            setShowMenu((s) => !s)
            setShowNotes(false)
          }}
          className="flex items-center gap-2 rounded-lg p-1 pr-2 hover:bg-slate-100"
          aria-label="Account menu"
        >
          <Avatar name={user.name} />
          <span className="hidden text-left leading-tight lg:block">
            <span className="block text-sm font-bold">{user.name}</span>
            <span className="block text-xs text-slate-400">{user.role}</span>
          </span>
          <ChevronDown size={16} className="hidden text-slate-400 lg:block" />
        </button>
        {showMenu && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
            <div className="absolute right-0 z-20 mt-2 w-52 animate-pop rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">
              {menuItems.map(({ label, icon: Icon, run }) => (
                <button
                  key={label}
                  onClick={() => {
                    run()
                    setShowMenu(false)
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
                >
                  <Icon size={16} /> {label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </header>
  )
}
