import React, { Fragment }  from 'react'
import { Stage, Layer, Rect } from 'react-konva';

function ExportImages() {
    const width = window.innerWidth;
    const height = window.innerHeight;
  
    const stageRef = React.useRef(null);
  
    const handleExport = () => {
      const uri = stageRef.current.toDataURL();
      console.log(uri);
      // we also can save uri as file
      // but in the demo on Konva website it will not work
      // because of iframe restrictions
      // but feel free to use it in your apps:
      // downloadURI(uri, 'stage.png');
    };
  
    return (
      <Fragment>
        <button onClick={handleExport}>Click here to log stage data URL</button>
        <Stage width={width} height={height} ref={stageRef}>
          <Layer>
            <Rect x={0} y={0} width={80} height={80} fill="red" />
            <Rect x={width - 80} y={0} width={80} height={80} fill="red" />
            <Rect
              x={width - 80}
              y={height - 80}
              width={80}
              height={80}
              fill="red"
            />
            <Rect x={0} y={height - 80} width={80} height={80} fill="red" />
          </Layer>
        </Stage>
      </Fragment>
    );
}

export default ExportImages