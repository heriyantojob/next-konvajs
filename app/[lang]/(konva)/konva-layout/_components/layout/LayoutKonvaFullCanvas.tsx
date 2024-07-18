// pages/index.tsx
"use client"
import React ,{ useEffect, useRef, useState } from 'react';
import { Stage, Layer, Rect } from 'react-konva';

export default function Layout() {
    const divRef = useRef(null)
    const [dimensions, setDimensions] = useState({
      width: 0,
      height: 0
    })
  
    // We cant set the h & w on Stage to 100% it only takes px values so we have to
    // find the parent container's w and h and then manually set those !
    useEffect(() => {
      if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
        setDimensions({
          width: divRef.current.offsetWidth-10,
          height: divRef.current.offsetHeight-10
        })
      }
    }, [])
    const heightCanvas = window.innerHeight - 64;
  return (
    <div className="flex flex-col h-screen bg-gray-200">
      {/* Navbar */}
      <nav className="w-full bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-semibold tracking-wide">Your App Name</h1>
      </nav>

      {/* Main Content */}
      <div className="flex-grow flex">
        {/* Sidebar / Action bar */}
        <div className="bg-gray-800 text-white w-20 flex flex-col items-center">
          {/* Insert your logo here */}
          
          {/* Insert your action buttons here */}
          <button className="my-2 w-10 h-10 bg-blue-500 rounded-full"></button>
          <button className="my-2 w-10 h-10 bg-blue-500 rounded-full"></button>
          <button className="my-2 w-10 h-10 bg-blue-500 rounded-full"></button>
        </div>
{/* 
        template */}

           {/* Layers / Properties Panel */}
        <div className="w-80 bg-gray-800  text-white">
          {/* Insert your layers or properties here */}
          <div className="p-4 border-b border-gray-700">Layer 1</div>
          <div className="p-4 border-b border-gray-700">Layer 2</div>
          <div className="p-4 border-b border-gray-700">Layer 3</div>
        </div>
  


        {/* Canvas / Workspace */}
      <div  ref={divRef} className="flex-grow  grid place-items-center bg-gray-300  overflow-auto max-h-full "  style={{ height: `calc(${heightCanvas}px)` }}>
          {/* Insert your workspace here */}
          <div className="border border-black " >
            {/* <Stage width={dimensions.width} height={dimensions.height}> */}
            <Stage width={4000} height={2000}>
              <Layer>
                <Rect
                  x={20}
                  y={20}
                  width={100}
                  height={100}
                  fill="red"
                  draggable
                />
              </Layer>
            </Stage>
          </div>
        </div>


           {/* Layers / Properties Panel */}
        <div className="w-80 bg-gray-800  text-white">
          {/* Insert your layers or properties here */}
          <div className="p-4 border-b border-gray-700">Layer 1</div>
          <div className="p-4 border-b border-gray-700">Layer 2</div>
          <div className="p-4 border-b border-gray-700">Layer 3</div>
        </div>

     
      </div>
    </div>
  )
}