import React, {useState, useEffect} from 'react';


const Box = (props) => {
	return (
		<div className="flex justify-center items-center w-24 h-24 bg-gray-400 border-2">
			{props.value}
		</div>
	)
}

const Board = (props) => {
/* 
 0  1  2  3
 4  5  6  7
 8  9  10 11
 12 13 14 15
*/


	return (
		<div className="grid grid-cols-4">
			{props.board.map((v,i) => {
					return <Box key={i} value={v}/>
			})}
		</div>
	)
}

const Button = (props) => {
	const handleClick = () => {
		//TODO this will be the swipe actions in the future.
	}
	let color = "blue-400"
	if (props.name === "reset") {
		color = "red-600"
	}
	
	return (
		<button className={`py-2 px-4 bg-${color} text-white mx-1`} onClick={props.handleClick? props.handleClick : handleClick}>
			{props.name}
		</button>
	)
}

const App = () => {
	const [board, setBoard] = useState(() => generateInitialBoard())
	const [direction, setDirection] = useState("")

	var gameOver = false

	useEffect(() => {
		const handleMovement = (row, move) => {
			if (move === "left" || move === "up") {
				row.sort((a,b) => {
					if (b>a) {
					  return 0
					}
					if (b==null) {
					  return -1
					}
					else {
						return 0
					}
				});		
			}
			if (move === "right" || move === "down") {
				row.sort((a,b)=>{
					if (a>b) {
					  return 0
					}
					if (a==null) {
					  return -1
					}
					else {
						return 0
					}			
				});
			}
		}

		if (!gameOver && direction !== "") {
			const newBoard = [...board]
			for(let i=0;i<4;i++) {
				let row = []
				for(let j=0;j<4;j++) {
					if (direction === "left" || direction === "right")
						row.push(board[(i*4)+j])
					if (direction === "up" || direction === "down")
						row.push(board[(j*4)+i])
				}
				if (row != null && row.length > 0) {
					//handleAddition
					console.log(i, row)
					handleMovement(row, direction)
				
					for(let j=0;j<4;j++) {
						console.log(i, row)
						if (direction === "left" || direction === "right")
							newBoard[(i*4)+j] = row[j]
						if (direction === "up" || direction === "down")
							newBoard[(j*4)+i] = row[j]
					}
				}	
			}
			
			setBoard(newBoard)
			setDirection("")
		}

	}, [gameOver, board, direction])



	// resets board
	const resetGame = () => {
		setBoard(() => generateInitialBoard())
	}

	// button that triggers the next round
	const nextRound = () => {
		if (!gameOver) {
			let idx = 0
			do {
				idx = Math.floor(Math.random() * 16)
			} while (board[idx] != null)
			let num = generateRandomNum()
			handleUpdate(idx, num)
		}
	}

	const handleUpdate = (index, num) => {
		const newBoard = [...board]
		newBoard[index] = num
		setBoard(newBoard)
	}

	const handleKeyDown = (e) => {
		switch (e.key) {
			case "ArrowDown":
				setDirection("down")
				nextRound()
				break;
			case "ArrowUp":
				setDirection("up")
				nextRound()
				break;
			case "ArrowLeft":
				setDirection("left")
				nextRound()
				break;
			case "ArrowRight":
				setDirection("right")
				nextRound()
				break;
			default:
				break;
		}
	}

	return (
		<div tabIndex="0" onKeyDown={handleKeyDown} className="flex flex-col justify-evenly items-center h-screen border-0">
			<>
			{!gameOver && <Board board={board} setBoard={setBoard}/>}
			<div>
				<Button name="Left" />
				<Button name="right" />
				<Button name="up" />
				<Button name="down" />
				<Button name="reset" handleClick={resetGame} />
				<Button name="next" handleClick={nextRound} />
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




export default App;
