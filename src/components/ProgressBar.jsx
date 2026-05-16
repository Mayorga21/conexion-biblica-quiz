export default function ProgressBar({ current, total }) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-gray-400 mb-1 font-serif">
        <span>Pregunta {current} de {total}</span>
        <span>{pct}%</span>
      </div>
      <div className="w-full bg-surface-2 rounded-full h-2 overflow-hidden">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-purple to-purple-light transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
