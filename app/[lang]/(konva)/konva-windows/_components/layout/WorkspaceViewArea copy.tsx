
"use client"
import React ,{ useEffect, useRef, useState } from 'react';
import {  Layer, Rect ,Group} from 'react-konva';




export default function WorkspaceViewArea({dimension}) {
  
  return (
  
    <>

          {/* <Stage width={4000} height={2000}> */}

            {/* Workspace canvas */}
            {/* <Layer>
            

            </Layer> */}

            <Layer draggable={false} listening={false}>
              <Rect
                  x={dimension.viewAreaX-1}
                  y={dimension.viewAreaY-1}
                  width={dimension.viewAreaHeight+1}
                  height={dimension.viewAreaWidth+1}
                  strokeWidth={10} // border width
                  dash= {[2, 2]}
                  fillAfterStrokeEnabled={false}
                  
                  stroke="#3BA3FF" // border color
                  strokeHitEnabled={false}
                />
              <Group     >
                <Rect
                  x={0}
                  y={0}
                  width={dimension.canvasWidth}
                  height={dimension.canvasHeight}
                  fill='#000000'
                  opacity={0.8}
                />
                <Rect
                  x={dimension.viewAreaX}
                  y={dimension.viewAreaY}
                  width={dimension.viewAreaHeight}
                  height={dimension.viewAreaWidth}
                  strokeWidth={2} // border width
                  fillAfterStrokeEnabled={false}
                  fill='#000000'
                 
                  strokeHitEnabled={false}
                  globalCompositeOperation='destination-out'
                />
              </Group>
            </Layer>
   
      
    </>



  )
}