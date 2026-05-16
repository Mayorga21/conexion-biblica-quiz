import ProgressBar from './ProgressBar'
import QuestionCard from './QuestionCard'

const DIFFICULTY_BADGE = {
  fácil: 'bg-green-900/50 text-green-400 border-green-700',
  medio: 'bg-yellow-900/50 text-yellow-400 border-yellow-700',
  difícil: 'bg-red-900/50 text-red-400 border-red-700',
}

export default function QuizScreen({
  current,
  currentIndex,
  total,
  selected,
  answered,
  score,
  onSelect,
  onNext,
  onReset,
}) {
  if (!current) return null

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-xl">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={onReset}
            className="text-gray-500 hover:text-gray-300 text-sm font-serif transition-colors"
          >
            ← Inicio
          </button>
          <span className="font-serif text-sm text-gold font-bold">
            {score} / {currentIndex + (answered ? 1 : 0)} correctas
          </span>
        </div>

        <ProgressBar current={currentIndex + 1} total={total} />

        {/* Badges */}
        <div className="flex gap-2 mt-4 mb-4">
          <span className="font-serif text-xs px-2 py-1 rounded-lg border border-purple/40 bg-purple/10 text-purple-light">
            {current.category}
          </span>
          <span
            className={`font-serif text-xs px-2 py-1 rounded-lg border capitalize ${DIFFICULTY_BADGE[current.difficulty]}`}
          >
            {current.difficulty}
          </span>
        </div>

        <QuestionCard
          question={current}
          selected={selected}
          answered={answered}
          onSelect={onSelect}
        />

        {/* Next button */}
        {answered && (
          <button
            onClick={onNext}
            className="mt-5 w-full py-3 rounded-xl bg-purple hover:bg-purple-light
              font-serif font-bold text-white text-base transition-all duration-200
              shadow-lg shadow-purple/30"
          >
            {currentIndex + 1 >= total ? 'Ver Resultados' : 'Siguiente Pregunta →'}
          </button>
        )}
      </div>
    </div>
  )
}
