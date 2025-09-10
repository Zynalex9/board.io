"use client";
import { KonvaEventObject } from "konva/lib/Node";
import React, { useCallback, useRef, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { CircleProps, DrawType, RectangleProps } from "@/types/allTypes";
import { Circle, Layer, Rect, Stage, Transformer } from "react-konva";
import { v4 as uuidv4 } from "uuid";
export default function page() {
  const [drawAction, setDrawAction] = useState<DrawType>(DrawType.Select);
  const [rectangles, setRectangles] = useState<RectangleProps[]>([]);
  const [circles, setCircles] = useState<CircleProps[]>([]);
  const stageRef = useRef<any>(null);
  const currentShapeRef = useRef<string>("");
  const isPaintRef = useRef(false);
  const transformerRef = useRef<any>(null);
  const onStageMouseDown = useCallback(async () => {
    if (drawAction === DrawType.Select) return;
    isPaintRef.current = true;
    const stage = stageRef.current;
    const pos = stage.getPointerPosition();
    const x = pos.x || 0;
    const y = pos.y || 0;
    const id = uuidv4();
    currentShapeRef.current = id;
    switch (drawAction) {
      case DrawType.Rectangle: {
        setRectangles((prevRectangle) => [
          ...prevRectangle,
          {
            x,
            y,
            width: 1,
            height: 1,
            id,
            fill: "transparent",
            stroke: "white",
            strokeWidth: 2,
          },
        ]);
        break;
      }
      case DrawType.Circle: {
        setCircles((prevCircles) => [
          ...prevCircles,
          {
            x,
            y,
            radius: 1,
            id,
            fill: "transparent",
            stroke: "white",
            strokeWidth: 2,
          },
        ]);
        break;
      }
    }
  }, [drawAction]);

  const onStageMouseMove = useCallback(async () => {
    if (drawAction === DrawType.Select || !isPaintRef.current) return;
    const stage = stageRef?.current;
    const id = currentShapeRef.current;
    const pos = stage?.getPointerPosition();
    const x = pos?.x || 0;
    const y = pos?.y || 0;
    switch (drawAction) {
      case DrawType.Rectangle: {
        setRectangles((prevRect) =>
          prevRect.map((prevRectangle) =>
            prevRectangle.id === id
              ? {
                  ...prevRectangle,
                  height: y - prevRectangle.y,
                  width: x - prevRectangle.x,
                }
              : prevRectangle
          )
        );
      }
      case DrawType.Circle: {
        setCircles((circles) =>
          circles.map((circle) =>
            circle.id === id
              ? {
                  ...circle,
                  radius: ((x - circle.x) ** 2 + (y - circle.y) ** 2) ** 0.5,
                }
              : circle
          )
        );
        break;
      }
    }
  }, [drawAction]);
  const onStageMouseUp = useCallback(() => {
    isPaintRef.current = false;
  }, []);
  const onShapeClick = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      if (drawAction !== DrawType.Select) return;
      const currentTarget = e.currentTarget;
      transformerRef?.current?.node(currentTarget);
    },
    [drawAction]
  );
  const isDraggable = drawAction === DrawType.Select;

  const onBgClick = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      transformerRef?.current?.nodes([]);
    },
    [drawAction]
  );
  return (
    <div className="relative min-h-screen bg-primary-bg2">
      <div className="fixed left-5 top-10 z-50 pointer-events-auto">
        <Sidebar drawAction={drawAction} setDrawAction={setDrawAction} />
      </div>
      <div className="w-full h-screen overflow-auto minimal-scrollbar">
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          className="bg-primary-bg2"
          ref={stageRef}
          onMouseDown={onStageMouseDown}
          onMouseUp={onStageMouseUp}
          onMouseMove={onStageMouseMove}
          onClick={onBgClick}
        >
          <Layer>
            {rectangles.length > 0 &&
              rectangles.map((rectangle) => (
                <Rect
                  {...rectangle}
                  onDblClick={onShapeClick}
                  draggable={isDraggable}
                  cornerRadius={4}
                />
              ))}
            {circles.length > 0 &&
              circles.map((circle) => (
                <Circle
                  {...circle}
                  draggable={isDraggable}
                  onDblClick={onShapeClick}
                  cornerRadius={4}
                />
              ))}
          <Transformer ref={transformerRef} />
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
