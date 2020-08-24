import React, {useState, useEffect, useRef, useCallback} from 'react';


const Box = (props) => {
	return (
		<div className="flex justify-center items-center w-24 h-24 bg-gray-400 border-2">
			{props.value}
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

const Board = (props) => {
/* 
 0  1  2  3
 4  5  6  7
 8  9  10 11
 12 13 14 15
*/	
	if (!props.wait && props.direction !== "") {
		const newBoard = [...props.board]
		for(let i=0;i<4;i++) {
			let row = []
			for(let j=0;j<4;j++) {
				if (props.direction === "left" || props.direction === "right")
					row.push(props.board[(i*4)+j])
				if (props.direction === "up" || props.direction === "down")
					row.push(props.board[(j*4)+i])
			}
			if (row != null && row.length > 0) {
				addRow(row)
				moveRow(row, props.direction)
			
				for(let j=0;j<4;j++) {
					if (props.direction === "left" || props.direction === "right")
						newBoard[(i*4)+j] = row[j]
					if (props.direction === "up" || props.direction === "down")
						newBoard[(j*4)+i] = row[j]
				}
			}	
		}
		// if (JSON.stringify(board) !== JSON.stringify(newBoard)) {
		props.setBoard(newBoard)
		// }
		props.setDirection("")
		props.setWait(true)
	}
	


	return (
		<div className="grid grid-cols-4">
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

	const timeoutIdRef = useRef();
	const cancel = useCallback(
		() => {
			const timeoutId = timeoutIdRef.current;
			if (timeoutId) {
				timeoutIdRef.current = undefined;
				clearTimeout(timeoutId);
			}
		},
		[timeoutIdRef],
	);
	useEffect(() => {
		if (wait) {
			timeoutIdRef.current = setTimeout(() => {
				let idx = 0
				do {
					idx = Math.floor(Math.random() * 16)
				} while (board[idx] != null)
				let num = generateRandomNum()
				const newBoard = [...board]
				newBoard[idx] = num
				setWait(false)
				setBoard(newBoard)
			}, 500);
		}
		return cancel;
	}, [cancel, board, wait]);	


	// resets board
	const resetGame = () => {
		setBoard(() => generateInitialBoard())
	}

	const handleKeyDown = (e) => {
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
		//nextRound()
	}

	return (
		<div tabIndex="0" onKeyDown={handleKeyDown} className="flex flex-col justify-evenly items-center h-screen border-0">
			<>
			{!gameOver && <Board  wait={wait} setWait={setWait} direction={direction} setDirection={setDirection} board={board} setBoard={setBoard}/>}
			<div>
				<Button name="Left" />
				<Button name="right" />
				<Button name="up" />
				<Button name="down" />
				<Button name="reset" handleClick={resetGame} />
				<Button name="next" />
			</div>
			</>
		</div>
	);
}

const useTimeout = (
	callback, // function to call. No args passed.
	// if you create a new callback each render, then previous callback will be cancelled on render.
	timeout= 0, // delay, ms (default: immediately put into JS Event Queue)
  ) => {
	  const timeoutIdRef = useRef();
	  const cancel = useCallback(
		  () => {
			  const timeoutId = timeoutIdRef.current;
			  if (timeoutId) {
				  timeoutIdRef.current = undefined;
				  clearTimeout(timeoutId);
			  }
		  },
		  [timeoutIdRef],
	  );
  
	  useEffect(
		  () => {
			timeoutIdRef.current = setTimeout(callback, timeout);
			return cancel;
		  },
		  [callback, timeout, cancel],
	  );
  
	  return cancel;
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

const addRow = (row) => {
	let current = 0
	let currentIdx = 0
	row.forEach((element, idx) => {
		if (current === element) {
			row[idx] = null
			row[currentIdx] = current * 2
			current = 0
			currentIdx = 0
		}
		if (element !== null) {
			current = element
			currentIdx = idx
		}
	});
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
