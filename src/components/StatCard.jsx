import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

export default function StatCard({ title, value, change, up, icon: Icon, delay = 0 }) {
  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className="animate-rise rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-500">{title}</p>
        <span className="rounded-xl bg-brand/10 p-2.5 text-brand">
          <Icon size={20} />
        </span>
      </div>
      <p className="mt-3 text-3xl font-extrabold tracking-tight">{value}</p>
      <p className="mt-2 flex items-center gap-1 text-xs text-slate-400">
        <span className={`flex items-center font-bold ${up ? 'text-emerald-600' : 'text-red-500'}`}>
          {up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {change}
        </span>{' '}
        vs last month
      </p>
    </div>
  )
}
