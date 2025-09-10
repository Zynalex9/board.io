"use client";
import { KonvaEventObject } from "konva/lib/Node";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { DrawType } from "@/types/allTypes";
import {
  Stage,
  Layer,
  Rect,
  Circle,
  Line,
  Arrow,
  Text,
  Transformer,
} from "react-konva";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { getSingleBoard, saveBoardElement } from "@/Queries/board";
import { useGetSingleBoard } from "@/hooks/getWhiteboard";

interface Shape {
  id: string;
  type: DrawType;
  properties: any;
}

export default function page() {
  const { id: boardId } = useParams();
  const { data: board, isLoading:boardLoading, error:boardError } = useGetSingleBoard(boardId as string);
  const [drawAction, setDrawAction] = useState<DrawType>(DrawType.Select);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [editingText, setEditingText] = useState<{
    id: string;
    x: number;
    y: number;
    text: string;
  } | null>(null);
  const { data: user } = useUser();
  const stageRef = useRef<any>(null);
  const transformerRef = useRef<any>(null);
  const currentShapeRef = useRef<string>("");
  const isPaintRef = useRef(false);
  const onStageMouseDown = useCallback(() => {
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
  }, [drawAction]);
  const onStageMouseMove = useCallback(() => {
    if (drawAction === DrawType.Select || !isPaintRef.current) return;

    const stage = stageRef.current;
    const pos = stage.getPointerPosition();
    const x = pos?.x || 0;
    const y = pos?.y || 0;
    const id = currentShapeRef.current;
    setShapes((prev) =>
      prev.map((shape) => {
        if (shape.id !== id) return shape;

        switch (shape.type) {
          case DrawType.Rectangle:
            return {
              ...shape,
              properties: {
                ...shape.properties,
                width: x - shape.properties.x,
                height: y - shape.properties.y,
              },
            };
          case DrawType.Circle:
            return {
              ...shape,
              properties: {
                ...shape.properties,
                radius: Math.sqrt(
                  (x - shape.properties.x) ** 2 + (y - shape.properties.y) ** 2
                ),
              },
            };
          case DrawType.Line:
          case DrawType.Arrow:
            return {
              ...shape,
              properties: {
                ...shape.properties,
                points: [
                  shape.properties.points[0],
                  shape.properties.points[1],
                  x,
                  y,
                ],
              },
            };
          case DrawType.Scribble:
            return {
              ...shape,
              properties: {
                ...shape.properties,
                points: [...shape.properties.points, x, y],
              },
            };
          default:
            return shape;
        }
      })
    );
  }, [drawAction]);
  const onStageMouseUp = useCallback(() => {
    isPaintRef.current = false;
    if(drawAction === DrawType.Select) return;
    console.log(shapes);
    const lastElem = shapes[shapes.length - 1];
    console.log(lastElem);
    saveBoardElement(
      boardId as string,
      lastElem,
      lastElem.type.toLocaleLowerCase(),
      user?.id || ""
    );
  }, [shapes]);
  const onShapeClick = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      if (drawAction !== DrawType.Select) return;
      transformerRef.current.nodes([e.currentTarget]);
      transformerRef.current.getLayer().batchDraw();
    },
    [drawAction]
  );
  const onBgClick = useCallback(() => {
    transformerRef.current.nodes([]);
    transformerRef.current.getLayer().batchDraw();
  }, []);
  const onTextDblClick = useCallback((e: KonvaEventObject<MouseEvent>) => {
    const node = e.target;
    const absPos = node.getAbsolutePosition();
    setEditingText({
      id: node.attrs.id,
      x: absPos.x,
      y: absPos.y,
      text: (node as import("konva/lib/shapes/Text").Text).text(),
    });
  }, []);
useEffect(() => {
  if (board && Array.isArray(board)) {
    const elements: Shape[] = board.map((elem: any) => ({
      id: elem.id,
      type: elem.type as DrawType,
      properties: elem.properties.properties, 
    }));
    setShapes(elements);
  }
}, [board]);
useEffect(() => {
  console.log(shapes);
},[shapes])
  const isDraggable = drawAction === DrawType.Select;
  if (boardLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-primary-bg2 text-white">
        Loading board...
      </div>
    );
  }
  return (
    <div className="relative min-h-screen bg-primary-bg2">
      <div className="fixed left-5 top-10 z-50 pointer-events-auto">
        <Sidebar drawAction={drawAction} setDrawAction={setDrawAction} />
      </div>

      {editingText && (
        <textarea
          className="absolute bg-transparent border border-gray-400 text-white outline-none resize-none"
          style={{
            top: editingText.y,
            left: editingText.x,
            fontSize: "18px",
            color: "white",
          }}
          value={editingText.text}
          autoFocus
          onChange={(e) =>
            setEditingText((prev) =>
              prev ? { ...prev, text: e.target.value } : null
            )
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setShapes((prev) =>
                prev.map((s) =>
                  s.id === editingText.id
                    ? {
                        ...s,
                        properties: { ...s.properties, text: editingText.text },
                      }
                    : s
                )
              );
              setEditingText(null);
            }
          }}
          onBlur={() => {
            setShapes((prev) =>
              prev.map((s) =>
                s.id === editingText.id
                  ? {
                      ...s,
                      properties: { ...s.properties, text: editingText.text },
                    }
                  : s
              )
            );
            setEditingText(null);
          }}
        />
      )}

      <div className="w-full h-screen overflow-auto minimal-scrollbar">
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          ref={stageRef}
          onMouseDown={onStageMouseDown}
          onMouseMove={onStageMouseMove}
          onMouseUp={onStageMouseUp}
          onClick={onBgClick}
        >
          <Layer>
            {shapes.map((shape) => {
              const props = {
                key: shape.id,
                ...shape.properties,
                draggable: isDraggable,
                onDblClick:
                  shape.type === DrawType.Text ? onTextDblClick : onShapeClick,
              };
              switch (shape.type) {
                case DrawType.Rectangle:
                  return <Rect {...props} />;
                case DrawType.Circle:
                  return <Circle {...props} />;
                case DrawType.Line:
                  return <Line {...props} />;
                case DrawType.Arrow:
                  return <Arrow {...props} />;
                case DrawType.Scribble:
                  return <Line {...props} lineJoin="round" lineCap="round" />;
                case DrawType.Text:
                  return <Text {...props} id={shape.id} />;
                default:
                  return null;
              }
            })}
            <Transformer ref={transformerRef} />
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
