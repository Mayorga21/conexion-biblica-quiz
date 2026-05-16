import { useState, useCallback } from 'react'
import { questions as allQuestions } from '../data/questions'
import { shuffleQuestionsWithOptions } from '../utils/shuffle'

const DEFAULT_FILTERS = { category: 'Todas', difficulty: 'Todas', count: 10 }

function applyFilters(questions, { category, difficulty, count }) {
  let filtered = questions
  if (category !== 'Todas') filtered = filtered.filter((q) => q.category === category)
  if (difficulty !== 'Todas') filtered = filtered.filter((q) => q.difficulty === difficulty)
  const prepared = shuffleQuestionsWithOptions(filtered)
  return prepared.slice(0, Math.min(count, prepared.length))
}

export function useQuiz() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [history, setHistory] = useState([])
  const [phase, setPhase] = useState('home') // 'home' | 'quiz' | 'results'

  const categories = ['Todas', ...new Set(allQuestions.map((q) => q.category))]
  const difficulties = ['Todas', 'fácil', 'medio', 'difícil']

  const startQuiz = useCallback(() => {
    const prepared = applyFilters(allQuestions, filters)
    if (prepared.length === 0) return
    setQuestions(prepared)
    setCurrentIndex(0)
    setSelected(null)
    setAnswered(false)
    setScore(0)
    setHistory([])
    setPhase('quiz')
  }, [filters])

  const selectAnswer = useCallback(
    (optionIndex) => {
      if (answered) return
      const current = questions[currentIndex]
      const isCorrect = optionIndex === current.answer
      setSelected(optionIndex)
      setAnswered(true)
      if (isCorrect) setScore((s) => s + 1)
      setHistory((h) => [
        ...h,
        {
          question: current,
          selected: optionIndex,
          correct: current.answer,
          isCorrect,
        },
      ])
    },
    [answered, questions, currentIndex],
  )

  const nextQuestion = useCallback(() => {
    if (currentIndex + 1 >= questions.length) {
      setPhase('results')
    } else {
      setCurrentIndex((i) => i + 1)
      setSelected(null)
      setAnswered(false)
    }
  }, [currentIndex, questions.length])

  const resetQuiz = useCallback(() => {
    setPhase('home')
    setQuestions([])
    setCurrentIndex(0)
    setSelected(null)
    setAnswered(false)
    setScore(0)
    setHistory([])
  }, [])

  const current = questions[currentIndex] ?? null
  const total = questions.length
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0

  return {
    // State
    phase,
    filters,
    questions,
    current,
    currentIndex,
    selected,
    answered,
    score,
    history,
    total,
    percentage,
    // Derived data for filters
    categories,
    difficulties,
    // Actions
    setFilters,
    startQuiz,
    selectAnswer,
    nextQuestion,
    resetQuiz,
  }
}
