import { useCallback, useRef, useState } from "react";
import * as fabric from "fabric";
import { Canvas } from "./Canvas";
import { Button, Input, Rail, Segment } from "semantic-ui-react";

const FabricCanvas = () => {
  const ref = useRef<fabric.Canvas>(null);

  const [mode, setMode] = useState<"move" | "draw" | "text">("draw");

  const onLoad = useCallback((canvas: fabric.Canvas) => {
    canvas.setDimensions({
      width: window.innerWidth / 1.75,
      height: 550,
    });
    canvas.isDrawingMode = true;
    const brush = new fabric.PencilBrush(canvas);
    brush.width = 5;
    canvas.freeDrawingBrush = brush;
    canvas.enablePointerEvents = true;
    canvas.renderOnAddRemove = true;

    // generate grid
    var grid = 50;
    var unitScale = 10;
    var canvasWidth = 100 * unitScale;
    var canvasHeight = 100 * unitScale;

    for (var i = -1 * canvasHeight; i < (canvasWidth * 2) / grid; i++) {
      canvas.add(
        new fabric.Line(
          [i * grid, -1 * canvasHeight, i * grid, canvasHeight * 2],
          {
            stroke: "#ccc",
            selectable: false,
          }
        )
      );
      canvas.add(
        new fabric.Line(
          [-1 * canvasWidth, i * grid, canvasWidth * 2, i * grid],
          {
            stroke: "#ccc",
            selectable: false,
          }
        )
      );
    }

    // Setup zoom
    canvas.on("mouse:wheel", ({ e }) => {
      var delta = e.deltaY;
      var zoom = canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      canvas.zoomToPoint({ x: e.offsetX, y: e.offsetY } as fabric.Point, zoom);
      e.preventDefault();
      e.stopPropagation();
    });

    // alt/option to pan
    let isDragging = false;
    let [lastPosX, lastPosY] = [0, 0];

    // Note: panning while draw mode is on doesn't work.
    canvas.on("mouse:down", ({ e }) => {
      if (e.altKey === true) {
        isDragging = true;
        canvas.selection = false;
        lastPosX = (e as MouseEvent).clientX;
        lastPosY = (e as MouseEvent).clientY;
      }
    });
    canvas.on("mouse:move", ({ e }) => {
      if (isDragging) {
        let vpt = canvas.viewportTransform;
        vpt[4] += (e as MouseEvent).clientX - lastPosX;
        vpt[5] += (e as MouseEvent).clientY - lastPosY;
        canvas.requestRenderAll();
        lastPosX = (e as MouseEvent).clientX;
        lastPosY = (e as MouseEvent).clientY;
      }
    });
    canvas.on("mouse:up", () => {
      // on mouse up we want to recalculate new interaction
      // for all objects, so we call setViewportTransform
      canvas.setViewportTransform(canvas.viewportTransform);
      isDragging = false;
      canvas.selection = true;
    });
  }, []);

  return (
    <Segment>
      <Rail position="right" attached>
        <div style={{ flex: 1, width: "30px", flexDirection: "column" }}>
          <Button
            icon="save"
            size="big"
            onClick={() => {
              const canvas = ref.current as fabric.Canvas;
              const a = document.createElement("a");
              const href = canvas.toDataURL({
                multiplier: 4,
                format: "png",
              });
              a.href = href;
              const now = new Date();
              a.download = `the-dark-forest_${now.getFullYear()}-${now.getMonth()}-${now.getDate()}.png`;
              a.click();
              a.remove();
            }}
          ></Button>
          <div>&nbsp;</div>
          <Button
            icon="expand"
            size="big"
            active={mode === "move"}
            onClick={() => {
              setMode("move");
              (ref.current as fabric.Canvas).isDrawingMode = false;
            }}
          ></Button>
          <Button
            size="big"
            icon="trash"
            onClick={() => {
              const canvas = ref.current as fabric.Canvas;
              canvas.remove(...canvas.getActiveObjects());
            }}
          ></Button>
          <Button
            icon="pencil"
            active={mode === "draw"}
            size="big"
            onClick={() => {
              setMode("draw");
              (ref.current as fabric.Canvas).isDrawingMode = true;
            }}
          ></Button>
          <Input
            onChange={(_, d) => {
              const brush = (ref.current as fabric.Canvas).freeDrawingBrush;
              (brush as fabric.BaseBrush).color = d.value;
            }}
            type="color"
            size="big"
          ></Input>
          <Button
            icon="font"
            size="big"
            onClick={() => {
              const canvas = ref.current as fabric.Canvas;
              setMode("move");
              canvas.isDrawingMode = false;
              const text = new fabric.Textbox("text", {
                fill: canvas.freeDrawingBrush?.color,
              });
              canvas.viewportCenterObject(text);
              canvas.add(text);
            }}
          ></Button>
        </div>
      </Rail>
      <Canvas ref={ref} onLoad={onLoad}></Canvas>
    </Segment>
  );
};

export default FabricCanvas;
