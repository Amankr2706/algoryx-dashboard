import { Mail, MapPin, Briefcase, Calendar, Pencil } from 'lucide-react'
import Avatar from '../components/Avatar'

export default function Profile({ user, onNavigate }) {
  const facts = [
    [Mail, user.email],
    [Briefcase, 'Algoryx Internship'],
    [MapPin, user.location],
    [Calendar, 'Joined September 2026'],
  ]
  const stats = [
    ['Orders handled', '1,264'],
    ['Invoices sent', '6'],
    ['Tasks completed', '1 of 4'],
  ]

  return (
    <div className="space-y-6 animate-rise">
      <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm">
        <div className="h-32 bg-gradient-to-r from-navy-900 via-navy-700 to-brand" />
        <div className="flex flex-wrap items-end justify-between gap-4 px-6 pb-6">
          <div className="-mt-12 flex items-end gap-4">
            <div className="rounded-full border-4 border-white">
              <Avatar name={user.name} size="h-24 w-24" text="text-3xl" />
            </div>
            <div className="pb-1">
              <h1 className="text-2xl font-extrabold">{user.name}</h1>
              <p className="text-slate-500">{user.role}</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('Settings')}
            className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-600"
          >
            <Pencil size={16} /> Edit profile
          </button>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm">
          <h2 className="font-bold">About</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            {facts.map(([Icon, t]) => (
              <li key={t} className="flex items-center gap-3">
                <Icon size={16} className="text-brand" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 lg:col-span-2">
          {stats.map(([t, v]) => (
            <div key={t} className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-500">{t}</p>
              <p className="mt-2 text-2xl font-extrabold">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
