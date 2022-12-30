import './HangmanDrawing.scss'

const HEAD = <div className='hangmanHead' />
const BODY = <div className='hangmanBody' />
const RIGHT_ARM = <div className='rightArm' />
const LEFT_ARM = <div className='leftArm' />
const RIGHT_LEG = <div className='rightLeg' />
const LEFT_LEG = <div className='leftLeg' />

const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG]

type HangmanDrawingProps = {
	numberOfWrongGuesses: number
}

export default function HangmanDrawing({
	numberOfWrongGuesses,
}: HangmanDrawingProps) {
	return (
		<div className='hangmanDrawingContainer'>
			{/* UI of stick Hangman displayed based on the wrong guesses */}
			{BODY_PARTS.slice(0, numberOfWrongGuesses)}
			{/* Default Pole UI */}
			<div className='dropBar' />
			<div className='topBar' />
			<div className='pole' />
			<div className='bottomBar' />
		</div>
	)
}
