import React, {useState} from 'react';


const Box = (props) => {
  const [hidden, setHidden] = useState(false)
  const handleClick = () => {
    setHidden(!hidden)
  }
  
  return (
    <div className="flex justify-center items-center w-24 h-24 bg-gray-400 border-2"
      onClick={handleClick}>
      {!hidden && props.num}
    </div>
  )
}

const Grid = () => {
  let row = [0,0,0,0]
  let col = [0,0,0,0]
  
/* 
[0,0][1,0][2,0][3,0]
[0,1][1,1][2,1][3,1]
[0,2][1,2][2,2][3,2]
[0,3][1,3][2,3][3,3]
*/

  return (
    <div className="flex flex-row justify-center items-center">
      {row.map((_,i) => {
        return (
          <div key={i}>
            {col.map((_,j) => {
          return (
            <Box key={i*4+j+1} num={i*4+j+1}/>
          )
        })}
          </div>
        )
      })}
    </div>
  )
}

const Button = (props) => {
  return (
    <button className="py-2 px-4 bg-blue-400 text-white mx-1">
      {props.name}
    </button>
  )
}

const App = () => {
  
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <>
      <Grid />
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
