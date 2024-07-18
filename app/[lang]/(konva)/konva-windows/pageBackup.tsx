"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Line, Rect, Group } from 'react-konva';

const Frame = ({ frameWidth, frameHeight }) => {
  const padding = 20;
  const points = [
    [0, 0, frameWidth, 0, frameWidth - padding, padding, padding, padding],
    [0, 0, padding, padding, padding, frameHeight - padding, 0, frameHeight],
    [0, frameHeight, padding, frameHeight - padding, frameWidth - padding,
      frameHeight - padding, frameWidth, frameHeight],
    [frameWidth, 0, frameWidth, frameHeight,
      frameWidth - padding, frameHeight - padding,
      frameWidth - padding, padding]
  ];

  return (
    <Group>
      <Rect
        x={padding}
        y={padding}
        width={frameWidth - padding * 2}
        height={frameHeight - padding * 2}
       
      />
      {points.map((pointArr) => (
        <Line
          points={pointArr}
          fill='white'
          closed
          stroke='black'
          strokeWidth={1}
        />
      ))}
    </Group>
  );
};

const Canvas = () => {
    const [frameWidth, setFrameWidth] = useState(1000);
    const [frameHeight, setFrameHeight] = useState(2000);
    
    const stageRef = useRef(null);
    const layerRef = useRef(null);
  
    useEffect(() => {
      if (stageRef.current && layerRef.current) {
        const stage = stageRef.current;
        const layer = layerRef.current;
        const wr = stage.width() / frameWidth;
        const hr = stage.height() / frameHeight;
        const ratio = Math.min(wr, hr) * 0.5;
  
        // Calculate the position of the group to center it
        const groupX = (stage.width() - frameWidth * ratio) / 2;
        const groupY = (stage.height() - frameHeight * ratio) / 2;
  
        layer.position({ x: groupX, y: groupY });
        stage.scale({ x: ratio, y: ratio });
        stage.draw();
      }
    }, [frameWidth, frameHeight]);
  
    return (
      <div>
        <input
          id='widthInput'
          type='number'
          value={frameWidth}
          onChange={(e) => setFrameWidth(parseInt(e.target.value))}
        />
        <input
          id='heightInput'
          type='number'
          value={frameHeight}
          onChange={(e) => setFrameHeight(parseInt(e.target.value))}
        />
        <Stage ref={stageRef} width={window.innerWidth} height={window.innerHeight}>
          <Layer ref={layerRef}>
            <Frame frameWidth={frameWidth} frameHeight={frameHeight} />
              <Rect
                x={0}
                y={0}
                width={100}
                height={100}
                draggable={true}
                fill='#00ff00'
              
              />
          </Layer>

        
        </Stage>
      </div>
    );
  };
  
  

export default Canvas;