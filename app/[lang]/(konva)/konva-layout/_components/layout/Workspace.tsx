// pages/index.tsx
"use client"
import React ,{ useEffect, useRef, useState } from 'react';
import { Stage, Layer, Rect } from 'react-konva';

export default function Workspace() {
    const divRef = useRef(null)
    const [dimensions, setDimensions] = useState({
      canvasWidth: 0,
      canvasHeight: 0
    })
  
    // We cant set the h & w on Stage to 100% it only takes px values so we have to
    // find the parent container's w and h and then manually set those !
    useEffect(() => {
      if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
        setDimensions({
          canvasWidth: divRef.current.offsetWidth-10,
          canvasHeight: divRef.current.offsetHeight-10
        })
      }
    }, [])
    const heightCanvas = window.innerHeight - 64;
  return (
  
    <>
      <div  ref={divRef} className="flex-grow  grid place-items-center bg-gray-300  overflow-auto max-h-full "  style={{ height: `calc(${heightCanvas}px)` }}>
   
        <div className="border border-black " >
          <Stage width={dimensions.canvasWidth} height={dimensions.canvasHeight}>
          {/* <Stage width={4000} height={2000}> */}
            <Layer>
              <Rect
                x={20}
                y={20}
                width={100}
                height={100}
                fill="red"
                draggable
              />


            <Rect
                x={100}
                y={100}
                width={100}
                height={100}
                fill="red"
                draggable
              />
            </Layer>
          </Stage>
        </div>
      </div>
      
    </>



  )
}