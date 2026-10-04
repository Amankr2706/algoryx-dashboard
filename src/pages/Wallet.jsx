import { useState } from 'react'
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import { initialTransactions } from '../data/mockData'
import { useToast } from '../components/Toast'

const money = (v) => `$${Math.abs(v).toLocaleString('en-US', { minimumFractionDigits: 2 })}`

export default function Wallet() {
  const [balance, setBalance] = useState(12480.5)
  const [amount, setAmount] = useState('')
  const [err, setErr] = useState('')
  const [tx, setTx] = useState(initialTransactions)
  const toast = useToast()

  const act = (type) => {
    const v = Number(amount)
    if (!(v > 0)) return setErr('Enter an amount above 0.')
    if (type === 'out' && v > balance) return setErr('You cannot withdraw more than your balance.')
    setErr('')
    setBalance((b) => (type === 'in' ? b + v : b - v))
    setTx([
      {
        id: Date.now(),
        title: type === 'in' ? 'Funds added' : 'Withdrawal to bank',
        date: 'Just now',
        amount: type === 'in' ? v : -v,
      },
      ...tx,
    ])
    setAmount('')
    toast(type === 'in' ? 'Funds added to your wallet' : 'Withdrawal requested')
  }

  return (
    <div className="space-y-6 animate-rise">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Wallet</h1>
        <p className="mt-1 text-slate-500">Add funds, withdraw and review your transactions.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl bg-gradient-to-br from-navy-900 to-navy-700 p-6 text-white shadow-sm">
          <p className="text-sm text-slate-300">Available balance</p>
          <p className="mt-1 text-4xl font-extrabold tracking-tight">{money(balance)}</p>
          <label className="mt-6 block text-sm font-semibold">
            Amount ($)
            <input
              type="number"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="500"
              className="mt-1 w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-400 focus:border-brand"
            />
          </label>
          {err && <p className="mt-2 text-sm font-semibold text-red-300">{err}</p>}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              onClick={() => act('in')}
              className="rounded-lg bg-brand py-2.5 text-sm font-semibold hover:bg-blue-600"
            >
              Add funds
            </button>
            <button
              onClick={() => act('out')}
              className="rounded-lg border border-white/25 py-2.5 text-sm font-semibold hover:bg-white/10"
            >
              Withdraw
            </button>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm lg:col-span-2">
          <h2 className="font-bold">Transactions</h2>
          <ul className="mt-3 divide-y divide-slate-100">
            {tx.map((t) => (
              <li key={t.id} className="flex items-center gap-3 py-3">
                <span
                  className={`rounded-xl p-2.5 ${t.amount > 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-500'}`}
                >
                  {t.amount > 0 ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold">{t.title}</span>
                  <span className="text-xs text-slate-400">{t.date}</span>
                </span>
                <span
                  className={`text-sm font-bold ${t.amount > 0 ? 'text-emerald-600' : 'text-slate-700'}`}
                >
                  {t.amount > 0 ? '+' : '-'}
                  {money(t.amount)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
