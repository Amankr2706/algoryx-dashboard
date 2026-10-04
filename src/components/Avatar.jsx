const initials = (n) =>
  n
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || '?'

export default function Avatar({ name, size = 'h-9 w-9', text = 'text-sm' }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-navy-900 font-bold text-white ${size} ${text}`}
    >
      {initials(name)}
    </span>
  )
}
