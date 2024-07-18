"use client"
import React from 'react'
import { Stage, Layer, Rect, Text, Circle, Line,Transformer } from 'react-konva';
function TransformMultiple() {
  const shapeRef = React.useRef();
  const circleRef = React.useRef();
  const trRef = React.useRef();
  React.useEffect(() => {
  
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current,circleRef.current]);
      trRef.current.getLayer().batchDraw();

  }, []);
  return (
    <>
    <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
        <Text text="Some text on canvas" fontSize={15} draggable />
        <Rect
          ref={shapeRef}
            x={20}
            y={50}
            width={100}
            height={100}
            fill="red"
            shadowBlur={10}
            draggable
        />
        <Circle ref={circleRef} x={200} y={300} radius={100} fill="green" draggable/>
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

        <Transformer
                  ref={trRef}
                  boundBoxFunc={(oldBox, newBox) => {
                    // limit resize
                    if (newBox.width < 5 || newBox.height < 5) {
                      return oldBox;
                    }
                    return newBox;
                  }}
                />
      
        </Layer>
    </Stage>
    </>
    
  )
}

export default TransformMultiple