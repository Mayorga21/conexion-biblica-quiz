import OptionButton from './OptionButton'
import ExplanationPanel from './ExplanationPanel'

function getOptionState(index, selected, correctAnswer, answered) {
  if (!answered) return 'idle'
  if (index === correctAnswer) return 'correct'
  if (index === selected) return 'wrong'
  return 'missed'
}

export default function QuestionCard({ question, selected, answered, onSelect }) {
  return (
    <div className="bg-surface rounded-2xl border border-surface-2 p-5 md:p-7 shadow-lg">
      <p className="font-serif text-base md:text-lg text-gray-100 leading-relaxed mb-5">
        {question.question}
      </p>

      <div className="flex flex-col gap-3">
        {question.options.map((option, i) => (
          <OptionButton
            key={i}
            index={i}
            text={option}
            state={getOptionState(i, selected, question.answer, answered)}
            onClick={() => onSelect(i)}
          />
        ))}
      </div>

      {answered && (
        <ExplanationPanel
          explanation={question.explanation}
          isCorrect={selected === question.answer}
        />
      )}
    </div>
  )
}
