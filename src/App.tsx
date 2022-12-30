import { useCallback, useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import HangmanDrawing from './Components/HangmanDrawing/HangmanDrawing'
import HangmanWord from './Components/HangmanWord/HangmanWord'
import Keyboard from './Components/Keyboard/Keyboard'
import words from './wordList.json'
import './App.scss'

function App() {
	const [wordToGuess, setWordToGuess] = useState(() => {
		return words[Math.floor(Math.random() * words.length)]
	})
	const [guessedLetters, setGuessedLetters] = useState<string[]>([])

	const correctLetters = guessedLetters.filter(letter =>
		wordToGuess.includes(letter)
	)
	const inCorrectLetters = guessedLetters.filter(
		letter => !wordToGuess.includes(letter)
	)

	const hasLost = inCorrectLetters.length >= 6
	const hasWon = wordToGuess
		.split('')
		.every(letter => guessedLetters.includes(letter))

	const { width, height } = useWindowSize()

	const addGuessedLetter = useCallback(
		(letter: string) => {
			if (guessedLetters.includes(letter) || hasWon || hasLost) return

			setGuessedLetters(currentLetters => [...currentLetters, letter])
		},
		[guessedLetters, hasWon, hasLost]
	)

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			const key = e.key
			if (!key.match(/^[a-z]$/)) return

			e.preventDefault()
			addGuessedLetter(key)
		}

		document.addEventListener('keypress', handler)
		return () => {
			document.removeEventListener('keypress', handler)
		}
	}, [guessedLetters])
	console.log({wordToGuess})
	return (
		<div className='mainContainer'>
			<Confetti
				width={width}
				height={height + 300}
				run={hasWon}
			/>
			<div className='resultWrap'>
				{hasWon && 'You Won! - Refresh to try again.'}
				{hasLost && 'Nice Try - Refresh to try again.'}
			</div>
			<HangmanDrawing numberOfWrongGuesses={inCorrectLetters.length} />
			<HangmanWord
				hasWon={hasWon}
				hasLost={hasLost}
				guessedLetters={guessedLetters}
				wordToGuess={wordToGuess}
			/>
			<Keyboard
				gameOver={hasWon || hasLost}
				activeLetters={correctLetters}
				inactiveLetters={inCorrectLetters}
				addGuessedLetter={addGuessedLetter}
			/>
		</div>
	)
}

export default App
