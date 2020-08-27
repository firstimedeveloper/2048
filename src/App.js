import React, {useState, useEffect, useRef} from 'react';
import {useSwipeable} from 'react-swipeable'
// import {useSpring, animated} from 'react-spring'

const Button = (props) => {
	const handleClick = () => {
		//TODO this will be the swipe actions in the future.
			if (props.wait) {
				return
			}
			props.move(props.name)
	}
	let color = "blue-400"
	if (props.name === "reset") {
		color = "red-600"
	}
	
	return (
		<button className={`py-2 px-4 bg-${color} text-white m-1`} onClick={props.handleClick? props.handleClick : handleClick}>
			{props.name}
		</button>
	)
}

const GameOverPrompt = (props) => {
	return (
		<div className="flex justify-center w-64 flex-wrap opacity-75 bg-gray-600 border-gray-600 rounded-lg  fixed">
			<div className="text-center text-6xl text-white">
				{props.name}
			</div>
			<div className="text-base">
				<Button name="reset" handleClick={props.handleClick} />
				{props.name === "You won!" && <Button name="continue" handleClick={props.continueGame} />}
			</div>
		</div>
	)
}

const Box = (props) => {
	// const animate = useSpring({
	// 	// config: {duration: 500},
	// 	to: async (next) => {
	// 		await next({opacity: 1})
	// 	},
	// 	// opacity: 1,
	// 	from: { opacity: 0 },
	// })
	
	// return <animated.div className="flex justify-center items-center w-24 h-24 bg-gray-400 border-2" style={animate}>{props.value}</animated.div>
	var style
	switch (props.value) {
		case 2:
			style = "bg-orange-300" 
			break;
		case 4:
			style = "bg-orange-400"	
			break;
		case 8:
			style = "bg-orange-500"
			break;	
		case 16:
			style = "bg-red-500"
			break;
		case 32:
			style = "bg-red-600"
			break;
		case 64:
			style = "bg-red-700"
			break;
		case 128:
			style = "bg-purple-700 sm:text-xl lg:text-4xl"
			break;
		case 256:
			style = "bg-purple-800 sm:text-xl lg:text-4xl"
			break;
		case 512:
			style = "bg-yellow-400 sm:text-xl lg:text-4xl"
			break;
		case 1024:
			style = "bg-yellow-500 sm:text-xl lg:text-4xl tracking-tight"
			break;
		case 2048:
			style = "bg-yellow-600 sm:text-xl lg:text-4xl tracking-tight"
			break;	
		default:
			style = "bg-grey-100"
			break;
	}

	return (
		
		<div className={`flex justify-center items-center w-20 h-20 lg:w-24 lg:h-24 ${style} text-white sm:text-2xl lg:text-6xl font-semibold border-solid border border-gray-300`}>{props.value}</div>
	)
}

const Board = (props) => {
	return (	
		<div className="grid grid-cols-4 border-8 border-gray-700 bg-gray-200">
			{props.board.map((v,i) => {
					return <Box key={i} value={v}/>
			})}
		</div>
	)
}


