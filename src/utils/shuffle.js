/** Fisher-Yates shuffle — returns a new array, never mutates the original. */
export function shuffle(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/**
 * Shuffles both the question list and, for each question, its options array.
 * Returns new question objects with the `answer` index updated to match the
 * new position of the correct option after shuffling.
 */
export function shuffleQuestionsWithOptions(questions) {
  return shuffle(questions).map((q) => {
    const correctOption = q.options[q.answer]
    const shuffledOptions = shuffle(q.options)
    return {
      ...q,
      options: shuffledOptions,
      answer: shuffledOptions.indexOf(correctOption),
    }
  })
}
