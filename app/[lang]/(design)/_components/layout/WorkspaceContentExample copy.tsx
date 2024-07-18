
"use client"
import React ,{ useEffect, useRef, useState } from 'react';
import { Stage, Layer, Rect, Circle, Line } from 'react-konva';
const shapes = [
  { type: 'rect', x: 0, y: 0, width: 100, height: 100 ,fill:"green"},
  { type: 'circle', x: 50, y: 50, radius: 50 },
  { type: 'rect', x: 0, y: 0, width: 50, height: 50,fill:"red" },

  { type: 'triangle', x: 200, y: 200, points: [0, 0, 50, 100, 100, 0] }
];
export default function WorkspaceContentExample({dimension}) {
  
  return (
  
    <>

          {/* <Stage width={4000} height={2000}> */}

            {/* Workspace canvas */}
            <Layer>
            {shapes.map((shape, i) => {
              switch (shape.type) {
                case 'rect':
                  return <Rect key={i} x={shape.x+dimension.viewAreaX} y={shape.y+dimension.viewAreaY} width={shape.width} height={shape.height} fill={shape.fill} draggable />;
                case 'circle':
                  return <Circle key={i} x={shape.x+dimension.viewAreaX} y={shape.y+dimension.viewAreaY} radius={shape.radius} fill="green" draggable />;
                case 'triangle':
                  return <Line key={i} points={shape.points } fill="blue" closed draggable />;
                default:
                  return null;
              }
            })}

            </Layer>

            
   
      
    </>



  )
}