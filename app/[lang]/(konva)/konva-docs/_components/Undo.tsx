import React,{useState} from 'react'
import { Stage, Layer, Rect, Text } from 'react-konva';
let history = [
    {
      x: 20,
      y: 20,
    },
  ];
  let historyStep = 0;
function Undo() {
   const[position,setPosition]= useState(history[0])
  const handleUndo = () => {
    if (historyStep === 0) {
      return;
    }
    historyStep -= 1;
    const previous = history[historyStep];
    // this.setState({
    //   position: previous,
    // });
    setPosition(previous)
  };

  const  handleRedo = () => {
    if (historyStep === history.length - 1) {
      return;
    }
    historyStep += 1;
    const next = history[historyStep];
    setPosition(next)
    // this.setState({
    //   position: next,
    // });
  };

  const handleDragEnd = (e) => {
    history = history.slice(0, historyStep + 1);
    const pos = {
      x: e.target.x(),
      y: e.target.y(),
    };
    history = history.concat([pos]);
    historyStep += 1;
    // this.setState({
    //   position: pos,
    // });
    setPosition(pos)
  };
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
        <Text text="undo" onClick={handleUndo} />
        <Text text="redo" x={40} onClick={handleRedo} />
        <Rect
            x={position.x}
            y={position.y}
            width={50}
            height={50}
            fill="black"
            draggable
            onDragEnd={handleDragEnd}
        />
        </Layer>
    </Stage>
  )
}

export default Undo