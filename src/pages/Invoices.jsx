import { useState } from 'react'
import { Download, CheckCircle2 } from 'lucide-react'
import { initialInvoices } from '../data/mockData'
import { useToast } from '../components/Toast'

const tone = {
  Paid: 'bg-emerald-100 text-emerald-700',
  Pending: 'bg-amber-100 text-amber-700',
  Overdue: 'bg-red-100 text-red-600',
}
const money = (v) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2 })}`

export default function Invoices() {
  const [list, setList] = useState(initialInvoices)
  const [tab, setTab] = useState('All')
  const toast = useToast()
  const sum = (s) => list.filter((i) => !s || i.status === s).reduce((a, i) => a + i.amount, 0)
  const shown = tab === 'All' ? list : list.filter((i) => i.status === tab)
  const cards = [
    ['Total billed', sum()],
    ['Paid', sum('Paid')],
    ['Outstanding', sum('Pending') + sum('Overdue')],
  ]

  const pay = (id) => {
    setList(list.map((i) => (i.id === id ? { ...i, status: 'Paid' } : i)))
    toast(`${id} marked as paid`)
  }
  const download = (i) => {
    const a = document.createElement('a')
    a.href = URL.createObjectURL(
      new Blob(
        [
          `INVOICE ${i.id}\nCustomer: ${i.customer}\nIssued: ${i.issued}\nDue: ${i.due}\nAmount: ${money(i.amount)}\nStatus: ${i.status}\n`,
        ],
        { type: 'text/plain' }
      )
    )
    a.download = `${i.id}.txt`
    a.click()
    URL.revokeObjectURL(a.href)
    toast(`${i.id} downloaded`)
  }

  return (
    <div className="space-y-6 animate-rise">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Invoices</h1>
        <p className="mt-1 text-slate-500">Track what you have billed and what is still due.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map(([t, v]) => (
          <div key={t} className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">{t}</p>
            <p className="mt-2 text-2xl font-extrabold">{money(v)}</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-slate-200/70 bg-white shadow-sm">
        <div className="flex flex-wrap gap-2 p-4">
          {['All', 'Paid', 'Pending', 'Overdue'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-lg px-3.5 py-1.5 text-sm font-semibold ${tab === t ? 'bg-navy-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-slate-50 text-xs text-slate-500">
              <tr>
                {['Invoice', 'Customer', 'Due date', 'Amount', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-5 py-3 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shown.map((i) => (
                <tr key={i.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-5 py-3 font-bold">{i.id}</td>
                  <td className="px-5 py-3">{i.customer}</td>
                  <td className="px-5 py-3 text-slate-500">{i.due}</td>
                  <td className="px-5 py-3 font-bold">{money(i.amount)}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${tone[i.status]}`}
                    >
                      {i.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1">
                      <button
                        onClick={() => download(i)}
                        aria-label={`Download ${i.id}`}
                        title="Download"
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                      >
                        <Download size={16} />
                      </button>
                      {i.status !== 'Paid' && (
                        <button
                          onClick={() => pay(i.id)}
                          title="Mark as paid"
                          className="flex items-center gap-1 rounded-lg px-2.5 py-2 text-xs font-semibold text-brand hover:bg-brand/10"
                        >
                          <CheckCircle2 size={14} /> Mark paid
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
