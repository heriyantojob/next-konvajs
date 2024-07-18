"use client"
import React, { useRef, useState } from "react";
import { Stage, Layer, Rect, Image } from "react-konva";


function App() {
  const stageRef = useRef(null);
  const width = 1000;
  const height = 1000;

  const [stage, setStage] = useState({
    scale: 1,
    x: 0,
    y: 0
  });
  const scaleRelativeToPoint = (point, increaseScale) => {
    const scaleBy = 1.02;
    //const scaleBy = 0.02;
    const stage = stageRef.current;
    const oldScale = stage.scaleX();


   // const newScale = increaseScale ? oldScale * scaleBy : oldScale / scaleBy;
    const newScale = increaseScale ? oldScale * scaleBy : oldScale / scaleBy;

    //const newScale = increaseScale ? oldScale +scaleBy : oldScale - scaleBy;
    
    const mousePointTo = {
      x: point.x / oldScale - stage.x() / oldScale,
      y: point.y / oldScale - stage.y() / oldScale
    };
    setStage({
      scale: newScale,
      x: (point.x / newScale - mousePointTo.x) * newScale,
      y: (point.y / newScale - mousePointTo.y) * newScale
    });
  };

  const handleWheel = (e) => {
    e.evt.preventDefault();
    // if (e.evt.ctrlKey) {
      if (e.evt.ctrlKey) {
        scaleRelativeToPoint(
          e.target.getStage().getPointerPosition(),
          e.evt.deltaY < 0
        );
      }
  };
  // ... rest of your code

  return (
    <>

      <div className="container mx-auto">
        <div className="flex">
          <div className="w-3/4">
            <div className="flex justify-center mt-5">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  scaleRelativeToPoint(
                    {
                      x: width / 2,
                      y: height / 2
                    },
                    true
                  );
                }}
              >
                +
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  scaleRelativeToPoint(
                    {
                      x: width / 2,
                      y: height / 2
                    },
                    false
                  );
                }}
              >
                -
              </button>
            </div>

            <div className="flex justify-center mt-5">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  scaleRelativeToPoint(
                    {
                      x: width / 2,
                      y: height / 2
                    },
                    true
                  );
                }}
              >
                +
              </button>
              <input type="text" value={stage.scale*100} className="border-solid border-2 border-indigo-600"></input>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  scaleRelativeToPoint(
                    {
                      x: width / 2,
                      y: height / 2
                    },
                    false
                  );
                }}
              >
                -
              </button>
            </div>
            <div className="flex justify-center border border-gray-400 mt-5 ml-5 overflow-scroll">
              {/* //artboard */}
              <Stage
                width={width}
                height={height}
                onWheel={handleWheel}
                scaleX={stage.scale}
                scaleY={stage.scale}

                // scaleX={5}
                // scaleY={5}
                x={stage.x}
                y={stage.y}
                ref={stageRef}

                onKeyDown={(e) => {
                  if (e.ctrlKey) {
                    // Ctrl key is pressed
                    console.log('Ctrl key is pressed');
                    // You can add more custom logic for Ctrl key here if needed
                  }
                }}
              >
                <Layer>
                  <Rect fill="Blue" height={500} width={500} />
                </Layer>

                <Layer>
                  <Rect fill="red" height={200} width={200} draggable={true} />
                </Layer>
              </Stage>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
