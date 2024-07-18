"use client"
import React from 'react'
import { Stage, Layer, Image,Rect } from 'react-konva';
import useImage from 'use-image';

const NewShape = ({  shape }) => {
    let content;
    console.log("NewShape ===========shape")
    console.log(shape)

    if(shape.type=="image"){
      const [img] = useImage(shape.src);
      content = (
        <Image
          image={img}
          x={shape.x}
          y={shape.y}
          draggable="true"
          // I will use offset to set origin to the center of the image
          offsetX={img ? img.width / 2 : 0}
          offsetY={img ? img.height / 2 : 0}
        />
      );
    }
    else if(shape.type=="rectangle"){
      content = (
        <Rect
     
          x={shape.x}
          y={shape.y}
          width={shape.width}
          height={shape.height}
          width={shape.width}
          height={shape.height}
          fill={shape.fill}
          draggable={shape.draggable}
        />
      )
    }

   
    return content
  };
  
export default function CanvasBasic() {
    const dragUrl = React.useRef();
    const stageRef = React.useRef();
    const [shapes, setShapes] = React.useState([]);
    console.log("img ",shapes)
    return (
      <div>
        Try to trag and image into the stage:
        <br />
        <img
          alt="lion"
          src="https://konvajs.org/assets/lion.png"
          draggable="true"
          onDragStart={(e) => {
            // dragUrl.current = e.target.src;
          //  dragUrl.current = e.target.src
            dragUrl.current ={
              src:e.target.src,
              type:"image",
            } 
            console.log("==========Drags")
            console.log(dragUrl)
            console.log(e.target.src)
            
          }}
        />

        <img
          alt="lion"
          src="https://konvajs.org/assets/lion.png"
          draggable="true"
          onDragStart={(e) => {
            // dragUrl.current = e.target.src;

            dragUrl.current={ type: 'rectangle', width: 200, height: 100, fill: 'green', draggable: true },
            console.log(dragUrl)
          }}
        />
        <div
          onDrop={(e) => {
            e.preventDefault();
            // register event position
            stageRef.current.setPointersPositions(e);
            // add image
            setShapes(
              shapes.concat([
                {
                  ...stageRef.current.getPointerPosition(),
                  ...dragUrl.current,
                  
                },
               
                // {
                //   ...stageRef.current.getPointerPosition(),
                //   src: dragUrl.current,
                //   type :"image"
                // },
              ])
            );
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            style={{ border: '1px solid grey' }}
            ref={stageRef}
          >
            <Layer>
              {shapes.map((shape) => {

                return <NewShape shape={shape} />;
              })}
            </Layer>
          </Stage>
        </div>

        <div>
          {JSON.stringify(shapes)}
        </div>
      </div>
    );
}
