import { useState } from 'react'
import { Filter, Check } from 'lucide-react'

const badge = {
  Paid: 'bg-emerald-100 text-emerald-700',
  Pending: 'bg-amber-100 text-amber-700',
  Cancelled: 'bg-red-100 text-red-600',
}
const tints = [
  'bg-violet-100 text-violet-700',
  'bg-blue-100 text-blue-700',
  'bg-amber-100 text-amber-700',
  'bg-emerald-100 text-emerald-700',
  'bg-pink-100 text-pink-700',
]
const initials = (n) =>
  n
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
const money = (v) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2 })}`

export default function OrdersTable({ orders }) {
  const [status, setStatus] = useState('All')
  const [menu, setMenu] = useState(false)
  const [all, setAll] = useState(false)
  const filtered = status === 'All' ? orders : orders.filter((o) => o.status === status)
  const shown = all ? filtered : filtered.slice(0, 5)

  return (
    <div
      className="animate-rise rounded-2xl border border-slate-200/70 bg-white shadow-sm"
      style={{ animationDelay: '250ms' }}
    >
      <div className="flex items-start justify-between gap-3 px-5 py-4">
        <div>
          <h2 className="font-bold">Recent orders</h2>
          <p className="text-sm text-slate-400">A summary of your latest transactions</p>
        </div>
        <div className="relative">
          <button
            onClick={() => setMenu((m) => !m)}
            className="flex items-center gap-2 rounded-lg bg-navy-900 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-navy-700"
          >
            <Filter size={16} /> {status === 'All' ? 'Filter' : status}
          </button>
          {menu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenu(false)} />
              <div className="absolute right-0 z-20 mt-2 w-40 animate-pop rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">
                {['All', 'Paid', 'Pending', 'Cancelled'].map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setStatus(s)
                      setMenu(false)
                    }}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    {s} {status === s && <Check size={14} className="text-brand" />}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-slate-50 text-xs text-slate-500">
            <tr>
              {['Customer', 'Date', 'Amount', 'Status'].map((h) => (
                <th key={h} className="px-5 py-3 font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shown.map((o) => (
              <tr
                key={o.id}
                className="border-t border-slate-100 transition-colors hover:bg-slate-50"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${tints[o.customer.length % tints.length]}`}
                    >
                      {initials(o.customer)}
                    </span>
                    <span>
                      <span className="block font-bold">{o.customer}</span>
                      <span className="block text-xs text-slate-400">{o.email}</span>
                    </span>
                  </div>
                </td>
                <td className="px-5 py-3 text-slate-500">{o.date}</td>
                <td className="px-5 py-3 font-bold">{money(o.amount)}</td>
                <td className="px-5 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${badge[o.status]}`}
                  >
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="px-5 py-10 text-center text-sm text-slate-500">
            No orders match. Clear the search or change the filter.
          </p>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3 text-sm">
        <span className="text-slate-400">
          Showing {shown.length} of {filtered.length} orders
        </span>
        {filtered.length > 5 && (
          <button
            onClick={() => setAll((a) => !a)}
            className="font-semibold text-brand hover:underline"
          >
            {all ? 'Show fewer' : 'View all orders'}
          </button>
        )}
      </div>
    </div>
  )
}
