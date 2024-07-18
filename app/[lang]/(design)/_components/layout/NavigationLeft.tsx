// pages/index.tsx
"use client"
import React ,{ useEffect, useRef, useState } from 'react';
import { Stage, Layer, Rect } from 'react-konva';

export default function NavigationLeft() {
    
  return (
    <div className="bg-gray-800 text-white w-20 flex flex-col items-center">
            {/* Insert your logo here */}
            
            {/* Insert your action buttons here */}
            <button className="my-2 w-10 h-10 bg-blue-500 rounded-full"></button>
            <button className="my-2 w-10 h-10 bg-blue-500 rounded-full"></button>
            <button className="my-2 w-10 h-10 bg-blue-500 rounded-full"></button>
    </div>
  )
}