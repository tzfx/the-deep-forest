import { useCallback, useRef } from "react";
import * as fabric from "fabric";
import { Canvas } from "./Canvas";

const FabricCanvas = () => {
  const ref = useRef<fabric.Canvas>(null);
  const onLoad = useCallback(
    (canvas: fabric.Canvas) => {
      canvas.setDimensions({
        width: window.innerWidth,
        height: 500,
      });
      canvas.isDrawingMode = true;
      const brush = new fabric.PencilBrush(canvas);
      brush.width = 5;
      canvas.freeDrawingBrush = brush;
      canvas.enablePointerEvents = true;
      
      let isDragging = false;
      let [lastPosX, lastPosY] = [0,0];

      canvas.__onMouseWheel = (e: WheelEvent) => {
        var delta = e.deltaY;
        var zoom = canvas.getZoom();
        zoom *= 0.999 ** delta;
        if (zoom > 20) zoom = 20;
        if (zoom < 0.01) zoom = 0.01;
        canvas.zoomToPoint({ x: e.offsetX, y: e.offsetY } as fabric.Point, zoom);
        e.preventDefault();
        e.stopPropagation();
      }

      canvas.__onMouseDown = (e: MouseEvent) => {
        if (e.altKey === true) {
          canvas.isDrawingMode = false;
          isDragging = true;
          lastPosX = e.clientX;
          lastPosY = e.clientY;
        }
      };
      canvas.__onMouseMove = (e: MouseEvent) => {
        if (isDragging) {
          canvas.isDrawingMode = false;
          var vpt = canvas.viewportTransform;
          vpt[4] += e.clientX - lastPosX;
          vpt[5] += e.clientY - lastPosY;
          canvas.requestRenderAll();
          lastPosX = e.clientX;
          lastPosY = e.clientY;
        }
      };
      canvas.__onMouseUp = (opt) => {
        // on mouse up we want to recalculate new interaction
        // for all objects, so we call setViewportTransform
        // canvas.setViewportTransform(canvas.viewportTransform);
        isDragging = false;
        canvas.isDrawingMode = true;
      };
          
      
      // const textValue = "fabric.js sandbox";
      // const text = new fabric.Textbox(textValue, {
      //   originX: "center",
      //   top: 20,
      //   textAlign: "center",
      //   styles: fabric.util.stylesFromArray(
      //     [
      //       {
      //         style: {
      //           fontWeight: "bold",
      //           fontSize: 64,
      //         },
      //         start: 0,
      //         end: 9,
      //       },
      //     ],
      //     textValue
      //   ),
      // });
      // canvas.add(text);
      // canvas.centerObjectH(text);

      // const animate = (toState: number) => {
      //   text.animate(
      //     { scaleX: Math.max(toState, 0.1) * 2 },
      //     {
      //       onChange: () => canvas.renderAll(),
      //       onComplete: () => animate(Number(!toState)),
      //       duration: 1000,
      //       easing: toState
      //         ? fabric.util.ease.easeInOutQuad
      //         : fabric.util.ease.easeInOutSine,
      //     }
      //   );
      // };
      // animate(1);
    },
    []
  );

  return <Canvas ref={ref} onLoad={onLoad}></Canvas>;
};

export { FabricCanvas };
