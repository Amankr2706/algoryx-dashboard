import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const input =
  'mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20'

export default function AddOrderModal({ onClose, onAdd }) {
  const [f, setF] = useState({ customer: '', email: '', amount: '', status: 'Paid' })
  const [err, setErr] = useState('')
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  useEffect(() => {
    const h = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  const submit = (e) => {
    e.preventDefault()
    if (!f.customer.trim() || !/^\S+@\S+\.\S+$/.test(f.email) || !(Number(f.amount) > 0)) {
      setErr('Enter a name, a valid email and an amount above 0.')
      return
    }
    onAdd({ ...f, customer: f.customer.trim(), amount: Number(f.amount) })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      onClick={onClose}
    >
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md animate-pop rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold">Add new order</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>
        <div className="mt-4 space-y-3 text-sm font-semibold">
          <label className="block">
            Customer name
            <input
              className={input}
              value={f.customer}
              onChange={set('customer')}
              placeholder="e.g. Emma Wilson"
              autoFocus
            />
          </label>
          <label className="block">
            Email
            <input
              className={input}
              value={f.email}
              onChange={set('email')}
              placeholder="emma@company.com"
            />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              Amount ($)
              <input
                type="number"
                min="0"
                className={input}
                value={f.amount}
                onChange={set('amount')}
                placeholder="500"
              />
            </label>
            <label className="block">
              Status
              <select className={input} value={f.status} onChange={set('status')}>
                <option>Paid</option>
                <option>Pending</option>
                <option>Cancelled</option>
              </select>
            </label>
          </div>
        </div>
        {err && <p className="mt-3 text-sm font-semibold text-red-500">{err}</p>}
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
          >
            Add order
          </button>
        </div>
      </form>
    </div>
  )
}
