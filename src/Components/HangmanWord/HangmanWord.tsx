import './HangmanWord.scss'

type HangmanWordProps = {
	guessedLetters: string[]
	wordToGuess: string
	hasWon?: boolean
	hasLost?: boolean
}

export default function HangmanWord({
	guessedLetters,
	wordToGuess,
	hasWon = false,
	hasLost = false,
}: HangmanWordProps) {
	const getLetterColor = (letter: string): string => {
		if (hasWon) {
			return '#0BDA51	' // green
		}
		if (hasLost && !guessedLetters.includes(letter)) {
			return 'red'
		}
		return 'black'
	}

	return (
		<div className='hangmanWordContainer'>
			{wordToGuess.split('').map((letter, index) => {
				return (
					<span className='hangmanWord' key={index}>
						<span
							style={{
								visibility:
									guessedLetters.includes(letter) || hasLost ? 'visible' : 'hidden',
								color: getLetterColor(letter),
							}}
						>
							{letter}
						</span>
					</span>
				)
			})}
		</div>
	)
}
