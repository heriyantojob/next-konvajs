// pages/index.tsx
"use client"
import React ,{ useEffect, useRef, useState } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import NavigationTop from "./NavigationTop"
import NavigationLeft from './NavigationLeft';
import SidebarLeft from './SidebarLeft';
import Workspace from  "./Workspace"
export default function Layout() {
 
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
        <Workspace></Workspace>
        {/* Canvas / Workspace */}

        

           {/* Layers / Properties Panel */}
           {/* <SidebarLeft/> */}
     
      </div>
    </div>
  )
}

// https://codesandbox.io/s/github/felri/editor-konva/tree/master/