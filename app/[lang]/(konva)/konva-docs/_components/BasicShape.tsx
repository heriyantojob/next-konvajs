"use client"
import React from 'react'
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';
function BasicShape() {
  const trRef = React.useRef();
  return (
    <>
    <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
        <Text text="Some text on canvas" fontSize={15} draggable />
        <Rect
            x={20}
            y={50}
            width={100}
            height={100}
            fill="red"
            shadowBlur={10}
            draggable
        />
        <Circle x={200} y={100} radius={50} fill="green" draggable/>
        <Line
            x={20}
            y={200}
            points={[0, 0, 100, 0, 100, 100]}
            tension={0.5}
            closed
            stroke="black"
            fillLinearGradientStartPoint={{ x: -50, y: -50 }}
            fillLinearGradientEndPoint={{ x: 50, y: 50 }}
            fillLinearGradientColorStops={[0, 'red', 1, 'yellow']}
            
        />
        </Layer>
    </Stage>
    </>
    
  )
}

export default BasicShape