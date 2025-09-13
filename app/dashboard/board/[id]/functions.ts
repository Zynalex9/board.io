import { KonvaEventObject } from "konva/lib/Node";
import { DrawType, Shape } from "@/types/allTypes";
import React, { RefObject } from "react";
import { v4 as uuidv4 } from "uuid";
import { saveBoardElement } from "@/Queries/board";
import { Socket } from "socket.io-client";

export const handleStageMouseDown = (
  drawAction: string,
  stageRef: RefObject<any>,
  currentShapeRef: RefObject<string>,
  setShapes: React.Dispatch<React.SetStateAction<Shape[]>>,
  isPaintRef: React.RefObject<boolean>
) => {
  if (drawAction === DrawType.Select) return;
  const stage = stageRef.current;
  const pos = stage.getPointerPosition();
  const x = pos?.x || 0;
  const y = pos?.y || 0;
  const id = uuidv4();
  currentShapeRef.current = id;

  let newShape: Shape;

  switch (drawAction) {
    case DrawType.Rectangle:
      newShape = {
        id,
        type: DrawType.Rectangle,
        properties: {
          x,
          y,
          width: 1,
          height: 1,
          stroke: "white",
          strokeWidth: 2,
          fill: "transparent",
        },
      };
      break;
    case DrawType.Circle:
      newShape = {
        id,
        type: DrawType.Circle,
        properties: {
          x,
          y,
          radius: 1,
          stroke: "white",
          strokeWidth: 2,
          fill: "transparent",
        },
      };
      break;
    case DrawType.Line:
      newShape = {
        id,
        type: DrawType.Line,
        properties: { points: [x, y, x, y], stroke: "white", strokeWidth: 2 },
      };
      break;
    case DrawType.Arrow:
      newShape = {
        id,
        type: DrawType.Arrow,
        properties: {
          points: [x, y, x, y],
          stroke: "white",
          strokeWidth: 2,
          pointerLength: 10,
          pointerWidth: 10,
        },
      };
      break;
    case DrawType.Scribble:
      newShape = {
        id,
        type: DrawType.Scribble,
        properties: {
          points: [x, y],
          stroke: "white",
          strokeWidth: 2,
          lineCap: "round",
          lineJoin: "round",
        },
      };
      break;
    case DrawType.Text:
      newShape = {
        id,
        type: DrawType.Text,
        properties: {
          x,
          y,
          text: "Double-click to edit",
          fontSize: 18,
          fill: "white",
          draggable: true,
        },
      };
      break;
    default:
      return;
  }

  setShapes((prev) => [...prev, newShape]);
  isPaintRef.current = drawAction !== DrawType.Text;
};
export const handleOnStageMouseUp = (
  drawAction: string,
  shapes: Shape[],
  boardId: string,
  isPaintRef: React.RefObject<boolean>,
  socket: Socket | null,
  setDrawAction: React.Dispatch<React.SetStateAction<DrawType>>,
  user: any
) => {
  isPaintRef.current = false;
  if (drawAction === DrawType.Select) return;
  const lastElem = shapes[shapes.length - 1];
  setDrawAction(DrawType.Select);
  socket?.emit("newShape", { lastElem, boardId });
  saveBoardElement(
    boardId as string,
    lastElem,
    lastElem.type.toLocaleLowerCase(),
    user?.id || ""
  );
};
export const handleOnShapeClick = (
  e: KonvaEventObject<MouseEvent>,
  shapeId: string,
  drawAction: string,
  SetSelectedShape: React.Dispatch<React.SetStateAction<string>>,
  transformerRef: React.RefObject<any>
) => {
  if (drawAction !== DrawType.Select) return;
  SetSelectedShape(shapeId);
  transformerRef.current.nodes([e.target]);
  transformerRef.current.getLayer().batchDraw();
};
