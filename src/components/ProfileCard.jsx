import { Mail, MapPin, Briefcase } from 'lucide-react'
import Avatar from './Avatar'

export default function ProfileCard({ user, onNavigate }) {
  return (
    <div
      className="animate-rise rounded-2xl border border-slate-200/70 bg-white p-5 text-center shadow-sm"
      style={{ animationDelay: '250ms' }}
    >
      <div className="flex justify-center">
        <Avatar name={user.name} size="h-20 w-20" text="text-2xl" />
      </div>
      <h2 className="mt-3 font-bold">{user.name}</h2>
      <p className="text-sm text-slate-500">{user.role}</p>
      <ul className="mt-4 space-y-2 text-left text-sm text-slate-600">
        <li className="flex items-center gap-2">
          <Mail size={16} className="text-brand" /> {user.email}
        </li>
        <li className="flex items-center gap-2">
          <Briefcase size={16} className="text-brand" /> Algoryx Internship
        </li>
        <li className="flex items-center gap-2">
          <MapPin size={16} className="text-brand" /> {user.location}
        </li>
      </ul>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          onClick={() => onNavigate('Profile')}
          className="rounded-lg bg-navy-900 py-2 text-sm font-semibold text-white transition hover:bg-navy-700"
        >
          View profile
        </button>
        <button
          onClick={() => onNavigate('Settings')}
          className="rounded-lg border border-slate-200 py-2 text-sm font-semibold hover:bg-slate-50"
        >
          Edit
        </button>
      </div>
    </div>
  )
}
