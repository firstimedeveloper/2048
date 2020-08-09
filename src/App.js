import React, {useState} from 'react';


const Box = (props) => {
  const [hidden, setHidden] = useState(false)
  const handleClick = () => {
    setHidden(!hidden)
  }
  
  return (
    <div className="flex justify-center items-center w-24 h-24 border-solid border-2"
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
  
  return (
    <div className="flex flex-row justify-center item-center w-full">
      <div className="grid-flow-row">
      {renderSquare(0)}
      {renderSquare(1)}
      {renderSquare(2)}
      </div>
      <div className="grid-flow-row">
      {renderSquare(3)}
      {renderSquare(4)}
      {renderSquare(5)}
      </div>
      <div className="grid-flow-row">
      {renderSquare(6)}
      {renderSquare(7)}
      {renderSquare(8)}
      </div>
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
