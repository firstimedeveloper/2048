import React, {useState, useEffect} from 'react';
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
	var color
	switch (props.value) {
		case 2:
			color = "bg-orange-300" 
			break;
		case 4:
			color = "bg-orange-400"	
			break;
		case 8:
			color = "bg-orange-500"
			break;	
		case 16:
			color = "bg-red-500"
			break;
		case 32:
			color = "bg-red-600"
			break;
		case 64:
			color = "bg-red-700"
			break;
		case 128:
			color = "bg-purple-700"
			break;
		case 256:
			color = "bg-purple-800"
			break;
		case 512:
			color = "bg-yellow-400"
			break;
		case 1024:
			color = "bg-yellow-500"
			break;
		case 2048:
			color = "bg-yellow-600"
			break;	
		default:
			color = "bg-grey-100"
			break;
	}

	return (
		
		<div className={`flex justify-center items-center w-20 h-20 md:w-24 md:h-24 ${color} text-white sm:text-2xl md:text-6xl font-semibold border-solid border border-gray-300`}>{props.value}</div>
	)
}

const Board = (props) => {

	if (!props.wait && props.direction !== "") {
		const newBoard = renderBoard(props.board, props.direction)
		if (JSON.stringify(props.board) !== JSON.stringify(newBoard)) {
			props.setBoard(newBoard)
			props.setWait(true)
		}
		props.setDirection("")
	}
	


	return (

		
		<div className="grid grid-cols-4 border-8 border-gray-700">
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

	if (calculateGameOver(board)) {
		setGameOver(true)
	}
	
	useEffect(() => {
		if (wait) {
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
	}, [board, wait]);	


	// resets board
	const resetGame = () => {
		setBoard(() => generateInitialBoard())
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
		<div tabIndex="0" onKeyDown={handleKeyDown} className="flex flex-col justify-evenly items-center h-screen border-0">
			<>
			{!gameOver && <Board wait={wait} setWait={setWait} direction={direction} setDirection={setDirection} board={board} setBoard={setBoard}/>}
			<div className="flex flex-wrap justify-center items-center">
				<Button name="left" move={setDirection} wait={wait}/>
				<Button name="right" move={setDirection} wait={wait}/>
				<Button name="up" move={setDirection} wait={wait}/>
				<Button name="down" move={setDirection} wait={wait}/>
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

const calculateGameOver = (board) => {
	return false
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
