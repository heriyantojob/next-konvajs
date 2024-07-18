// pages/index.tsx
"use client"
import React ,{ useEffect, useRef, useState } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import NavigationTop from "./NavigationTop"
import NavigationLeft from './NavigationLeft';
import SidebarLeft from './SidebarLeft';
import Workspace from  "./'Workspace"
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
    <div className="flex flex-col h-screen max-h-full -max bg-gray-200">
      {/* Navbar */}
      <NavigationTop></NavigationTop>
      {/* Main Content */}
      <div className="flex-grow flex  max-h-full ">
        {/* Sidebar / Action bar */}
        <NavigationLeft></NavigationLeft>
{/* 
        template */}

           {/* Layers / Properties Panel */}
        <SidebarLeft/>

        {/* Canvas / Workspace */}
        <div  ref={divRef} className="flex-grow  grid place-items-center bg-gray-300  overflow-auto max-h-full "  style={{ height: `calc(${heightCanvas}px)` }}>
          {/* Insert your workspace here */}
          <div className="border border-black " >
            <Stage width={dimensions.width} height={dimensions.height}>
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
              </Layer>
            </Stage>
          </div>
        </div>
        

           {/* Layers / Properties Panel */}
           <SidebarLeft/>
     
      </div>
    </div>
  )
}