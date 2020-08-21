import React, {useState} from 'react';


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

  var gameOver = false

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
        console.log(idx)
        console.log(board[idx])
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
        nextRound()
        break;
      case "ArrowUp":
        nextRound()
        break;
      case "ArrowLeft":
        nextRound()
        break;
      case "ArrowRight":
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
