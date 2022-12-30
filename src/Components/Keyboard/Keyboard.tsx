import styles from './Keyboard.module.css'
import { KEYS } from '../../constants/constants'

type KeyboardProps = {
	gameOver?: boolean
	activeLetters: string[]
	inactiveLetters: string[]
	addGuessedLetter: (letter: string) => void
}

export default function Keyboard({
	gameOver = false,
	activeLetters,
	inactiveLetters,
	addGuessedLetter,
}: KeyboardProps) {
	return (
		<div className={styles.keyboardContainer}>
			<div className={styles.keyboardKeys}>
				{KEYS.map(key => {
					const isActive = activeLetters.includes(key)
					const isInactive = inactiveLetters.includes(key)
					return (
						<button
							onClick={() => addGuessedLetter(key)}
							className={` ${styles.keyboardBtn} 
							${isActive ? styles.active : ''} ${isInactive ? styles.inactive : ''}`}
							disabled={isActive || isInactive || gameOver}
							key={key}
						>
							{key}
						</button>
					)
				})}
			</div>
		</div>
	)
}
