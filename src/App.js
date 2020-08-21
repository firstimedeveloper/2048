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
          console.log(v)
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

  const resetGame = () => {
    setBoard(() => generateInitialBoard())
  }

  return (
    <div className="flex flex-col justify-evenly items-center h-screen">
      <>
      <Board board={board} setBoard={setBoard}/>
      <div>
        <Button name="Left" />
        <Button name="right" />
        <Button name="up" />
        <Button name="down" />
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

  let tempBoard = Array(16).fill(null)
  tempBoard[num] = 2
  tempBoard[secondNum] = 2
  return (tempBoard)
}

// const generateRandomNum = () => {
//   const numIsTwo = Math.random() >= 0.5
//   return numIsTwo ? 2 : 4
// }


export default App;
