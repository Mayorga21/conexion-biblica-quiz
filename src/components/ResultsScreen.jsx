import { useState } from 'react'

function CircleProgress({ percentage }) {
  const r = 44
  const circumference = 2 * Math.PI * r
  const offset = circumference - (percentage / 100) * circumference
  const color =
    percentage >= 80 ? '#22c55e' : percentage >= 50 ? '#b8902a' : '#ef4444'

  return (
    <svg width="120" height="120" className="rotate-[-90deg]">
      <circle cx="60" cy="60" r={r} fill="none" stroke="#1f2937" strokeWidth="10" />
      <circle
        cx="60"
        cy="60"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 0.8s ease' }}
      />
      <text
        x="60"
        y="60"
        textAnchor="middle"
        dominantBaseline="central"
        fill={color}
        fontSize="18"
        fontWeight="bold"
        fontFamily="Georgia, serif"
        style={{ transform: 'rotate(90deg)', transformOrigin: '60px 60px' }}
      >
        {percentage}%
      </text>
    </svg>
  )
}

function ReviewItem({ item, index }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className={`rounded-xl border p-3 text-sm font-serif cursor-pointer transition-all
        ${item.isCorrect ? 'border-green-800 bg-green-900/20' : 'border-red-800 bg-red-900/20'}`}
      onClick={() => setOpen((o) => !o)}
    >
      <div className="flex items-start gap-2">
        <span className={item.isCorrect ? 'text-green-400' : 'text-red-400'}>
          {item.isCorrect ? '✓' : '✗'}
        </span>
        <p className="text-gray-200 flex-1 leading-snug">{item.question.question}</p>
        <span className="text-gray-500 text-xs shrink-0">{open ? '▲' : '▼'}</span>
      </div>
      {open && (
        <div className="mt-3 pl-5 space-y-1">
          {!item.isCorrect && (
            <p className="text-red-300 text-xs">
              Tu respuesta: {item.question.options[item.selected]}
            </p>
          )}
          <p className="text-green-300 text-xs">
            Correcta: {item.question.options[item.correct]}
          </p>
          <p className="text-gray-400 text-xs mt-1 leading-relaxed">
            {item.question.explanation}
          </p>
        </div>
      )}
    </div>
  )
}

export default function ResultsScreen({ score, total, percentage, history, onRetry, onHome }) {
  const [showAll, setShowAll] = useState(false)
  const wrong = history.filter((h) => !h.isCorrect)

  const message =
    percentage >= 90 ? '¡Excelente! Dominas el material.'
    : percentage >= 70 ? '¡Bien hecho! Repasa los errores.'
    : percentage >= 50 ? 'Vas por buen camino. Sigue estudiando.'
    : 'Necesitas repasar más el material.'

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-gold text-3xl mb-3">✦</div>
          <h2 className="font-serif text-2xl md:text-3xl text-white font-bold mb-1">
            Resultados
          </h2>
          <p className="font-serif text-gray-400 text-sm italic">{message}</p>
        </div>

        {/* Circle + stats */}
        <div className="flex flex-col items-center gap-4 bg-surface rounded-2xl border border-surface-2 p-6 mb-6 shadow-lg">
          <CircleProgress percentage={percentage} />
          <div className="flex gap-8 text-center">
            <div>
              <p className="text-2xl font-bold text-green-400 font-serif">{score}</p>
              <p className="text-xs text-gray-400 font-serif">Correctas</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-400 font-serif">{total - score}</p>
              <p className="text-xs text-gray-400 font-serif">Incorrectas</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-200 font-serif">{total}</p>
              <p className="text-xs text-gray-400 font-serif">Total</p>
            </div>
          </div>
        </div>

        {/* Error review */}
        {wrong.length > 0 && (
          <div className="mb-6">
            <button
              onClick={() => setShowAll((s) => !s)}
              className="w-full flex items-center justify-between bg-surface border border-surface-2 rounded-xl px-4 py-3 font-serif text-sm text-gray-300 hover:border-purple/50 transition-all"
            >
              <span>
                Revisar {wrong.length} error{wrong.length !== 1 ? 'es' : ''}
              </span>
              <span>{showAll ? '▲' : '▼'}</span>
            </button>
            {showAll && (
              <div className="mt-3 space-y-2">
                {wrong.map((item, i) => (
                  <ReviewItem key={i} item={item} index={i} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onHome}
            className="flex-1 py-3 rounded-xl border border-surface-2 font-serif font-bold text-gray-300
              hover:border-purple/50 hover:text-white transition-all"
          >
            Inicio
          </button>
          <button
            onClick={onRetry}
            className="flex-1 py-3 rounded-xl bg-purple hover:bg-purple-light font-serif font-bold
              text-white transition-all shadow-lg shadow-purple/30"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    </div>
  )
}
