export default function NotificationPanel({ notifications, setNotifications, onClose }) {
  const markAllRead = () => setNotifications(notifications.map((n) => ({ ...n, read: true })))
  const markRead = (id) =>
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))

  return (
    <div className="absolute right-0 mt-2 w-72 animate-pop rounded-xl border border-slate-200 bg-white shadow-lg sm:w-80">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <h3 className="text-sm font-bold">Notifications</h3>
        <button onClick={markAllRead} className="text-xs font-semibold text-brand hover:underline">
          Mark all as read
        </button>
      </div>
      <ul className="max-h-72 overflow-y-auto">
        {notifications.map((n) => (
          <li key={n.id}>
            <button
              onClick={() => markRead(n.id)}
              className="flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-slate-50"
            >
              <span
                className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.read ? 'bg-slate-300' : 'bg-brand'}`}
              />
              <span>
                <span className={`block text-sm ${n.read ? 'text-slate-500' : 'font-semibold'}`}>
                  {n.text}
                </span>
                <span className="text-xs text-slate-400">{n.time}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={onClose}
        className="w-full border-t border-slate-100 py-2.5 text-xs font-semibold text-slate-500 hover:bg-slate-50"
      >
        Close
      </button>
    </div>
  )
}
