import { useState } from 'react'
import { revenueRanges } from '../data/mockData'

const W = 640,
  H = 240,
  P = { l: 48, r: 14, t: 24, b: 30 }
const money = (v) => `$${v.toLocaleString('en-US')}`

export default function RevenueChart() {
  const [range, setRange] = useState('This year')
  const [hover, setHover] = useState(null)
  const { labels, values, change } = revenueRanges[range]
  const max = Math.ceil(Math.max(...values) / 1000) * 1000
  const x = (i) => P.l + (i * (W - P.l - P.r)) / (values.length - 1)
  const y = (v) => P.t + (1 - v / max) * (H - P.t - P.b)
  const line = 'M' + values.map((v, i) => `${x(i)},${y(v)}`).join(' L')
  const area = `${line} L${x(values.length - 1)},${H - P.b} L${x(0)},${H - P.b} Z`

  return (
    <div
      className="animate-rise rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm"
      style={{ animationDelay: '200ms' }}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 font-bold">
            Revenue overview{' '}
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700">
              {change}
            </span>
          </h2>
          <p className="text-sm text-slate-400">Track your revenue performance over time</p>
        </div>
        <select
          value={range}
          onChange={(e) => {
            setRange(e.target.value)
            setHover(null)
          }}
          aria-label="Revenue range"
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
        >
          {Object.keys(revenueRanges).map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-4 h-auto w-full"
        role="img"
        aria-label="Revenue line chart"
      >
        <defs>
          <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2F6BFF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#2F6BFF" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, max / 2, max].map((t) => (
          <g key={t}>
            <line
              x1={P.l}
              x2={W - P.r}
              y1={y(t)}
              y2={y(t)}
              stroke="#e2e8f0"
              strokeDasharray="4 4"
            />
            <text x={P.l - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#94a3b8">
              ${t / 1000}k
            </text>
          </g>
        ))}
        <path d={area} fill="url(#fill)" />
        <path
          d={line}
          fill="none"
          stroke="#2F6BFF"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {values.map((v, i) => (
          <g
            key={i}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            onClick={() => setHover(i)}
          >
            <circle cx={x(i)} cy={y(v)} r="14" fill="transparent" />
            <circle
              cx={x(i)}
              cy={y(v)}
              r={hover === i ? 5 : 3.5}
              fill="#fff"
              stroke="#2F6BFF"
              strokeWidth="2"
            />
            <text x={x(i)} y={H - 8} textAnchor="middle" fontSize="11" fill="#94a3b8">
              {labels[i]}
            </text>
            {hover === i && (
              <text
                x={x(i)}
                y={y(v) - 12}
                textAnchor={i === values.length - 1 ? 'end' : i === 0 ? 'start' : 'middle'}
                fontSize="12"
                fontWeight="700"
                fill="#0A1F44"
              >
                {money(v)}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  )
}
