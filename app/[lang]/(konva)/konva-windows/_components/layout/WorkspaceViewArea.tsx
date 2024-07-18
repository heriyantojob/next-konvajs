
"use client"
import React ,{ useEffect, useRef, useState } from 'react';
import {  Layer, Rect ,Group} from 'react-konva';




export default function WorkspaceViewArea({dimension,height,width}) {
  
  return (
  
    <>

          {/* <Stage width={4000} height={2000}> */}

            {/* Workspace canvas */}
            {/* <Layer>
            

            </Layer> */}

            <Layer draggable={false} listening={false}>
            
              <Group     >
                <Rect
                  x={-dimension.stageX*3}
                  y={-dimension.stageY*3}
                  width={dimension.stageWidth}
                  height={dimension.stageHeight}
                  fill='#000000'
                  scaleX={3}
                  scaleY={3}
                  opacity={0.8}
                />
                <Rect
                  x={0}
                  y={0}
                  width={width}
                  height={height}
                  strokeWidth={2} // border width
                  fillAfterStrokeEnabled={false}
                  fill='#000000'
                 
                  strokeHitEnabled={false}
                  globalCompositeOperation='destination-out'
                />

              <Rect
                  x={-1}
                  y={-1}
                  width={height+1}
                  height={width+1}
                  strokeWidth={2} // border width
                  dash= {[2, 2]}
                  fillAfterStrokeEnabled={false}
                  
                  stroke="#3BA3FF" // border color
                  strokeHitEnabled={false}
                />
              </Group>
            </Layer>
   
      
    </>



  )
}