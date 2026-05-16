export default function ExplanationPanel({ explanation, isCorrect }) {
  return (
    <div
      className={`mt-4 p-4 rounded-xl border font-serif text-sm leading-relaxed transition-all duration-300
        ${isCorrect
          ? 'border-green-500/40 bg-green-500/10 text-green-200'
          : 'border-gold/40 bg-gold/10 text-yellow-100'
        }`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-base">{isCorrect ? '✓' : '✗'}</span>
        <span className="font-bold text-xs uppercase tracking-widest text-gray-400">
          {isCorrect ? 'Correcto' : 'Incorrecto'}
        </span>
      </div>
      <p>{explanation}</p>
    </div>
  )
}
