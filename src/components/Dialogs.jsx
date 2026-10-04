import { createContext, useContext, useState, useEffect } from 'react'
import { X, Check } from 'lucide-react'
import { useToast } from './Toast'

const Ctx = createContext({ open: () => {}, plan: 'Free' })
export const useDialog = () => useContext(Ctx)

const plans = [
  { name: 'Free', price: '$0', perks: ['1 workspace', 'Basic reports'] },
  { name: 'Pro', price: '$29', perks: ['Unlimited exports', 'Advanced analytics'] },
  { name: 'Team', price: '$99', perks: ['Everything in Pro', 'Up to 25 seats'] },
]
const faqs = [
  ['How do I add an order?', 'Click "Add new" on the Overview page and fill in the form.'],
  [
    'How do I export my data?',
    'Use the Export button on Overview to download your orders as a CSV file.',
  ],
  [
    'Where do I change my name?',
    'Open Settings from the profile menu, edit your details and save.',
  ],
]
const titles = { help: 'Help center', plans: 'Choose a plan', privacy: 'Privacy', terms: 'Terms' }

export function DialogProvider({ children }) {
  const [type, setType] = useState(null)
  const [plan, setPlan] = useState('Free')
  const toast = useToast()
  const close = () => setType(null)

  useEffect(() => {
    if (!type) return
    const h = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [type])

  return (
    <Ctx.Provider value={{ open: setType, plan }}>
      {children}
      {type && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
          onClick={close}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-lg animate-pop overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold">{titles[type]}</h2>
              <button
                onClick={close}
                aria-label="Close"
                className="rounded-lg p-1.5 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>
            {type === 'help' && (
              <div className="mt-4 space-y-2">
                {faqs.map(([q, a]) => (
                  <details key={q} className="rounded-lg border border-slate-200 px-4 py-3 text-sm">
                    <summary className="cursor-pointer font-semibold">{q}</summary>
                    <p className="mt-2 text-slate-500">{a}</p>
                  </details>
                ))}
                <a
                  href="mailto:hr@algoryx.in?subject=Dashboard%20support"
                  className="inline-block pt-2 text-sm font-semibold text-brand hover:underline"
                >
                  Contact support
                </a>
              </div>
            )}
            {type === 'plans' && (
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {plans.map((p) => (
                  <div
                    key={p.name}
                    className={`rounded-xl border p-4 ${plan === p.name ? 'border-brand bg-brand/5' : 'border-slate-200'}`}
                  >
                    <p className="font-bold">{p.name}</p>
                    <p className="text-2xl font-extrabold">
                      {p.price}
                      <span className="text-xs font-medium text-slate-400">/mo</span>
                    </p>
                    <ul className="mt-3 space-y-1.5 text-xs text-slate-500">
                      {p.perks.map((k) => (
                        <li key={k} className="flex gap-1.5">
                          <Check size={14} className="text-emerald-500" />
                          {k}
                        </li>
                      ))}
                    </ul>
                    <button
                      disabled={plan === p.name}
                      onClick={() => {
                        setPlan(p.name)
                        toast(`You are now on the ${p.name} plan (demo)`)
                        close()
                      }}
                      className="mt-4 w-full rounded-lg bg-navy-900 py-2 text-xs font-semibold text-white disabled:bg-slate-200 disabled:text-slate-500"
                    >
                      {plan === p.name ? 'Current plan' : 'Choose plan'}
                    </button>
                  </div>
                ))}
              </div>
            )}
            {type === 'privacy' && (
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                This is a demo project. No personal data is collected or sent anywhere. Any change
                you make, such as your name in Settings, is stored only in your own browser.
              </p>
            )}
            {type === 'terms' && (
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                This dashboard was built for the Algoryx Frontend Internship. All orders, invoices
                and wallet figures are sample data for demonstration purposes only.
              </p>
            )}
          </div>
        </div>
      )}
    </Ctx.Provider>
  )
}
