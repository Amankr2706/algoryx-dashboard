import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { activities } from '../data/mockData'

export default function ActivityFeed() {
  const [all, setAll] = useState(false)
  const items = all ? activities : activities.slice(0, 3)

  return (
    <div
      className="animate-rise rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm"
      style={{ animationDelay: '300ms' }}
    >
      <h2 className="font-bold">Recent activity</h2>
      <p className="text-sm text-slate-400">Stay up to date with your team</p>
      <ul className="mt-4 space-y-4">
        {items.map(({ icon: Icon, tone, title, sub, time }) => (
          <li key={title} className="flex items-center gap-3">
            <span className={`rounded-xl p-2.5 ${tone}`}>
              <Icon size={18} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-bold">{title}</span>
              <span className="block truncate text-xs text-slate-400">{sub}</span>
            </span>
            <span className="shrink-0 text-xs text-slate-400">{time}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setAll((a) => !a)}
        className="mt-5 flex w-full items-center justify-center gap-1 rounded-lg border border-slate-200 py-2.5 text-sm font-semibold hover:bg-slate-50"
      >
        {all ? 'Show less' : 'View all activity'} {!all && <ArrowUpRight size={14} />}
      </button>
    </div>
  )
}
