"use client";
import { KonvaEventObject } from "konva/lib/Node";
import React, { useCallback, useRef, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { CircleProps, DrawType, RectangleProps } from "@/types/allTypes";
import {
  Circle,
  Layer,
  Rect,
  Stage,
  Line,
  Arrow,
  Text,
  Transformer,
} from "react-konva";

import { v4 as uuidv4 } from "uuid";
export default function page() {
  const [drawAction, setDrawAction] = useState<DrawType>(DrawType.Select);
  const [rectangles, setRectangles] = useState<RectangleProps[]>([]);
  const [circles, setCircles] = useState<CircleProps[]>([]);
  const [lines, setLines] = useState<any[]>([]);
  const [arrows, setArrows] = useState<any[]>([]);
  const [texts, setTexts] = useState<any[]>([]);
  const [editingText, setEditingText] = useState<{
    id: string;
    x: number;
    y: number;
    text: string;
  } | null>(null);
  const [scribbles, setScribbles] = useState<any[]>([]);

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
        setRectangles((prev) => [
          ...prev,
          {
            id,
            x,
            y,
            width: 1,
            height: 1,
            fill: "transparent",
            stroke: "white",
            strokeWidth: 2,
          },
        ]);
        break;
      }
      case DrawType.Circle: {
        setCircles((prev) => [
          ...prev,
          {
            id,
            x,
            y,
            radius: 1,
            fill: "transparent",
            stroke: "white",
            strokeWidth: 2,
          },
        ]);
        break;
      }
      case DrawType.Line: {
        setLines((prev) => [
          ...prev,
          { id, points: [x, y, x, y], stroke: "white", strokeWidth: 2 },
        ]);
        break;
      }
      case DrawType.Arrow: {
        setArrows((prev) => [
          ...prev,
          {
            id,
            points: [x, y, x, y],
            stroke: "white",
            strokeWidth: 2,
            pointerLength: 10,
            pointerWidth: 10,
          },
        ]);
        break;
      }
      case DrawType.Scribble: {
        setScribbles((prev) => [
          ...prev,
          {
            id,
            points: [x, y],
            stroke: "white",
            strokeWidth: 2,
            lineCap: "round",
            lineJoin: "round",
          },
        ]);
        break;
      }
      case DrawType.Text: {
        setTexts((prev) => [
          ...prev,
          {
            id,
            x,
            y,
            text: "Double-click to edit",
            fontSize: 18,
            fill: "white",
            draggable: true,
          },
        ]);
        isPaintRef.current = false;
        setDrawAction(DrawType.Select);
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
        setRectangles((prev) =>
          prev.map((r) =>
            r.id === id ? { ...r, width: x - r.x, height: y - r.y } : r
          )
        );
        break;
      }
      case DrawType.Circle: {
        setCircles((prev) =>
          prev.map((c) =>
            c.id === id
              ? { ...c, radius: Math.sqrt((x - c.x) ** 2 + (y - c.y) ** 2) }
              : c
          )
        );
        break;
      }
      case DrawType.Line: {
        setLines((prev) =>
          prev.map((l) =>
            l.id === id ? { ...l, points: [l.points[0], l.points[1], x, y] } : l
          )
        );
        break;
      }
      case DrawType.Arrow: {
        setArrows((prev) =>
          prev.map((a) =>
            a.id === id ? { ...a, points: [a.points[0], a.points[1], x, y] } : a
          )
        );
        break;
      }
      case DrawType.Scribble: {
        setScribbles((prev) =>
          prev.map((s) =>
            s.id === id ? { ...s, points: [...s.points, x, y] } : s
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
  const onTextDblClick = useCallback((e: KonvaEventObject<MouseEvent>) => {
    const node = e.target;
    const absPos = node.getAbsolutePosition();
    setEditingText({
      id: node.attrs.id,
      x: absPos.x,
      y: absPos.y,
      text: '',
    });
  }, []);

  return (
    <div className="relative min-h-screen bg-primary-bg2">
      <div className="fixed left-5 top-10 z-50 pointer-events-auto">
        <Sidebar drawAction={drawAction} setDrawAction={setDrawAction} />
      </div>
      <div className="w-full h-screen overflow-auto minimal-scrollbar">
        {editingText && (
          <textarea
            className="absolute bg-transparent border border-gray-400 text-white outline-none resize-none"
            style={{
              top: editingText.y,
              left: editingText.x,
              position: "absolute",
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
                setTexts((prev) =>
                  prev.map((t) =>
                    t.id === editingText.id
                      ? { ...t, text: editingText.text }
                      : t
                  )
                );
                setEditingText(null);
              }
            }}
            onBlur={() => {
              setTexts((prev) =>
                prev.map((t) =>
                  t.id === editingText.id ? { ...t, text: editingText.text } : t
                )
              );
              setEditingText(null);
            }}
          />
        )}

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
            {rectangles.map((r) => (
              <Rect
                key={r.id}
                {...r}
                draggable={isDraggable}
                onDblClick={onShapeClick}
              />
            ))}
            {circles.map((c) => (
              <Circle
                key={c.id}
                {...c}
                draggable={isDraggable}
                onDblClick={onShapeClick}
              />
            ))}
            {lines.map((l) => (
              <Line
                key={l.id}
                {...l}
                draggable={isDraggable}
                onDblClick={onShapeClick}
              />
            ))}
            {arrows.map((a) => (
              <Arrow
                key={a.id}
                {...a}
                draggable={isDraggable}
                onDblClick={onShapeClick}
              />
            ))}
            {scribbles.map((s) => (
              <Line
                key={s.id}
                {...s}
                draggable={isDraggable}
                lineCap="round"
                lineJoin="round"
                onDblClick={onShapeClick}
              />
            ))}
            {texts.map((t) => (
              !editingText &&
              <Text
                key={t.id}
                {...t}
                id={t.id}
                draggable={isDraggable}
                onDblClick={onTextDblClick}
              />
            ))}

            <Transformer ref={transformerRef} />
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
