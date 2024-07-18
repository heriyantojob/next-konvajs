"use client"
import React from "react";
import { render } from "react-dom";
import { Stage, Layer, Rect, Transformer } from "react-konva";
import Konva from "konva";
let down= 1
const Rectangle = ({ shapeProps, onChange }) => {
  const shapeRef = React.useRef();

  return (
    <Rect
      ref={shapeRef}
      {...shapeProps}
      name="rectangle"
      draggable
      onDragEnd={(e) => {
        onChange({
          ...shapeProps,
          x: e.target.x(),
          y: e.target.y()
        });
      }}
      onTransformEnd={(e) => {
        // transformer is changing scale of the node
        // and NOT its width or height
        // but in the store we have only width and height
        // to match the data better we will reset scale on transform end
        const node = shapeRef.current;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();

        // we will reset it back
        node.scaleX(1);
        node.scaleY(1);
        onChange({
          ...shapeProps,
          x: node.x(),
          y: node.y(),
          // set minimal value
          width: Math.max(5, node.width() * scaleX),
          height: Math.max(node.height() * scaleY)
        });
      }}
    />
  );
};

const listRectangles = [
  {
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: "blue",
    id: "rect1"
  },
  {
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    fill: "green",
    id: "rect2"
  }
];

 const TransformDrag = () => {
  const [rectangles, setRectangles] = React.useState(listRectangles);
  const [selectedIds, selectShapes] = React.useState([]);
  const trRef = React.useRef();
  const layerRef = React.useRef();

  React.useEffect(() => {
    const nodes = selectedIds.map((id) => layerRef.current.findOne("#" + id));
    trRef.current.nodes(nodes);
    // console.log("trRef",trRef)
  }, [selectedIds]);

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShapes([]);
    }
  };

  const selectionRectRef = React.useRef();
  const selection = React.useRef({
    visible: false,
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0
  });

  const updateSelectionRect = () => {
    const node = selectionRectRef.current;
    node.setAttrs({
      visible: selection.current.visible,
      x: Math.min(selection.current.x1, selection.current.x2),
      y: Math.min(selection.current.y1, selection.current.y2),
      width: Math.abs(selection.current.x1 - selection.current.x2),
      height: Math.abs(selection.current.y1 - selection.current.y2),
      fill: "rgba(0, 161, 255, 0.3)"
    });
    node.getLayer().batchDraw();
  };

  const oldPos = React.useRef(null);
  const onMouseDown = (e) => {

    down = down+1
    const isElement = e.target.findAncestor(".elements-container");
    const isTransformer = e.target.findAncestor("Transformer");
    if (isElement || isTransformer) {
      return;
    }

    const pos = e.target.getStage().getPointerPosition();
    selection.current.visible = true;
    selection.current.x1 = pos.x;
    selection.current.y1 = pos.y;
    selection.current.x2 = pos.x;
    selection.current.y2 = pos.y;
    updateSelectionRect();
  };

  const onMouseMove = (e) => {
    if (!selection.current.visible) {
      return;
    }
    const pos = e.target.getStage().getPointerPosition();
    selection.current.x2 = pos.x;
    selection.current.y2 = pos.y;
    updateSelectionRect();
  };

  const onMouseUp = () => {
    console.log("onMouseUp")
    oldPos.current = null;
    selection.current.visible = false;
    const { x1, x2, y1, y2 } = selection.current;
    const moved = x1 !== x2 || y1 !== y2;
    if (!moved) {
      updateSelectionRect();
      return;
    }
    const selBox = selectionRectRef.current.getClientRect();

    const elements = [];
    layerRef.current.find(".rectangle").forEach((elementNode) => {
      const elBox = elementNode.getClientRect();
      if (Konva.Util.haveIntersection(selBox, elBox)) {
        elements.push(elementNode);
      }
    });

    selectShapes(elements.map((el) => el.id()));
    updateSelectionRect();
  };

  const onClickTap = (e) => {
    // if we are selecting with rect, do nothing
    const { x1, x2, y1, y2 } = selection.current;
    const moved = x1 !== x2 || y1 !== y2;
    if (moved) {
      return;
    }
    let stage = e.target.getStage();
    let layer = layerRef.current;
    let tr = trRef.current;
    // if click on empty area - remove all selections
    if (e.target === stage) {
      selectShapes([]);
      return;
    }

    // do nothing if clicked NOT on our rectangles
    if (!e.target.hasName("rectangle")) {
      return;
    }

    // do we pressed shift or ctrl?
    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
    const isSelected = tr.nodes().indexOf(e.target) >= 0;

    if (!metaPressed && !isSelected) {
      // if no key pressed and the node is not selected
      // select just one
      selectShapes([e.target.id()]);
    } else if (metaPressed && isSelected) {
      // if we pressed keys and node was selected
      // we need to remove it from selection:
      selectShapes((oldShapes) => {
        return oldShapes.filter((oldId) => oldId !== e.target.id());
      });
    } else if (metaPressed && !isSelected) {
      // add the node into selection
      selectShapes((oldShapes) => {
        return [...oldShapes, e.target.id()];
      });
    }
    layer.draw();
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onTouchStart={checkDeselect}
      onClick={onClickTap}
      onTap={onClickTap}
    >
      <Layer ref={layerRef}>
        {rectangles.map((rect, i) => {
          return (
            <Rectangle
              key={i}
              getKey={i}
              shapeProps={rect}
              onChange={(newAttrs) => {
                const rects = rectangles.slice();
                rects[i] = newAttrs;
                setRectangles(rects);
              }}
            />
          );
        })}

        <Transformer
          // ref={trRef.current[getKey]}
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
        <Rect fill="rgba(0,0,255,0.5)" ref={selectionRectRef} />
      </Layer>
    </Stage>
  );
};

export default TransformDrag