const App = () => {
	const [board, setBoard] = useState(() => generateInitialBoard())
	const [direction, setDirection] = useState("")
	const [gameOver, setGameOver] = useState(false)
	const [wait, setWait] = useState(false)
	const [gameWon, setGameWon] = useState(false)

	const focusRef = useRef(null)

	const gameWonRef = useRef(gameWon)
	const slide = dir => {
		if (!wait) {
			setDirection(dir)
		}		
	  };
	const handlers = useSwipeable({
		onSwipedLeft: () => slide("left"),
		onSwipedRight: () => slide("right"),
		onSwipedUp: () => slide("up"),
		onSwipedDown: () => slide("down"),
		preventDefaultTouchmoveEvent: true,
		trackMouse: false
	})

	// render when mounted
	// this will focus the board so that users can play the game right away 
	// using keyboard input without focusing manually
	useEffect(() => {
		focusRef.current.focus()
	}, [])

	useEffect(() => {
		if (!wait && direction !== "" && !gameOver) {
			const newBoard = renderBoard(board, direction)
			if (JSON.stringify(board) !== JSON.stringify(newBoard)) {
				setBoard(newBoard)
				setWait(true)
			}
			setDirection("")
		}
	}, [direction, board, wait, gameOver])

	useEffect(() => {
		if (wait && !gameOver && !gameWonRef.current) {
			let idx = 0
			do {
				idx = Math.floor(Math.random() * 16)
			} while (board[idx] != null)
			let num = generateRandomNum()
			const newBoard = [...board]
			newBoard[idx] = num
			setWait(false)
			setBoard(newBoard)
		}
		if (!wait && !gameOver && !gameWonRef.current)
			setWait(false)
	}, [board, wait, gameOver]);	

	useEffect(() => {
		if (!gameWon) {
			if (calculateGameWon(board)) {
				setWait(true)
				setGameWon(true)
				gameWonRef.current = true
			}
		}
		if (calculateGameOver(board)) {
			setGameOver(true)
		}
	}, [board, gameWon])

	// resets board
	const resetGame = () => {
		setBoard(() => generateInitialBoard())
		setGameWon(false)
		gameWonRef.current = false
		setGameOver(false)
		setWait(false)
	}

	const continueGame = () => {
		gameWonRef.current = false
		setWait(false)
	}

	const handleKeyDown = (e) => {
		if (wait) 
			return
		switch (e.key) {
			case "ArrowDown":
				setDirection("down")
				break;
			case "ArrowUp":
				setDirection("up")
				break;
			case "ArrowLeft":
				setDirection("left")
				break;
			case "ArrowRight":
				setDirection("right")
				break;
			default:
				break;
		}
		
	}

	return (
		<div tabIndex={0} ref={focusRef} onKeyDown={handleKeyDown} className="flex flex-col h-screen justify-evenly items-center border-0 focus:outline-none noselect">
			<>
			{gameOver && <GameOverPrompt name={"Game Over"} handleClick={resetGame}/>}
			{gameWonRef.current && <GameOverPrompt name={"You won!"} handleClick={resetGame} continueGame={continueGame}/>}
			<div {...handlers}>
				{<Board board={board}/>}
			</div>
			<div className="flex flex-wrap justify-center items-center">
				<Button name="reset" handleClick={resetGame} />
			</div>
			</>
		</div>
	);
}

const generateInitialBoard = () => {
	let num = Math.floor(Math.random() * 16)
	let secondNum = num
	while (num === secondNum) {
		secondNum = Math.floor(Math.random() * 16)
	}

	let newBoard = Array(16).fill(null)
	newBoard[num] = 2
	newBoard[secondNum] = 2
	return newBoard
}

const generateRandomNum = () => {
	const numIsTwo = Math.random() >= 0.5
	return numIsTwo ? 2 : 4
}

const calculateGameWon = (board) => {
	return board.some((v) => v === 2048)
}

const calculateGameOver = (board) => {
	let gameOver = false

	const lastRound = board.every(v => v != null)

	const moves = ["left", "right", "up", "down"]

	let newBoard = board
	if (lastRound) {
		gameOver = moves.every(move => {
			newBoard = renderBoard(board, move)
			// game is over so return true
			return (JSON.stringify(board) === JSON.stringify(newBoard))
		})
	} 
	return gameOver
}

const renderBoard = (board, move) => {
	const newBoard = [...board]
	for(let i=0;i<4;i++) {
		let row = []
		for(let j=0;j<4;j++) {
			if (move === "left" || move === "right")
				row.push(board[(i*4)+j])
			if (move === "up" || move === "down")
				row.push(board[(j*4)+i])
		}
		if (row != null && row.length > 0) {
			addRow(row, move)
			moveRow(row, move)
		
			for(let j=0;j<4;j++) {
				if (move === "left" || move === "right")
					newBoard[(i*4)+j] = row[j]
				if (move === "up" || move === "down")
					newBoard[(j*4)+i] = row[j]
			}
		}	
	}
	return newBoard
}

const addRow = (row, move) => {
	let current = 0
	let currentIdx = 0
	if (move === "right" || move === "down") 
		row.reverse()
	row.forEach((element, idx) => {
		if (current === element) {
			row[idx] = null
			row[currentIdx] = current * 2
			current = 0
			currentIdx = 0
			return
		}
		if (element !== null) {
			current = element
			currentIdx = idx
			return
		}
	});
	if (move === "right" || move === "down") 
		row.reverse()
}

const moveRow = (row, move) => {
	if (move === "left" || move === "up") {
		row.sort((a,b) => {
			if (b>a) 
			  return 0
			if (b==null)
			  return -1
			else
				return 0
		});		
	}
	if (move === "right" || move === "down") {
		row.sort((a,b)=>{
			if (a>b)
			  return 0
			if (a==null)
			  return -1
			else
				return 0		
		});
	}
}




export default App;
