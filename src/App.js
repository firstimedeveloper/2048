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
  
  return (
    <div className="flex flex-row justify-center items-center h-screen">
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

const App = () => {
  
  return (
    <Grid />
  );
}

export default App;
