// pages/index.tsx
"use client"
import React ,{ useEffect, useRef, useState } from 'react';
import { Stage, Layer, Rect ,Text} from 'react-konva';
import WorkspaceViewArea from './WorkspaceViewArea';
import WorkspaceContentExample from './WorkspaceContentExample';

let width=200;
let height=200

let stageWidth: number, 
    stageHeight: number, 
    stageCenterX: number, 
    stageCenterY: number, 
    viewAreaWidth: number, 
    viewAreaHeight: number, 
    stageX: number, 
    stageY: number;

function downloadURI(uri, name) {
  var link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
 

export default function Workspace() {
    const divRef = useRef(null)
    const heightCanvas = window.innerHeight - 64;
    const stageRef = React.useRef(null);
    const [dimension, setDimension] = useState({
      //default
      
      scale:1,
      //caculate by system
      stageWidth: 0,
      stageHeight: 0,
      stageCenterX: 0,
      stageCenterY: 0,

      viewAreaWidth:500,
      viewAreaHeight:500,
      stageX:200,
      stageY : 200,
    
    })

  

  
  
    // We cant set the h & w on Stage to 100% it only takes px values so we have to
    // find the parent container's w and h and then manually set those !
    useEffect(() => {
      window.addEventListener("resize", changeLayout);
      changeLayout();
    }, [])
    function changeLayout(scaleType: string="", newScale: number=0){
      if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
        let scale = updateScale(scaleType,newScale)
        // console.log(dimension.scale)
        stageWidth = divRef.current.offsetWidth-2;
        stageHeight = divRef.current.offsetHeight-2;
        if(width*scale>stageWidth){
         stageWidth = width*scale
        }

        if(height*scale>stageHeight){
         stageHeight = height*scale
        }
        stageCenterX = stageWidth/2
        stageCenterY = stageHeight/2

     
       // stageY  =  dimension.stageY

       stageX  =  Math.round(stageCenterX-(width/2*scale) )
       stageY  =  Math.round(stageCenterY-(height/2*scale) )
       //  viewAreaY  =  Math.round(canvasCenterY-(viewAreaHeight*dimension.scale/2)+ 0.5)
  
       setDimension({
         ...dimension,
         stageWidth: stageWidth,
         stageHeight: stageHeight,
         stageCenterX: stageCenterX,
         stageCenterY: stageCenterY,
         
         viewAreaWidth:viewAreaWidth,
         viewAreaHeight:viewAreaHeight,
         stageX : stageX,
         stageY : stageY,
         scale:scale
       })
     }
    }
    function updateScale(scaleType: string, newScale: number): number {
      switch (scaleType) {
          case "-":
              return dimension.scale - newScale;
          case "+":
              return dimension.scale  + newScale;
          case "set":
              return newScale;
          default:
              return dimension.scale;
      }
  }

    const handleExport = () => {
      const uri = stageRef.current.toDataURL(
          { 
            width: viewAreaWidth, // Set the width to your desired value
            height: viewAreaHeight, // Set the height to your desired value
            x: stageX, // Set the x-coordinate for the stage
            y: stageY // Set the y-coordinate for the stage
          }
      );
      console.log(uri);
      downloadURI(uri, 'stage.png');
      // we also can save uri as file
      // but in the demo on Konva website it will not work
      // because of iframe restrictions
      // but feel free to use it in your apps:
      // downloadURI(uri, 'stage.png');
    };

//==========================zoom

const scaleRelativeToPoint = ( increaseScale) => {
  const scaleBy = 1.02;
  //const scaleBy = 0.02;
  const stage = stageRef.current;

  const oldScale = dimension.scale;

  
 // const newScale = increaseScale ? oldScale * scaleBy : oldScale / scaleBy;
  const newScale = increaseScale ? oldScale * scaleBy : oldScale / scaleBy;

 
  changeLayout("set",newScale)
  
};

const handleWheel = (e) => {
  console.log("handleWheel")
  e.evt.preventDefault();
  // if (e.evt.ctrlKey) {
    if (e.evt.ctrlKey) {

      scaleRelativeToPoint(
   
        e.evt.deltaY < 0
      );
    }
};
  
  return (
  
    <>
      <div  ref={divRef} className=" relative flex-grow  grid place-items-center bg-gray-300  overflow-auto max-h-full "  style={{ height: `calc(${heightCanvas}px)` }}>
   
        <div className="relative border border-black " >
          <Stage
            // scale={dimension.scale}
            x={dimension.stageX}
            y={dimension.stageY} 
            scaleX={dimension.scale}
            scaleY={dimension.scale}
              ref={stageRef} 
              onWheel={handleWheel}
              // width={100}
              // height={100}
              width={dimension.stageWidth} height={dimension.stageHeight}
              
              >
          {/* <Stage width={4000} height={2000}> */}
           
            <WorkspaceContentExample dimension={dimension}></WorkspaceContentExample>
        
            <WorkspaceViewArea dimension={dimension} height={height} width={width} ></WorkspaceViewArea>
   
     
          </Stage>
     

         
        </div>

        <button onClick={handleExport} className="absolute top-0 left-0 text-black-500 bg-white p-1 rounded-full">
            Click Me 
        </button>
        <div className="absolute top-40 left-20 text-red-500 text-xs ">
  
            viewAreaHeight: {dimension.viewAreaHeight}<br></br>
            viewAreaWidth  {dimension.viewAreaWidth} <br></br>

                canvasWidth: {dimension.stageWidth}<br/>
                              canvasCenterX {dimension.stageCenterX}<br/>
                              canvasHeight:  {dimension.stageHeight} <br/> 
                              viewAreaY: {dimension.stageY}<br/>  
                              viewAreaX:  {dimension.stageX} `
                              scale:  {dimension.scale} `
                              
        </div>
      </div>
      
    </>



  )
}