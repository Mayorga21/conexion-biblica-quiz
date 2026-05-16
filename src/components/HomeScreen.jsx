import { questions } from '../data/questions'

const COUNTS = [5, 10, 15, 20, 30, 53]

const DIFFICULTY_COLORS = {
  fácil: 'text-green-400 border-green-600',
  medio: 'text-yellow-400 border-yellow-600',
  difícil: 'text-red-400 border-red-600',
  Todas: 'text-gray-300 border-gray-600',
}

export default function HomeScreen({ filters, setFilters, categories, difficulties, onStart }) {
  const available = questions.filter((q) => {
    const catOk = filters.category === 'Todas' || q.category === filters.category
    const difOk = filters.difficulty === 'Todas' || q.difficulty === filters.difficulty
    return catOk && difOk
  }).length

  function select(key, value) {
    setFilters((f) => ({ ...f, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-4 py-10">
      {/* Header */}
      <div className="text-center mb-10 max-w-lg">
        <div className="text-gold text-4xl mb-3">✦</div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
          Conexión Bíblica
        </h1>
        <p className="font-serif text-gold text-base md:text-lg italic">
          Quiz de Estudio — Iglesia Adventista
        </p>
        <p className="text-gray-400 text-sm mt-3 font-serif leading-relaxed">
          Daniel completo · Profetas y Reyes caps. 39–44
        </p>
      </div>

      {/* Filters card */}
      <div className="w-full max-w-md bg-surface rounded-2xl border border-surface-2 p-6 shadow-xl space-y-5">
        {/* Category */}
        <div>
          <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-serif">
            Categoría
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => select('category', cat)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-serif transition-all
                  ${filters.category === cat
                    ? 'bg-purple border-purple text-white'
                    : 'border-surface-2 text-gray-400 hover:border-purple/60 hover:text-gray-200'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-serif">
            Dificultad
          </label>
          <div className="flex gap-2 flex-wrap">
            {difficulties.map((d) => (
              <button
                key={d}
                onClick={() => select('difficulty', d)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-serif transition-all capitalize
                  ${filters.difficulty === d
                    ? `bg-surface-2 ${DIFFICULTY_COLORS[d] || 'border-purple text-white'}`
                    : 'border-surface-2 text-gray-400 hover:border-gray-500'
                  }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <div>
          <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-serif">
            Número de preguntas
          </label>
          <div className="flex gap-2 flex-wrap">
            {COUNTS.map((n) => (
              <button
                key={n}
                onClick={() => select('count', n)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-serif transition-all
                  ${filters.count === n
                    ? 'bg-gold border-gold text-bg font-bold'
                    : 'border-surface-2 text-gray-400 hover:border-gold/60 hover:text-gray-200'
                  }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Available count */}
        <p className="text-xs text-gray-500 font-serif">
          {available} pregunta{available !== 1 ? 's' : ''} disponible{available !== 1 ? 's' : ''} con los filtros actuales
          {filters.count > available && available > 0 && (
            <span className="text-gold"> · Se usarán las {available} disponibles</span>
          )}
        </p>

        {/* Start button */}
        <button
          onClick={onStart}
          disabled={available === 0}
          className="w-full py-3 rounded-xl bg-purple hover:bg-purple-light disabled:opacity-40 disabled:cursor-not-allowed
            font-serif font-bold text-white text-base transition-all duration-200 shadow-lg shadow-purple/30 hover:shadow-purple/50"
        >
          Comenzar Quiz
        </button>
      </div>

      <p className="text-gray-600 text-xs mt-6 font-serif">
        Las opciones se barajan en cada sesión
      </p>
    </div>
  )
}
