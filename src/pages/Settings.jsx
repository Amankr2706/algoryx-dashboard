import { useState, useEffect } from 'react'
import { useToast } from '../components/Toast'

const field =
  'mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20'

function Toggle({ on, onChange, label }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? 'bg-brand' : 'bg-slate-300'}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? 'left-[22px]' : 'left-0.5'}`}
      />
    </button>
  )
}

export default function Settings({ user, onSave, onReset }) {
  const [f, setF] = useState(user)
  const [err, setErr] = useState('')
  const [prefs, setPrefs] = useState({ email: true, weekly: false, orders: true })
  const toast = useToast()
  useEffect(() => setF(user), [user])
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const save = (e) => {
    e.preventDefault()
    if (!f.name.trim() || !/^\S+@\S+\.\S+$/.test(f.email))
      return setErr('Enter your name and a valid email.')
    setErr('')
    onSave({ ...f, name: f.name.trim() })
    toast('Settings saved')
  }
  const rows = [
    ['email', 'Email notifications', 'Get an email when something important happens'],
    ['weekly', 'Weekly report', 'Receive a summary of your sales every Monday'],
    ['orders', 'Order alerts', 'Notify me when a new order comes in'],
  ]

  return (
    <div className="space-y-6 animate-rise">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Settings</h1>
        <p className="mt-1 text-slate-500">Manage your account details and preferences.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <form
          onSubmit={save}
          className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm"
        >
          <h2 className="font-bold">Profile details</h2>
          <div className="mt-4 space-y-3 text-sm font-semibold">
            <label className="block">
              Full name
              <input className={field} value={f.name} onChange={set('name')} />
            </label>
            <label className="block">
              Email
              <input className={field} value={f.email} onChange={set('email')} />
            </label>
            <label className="block">
              Role
              <input className={field} value={f.role} onChange={set('role')} />
            </label>
            <label className="block">
              Location
              <input className={field} value={f.location} onChange={set('location')} />
            </label>
          </div>
          {err && <p className="mt-3 text-sm font-semibold text-red-500">{err}</p>}
          <button
            type="submit"
            className="mt-5 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-600"
          >
            Save changes
          </button>
        </form>
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm">
            <h2 className="font-bold">Preferences</h2>
            <ul className="mt-3 divide-y divide-slate-100">
              {rows.map(([k, t, d]) => (
                <li key={k} className="flex items-center justify-between gap-4 py-3">
                  <span>
                    <span className="block text-sm font-bold">{t}</span>
                    <span className="text-xs text-slate-400">{d}</span>
                  </span>
                  <Toggle
                    on={prefs[k]}
                    label={t}
                    onChange={(v) => {
                      setPrefs({ ...prefs, [k]: v })
                      toast(`${t} ${v ? 'turned on' : 'turned off'}`)
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm">
            <h2 className="font-bold">Demo data</h2>
            <p className="mt-1 text-sm text-slate-500">
              Your changes are saved only in this browser. Reset to bring back the original details.
            </p>
            <button
              onClick={() => {
                onReset()
                toast('Details reset to default')
              }}
              className="mt-4 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50"
            >
              Reset details
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
