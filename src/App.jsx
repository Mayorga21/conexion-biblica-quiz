import { useQuiz } from './hooks/useQuiz'
import HomeScreen from './components/HomeScreen'
import QuizScreen from './components/QuizScreen'
import ResultsScreen from './components/ResultsScreen'

export default function App() {
  const quiz = useQuiz()

  if (quiz.phase === 'quiz') {
    return (
      <QuizScreen
        current={quiz.current}
        currentIndex={quiz.currentIndex}
        total={quiz.total}
        selected={quiz.selected}
        answered={quiz.answered}
        score={quiz.score}
        onSelect={quiz.selectAnswer}
        onNext={quiz.nextQuestion}
        onReset={quiz.resetQuiz}
      />
    )
  }

  if (quiz.phase === 'results') {
    return (
      <ResultsScreen
        score={quiz.score}
        total={quiz.total}
        percentage={quiz.percentage}
        history={quiz.history}
        onRetry={quiz.startQuiz}
        onHome={quiz.resetQuiz}
      />
    )
  }

  return (
    <HomeScreen
      filters={quiz.filters}
      setFilters={quiz.setFilters}
      categories={quiz.categories}
      difficulties={quiz.difficulties}
      onStart={quiz.startQuiz}
    />
  )
}
