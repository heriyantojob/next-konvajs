"use client"
import React from 'react';
import { Stage, Layer, Group, Rect } from 'react-konva';

function App() {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>

    <Layer>
        <Group>
          <Rect
            x={1200}
            y={50}
            width={50}
            height={50}
            fill='yellow'
            draggable={true}
          />
         
        </Group>
      </Layer>


      <Layer draggable={false}>
        <Group     >
          <Rect
            x={0}
            y={0}
            width={1000}
            height={1000}
            fill='brown'
            opacity={0.1}
          />
          <Rect
            x={40}
            y={40}
            width={500}
            height={500}
            fill='white'
            globalCompositeOperation='destination-out'
          />
        </Group>
      </Layer>


    </Stage>
  );
}

export default App;