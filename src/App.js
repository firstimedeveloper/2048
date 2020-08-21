import React, {useState} from 'react';


const Box = (props) => {
  return (
    <div className="flex justify-center items-center w-24 h-24 bg-gray-400 border-2">
    {props.num}
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
          return <Box key={i} value={v} num={i}/>
      })}
    </div>
  )
}

const Button = (props) => {
  const handleClick = () => {
    //TODO this will be the swipe actions in the future.
  }
  
  return (
    <button className="py-2 px-4 bg-blue-400 text-white mx-1" onClick={handleClick}>
      {props.name}
    </button>
  )
}

const App = () => {
  const [board, setBoard] = useState(Array(16).fill(null))


  return (
    <div className="flex flex-col justify-evenly items-center h-screen">
      <>
      <Board board={board} setBoard={setBoard}/>
      <div>
        <Button name="Left" />
        <Button name="right" />
        <Button name="up" />
        <Button name="down" />
      </div>
      </>
    </div>
  );
}

export default App;
