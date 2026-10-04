import { createContext, useContext, useState, useCallback, useRef } from 'react'
import { CheckCircle2 } from 'lucide-react'

const ToastContext = createContext(() => {})
export const useToast = () => useContext(ToastContext)

export function ToastProvider({ children }) {
  const [msg, setMsg] = useState(null)
  const timer = useRef()
  const show = useCallback((m) => {
    setMsg(m)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setMsg(null), 2600)
  }, [])

  return (
    <ToastContext.Provider value={show}>
      {children}
      {msg && (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 animate-pop items-center gap-2 rounded-lg bg-navy-900 px-4 py-3 text-sm font-semibold text-white shadow-lg"
        >
          <CheckCircle2 size={18} className="text-emerald-400" /> {msg}
        </div>
      )}
    </ToastContext.Provider>
  )
}
