const LETTERS = ['A', 'B', 'C', 'D']

export default function OptionButton({ index, text, state, onClick }) {
  // state: 'idle' | 'correct' | 'wrong' | 'missed'
  const base =
    'w-full flex items-start gap-3 px-4 py-3 rounded-xl border text-left font-serif text-sm md:text-base transition-all duration-200 focus:outline-none'

  const styles = {
    idle: 'border-surface-2 bg-surface hover:border-purple hover:bg-purple/10 cursor-pointer text-gray-200',
    correct: 'border-green-500 bg-green-500/20 text-green-300 cursor-default',
    wrong: 'border-red-500 bg-red-500/20 text-red-300 cursor-default',
    missed: 'border-green-500/50 bg-green-500/10 text-green-400/70 cursor-default',
  }

  return (
    <button
      className={`${base} ${styles[state]}`}
      onClick={state === 'idle' ? onClick : undefined}
      disabled={state !== 'idle'}
    >
      <span
        className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border
          ${state === 'correct' ? 'border-green-400 text-green-400' : ''}
          ${state === 'wrong' ? 'border-red-400 text-red-400' : ''}
          ${state === 'missed' ? 'border-green-500/60 text-green-400/70' : ''}
          ${state === 'idle' ? 'border-gray-500 text-gray-400' : ''}
        `}
      >
        {LETTERS[index]}
      </span>
      <span className="leading-relaxed">{text}</span>
    </button>
  )
}
