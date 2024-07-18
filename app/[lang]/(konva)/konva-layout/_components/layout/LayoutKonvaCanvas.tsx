// pages/index.tsx
"use client"
import React from 'react';
import { Stage, Layer, Rect } from 'react-konva';

export default function Home() {
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
          <h2 className="my-4 text-2xl font-semibold tracking-wide">Logo</h2>
          {/* Insert your action buttons here */}
        
          <button className="my-2 w-10 h-10 bg-blue-500 rounded-full"></button>
          <button className="my-2 w-10 h-10 bg-blue-500 rounded-full"></button>
          <button className="my-2 w-10 h-10 bg-blue-500 rounded-full"></button>
        </div>
{/* 
        template */}

           {/* Layers / Properties Panel */}
        <div className="w-80 bg-gray-800 text-white">
          {/* Insert your layers or properties here */}
          <div className="p-4 border-b border-gray-700">Layer 1</div>
          <div className="p-4 border-b border-gray-700">Layer 2</div>
          <div className="p-4 border-b border-gray-700">Layer 3</div>
        </div>

        {/* Canvas / Workspace */}
        <div className="flex-grow grid place-items-center bg-gray-300 overflow-auto">
          {/* Insert your workspace here */}
          <div className="border border-black">
            <Stage width={1000} height={1000}>
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

     
      </div>
    </div>
  )
}