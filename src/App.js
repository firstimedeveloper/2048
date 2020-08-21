import React, {useState} from 'react';


const Box = (props) => {
  const [hidden, setHidden] = useState(false)
  const handleClick = () => {
    setHidden(!hidden)
  }
  
  return (
    <div className="flex justify-center items-center w-24 h-24 bg-gray-400 border-2 hover:bg-gray-600"
      onClick={handleClick}>
      {!hidden && props.num}
    </div>
  )
}

const Grid = () => {
  const renderSquare = (i) => {
    return (
      <Box num={i} ></Box>
    );
  };
  let row = [0,0,0,0]
  let col = [0,0,0,0]
  
  return (
    <div className="flex flex-row justify-center item-center w-full">
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
    <div className="flex min-h-screen justify-center item-center bg-grey-200 p-20">
      <div className="flex shadow-lg justify-center item-center w-full p-5">
        <Grid />
      </div>
    </div>
  );
}

export default App;
