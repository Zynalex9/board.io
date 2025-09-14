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
import { useParams } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { useGetSingleBoard } from "@/hooks/getWhiteboard";
import { deleteShape, handleShapeUpdate } from "@/lib/helper";
import { useSocket } from "@/context/socket.context";
import { useBoardSocket } from "./hooks/useBoardSockets";
import { TextEditorOverlay } from "./TextEditingOverlay";
import {
  handleOnShapeClick,
  handleOnStageMouseUp,
  handleStageMouseDown,
} from "./functions";
import { EditorHeader } from "./Header";
import { Doc } from "./Doc/Doc";

interface Shape {
  id: string;
  type: DrawType;
  properties: any;
}

export default function page() {
  const { id: boardId } = useParams();
  const {
    data: board,
    isLoading: boardLoading,
    error: boardError,
  } = useGetSingleBoard(boardId as string);
  const { socket } = useSocket();
  const [selectedShape, SetSelectedShape] = useState<string>("");
  const [activeTab, setActiveTab] = useState("Both");
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
    handleStageMouseDown(
      drawAction,
      stageRef,
      currentShapeRef,
      setShapes,
      isPaintRef
    );
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
    handleOnStageMouseUp(
      drawAction,
      shapes,
      boardId as string,
      isPaintRef,
      socket,
      setDrawAction,
      user
    );
  }, [shapes]);
  const onShapeClick = useCallback(
    (e: KonvaEventObject<MouseEvent>, shapeId: string) => {
      handleOnShapeClick(
        e,
        shapeId,
        drawAction,
        SetSelectedShape,
        transformerRef
      );
    },
    [drawAction]
  );
  const onStageClick = useCallback((e: KonvaEventObject<MouseEvent>) => {
    if (e.target === e.target.getStage()) {
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer().batchDraw();
    }
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
    if (!socket) return;
    socket.emit("joinedBoard", boardId);
  }, [socket, boardId]);
  useBoardSocket(socket, boardId as string, setShapes, SetSelectedShape);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete") {
        transformerRef.current.nodes([]);
        deleteShape(selectedShape, boardId as string, socket, setShapes);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedShape]);

  const dragEmitRef = useRef<{ lastTime: number; timeout?: number }>({
    lastTime: 0,
  });

  const emitShapeDragging = useCallback(
    (shape: Shape) => {
      if (!socket) return;
      const now = Date.now();
      const diff = now - dragEmitRef.current.lastTime;
      const THROTTLE_MS = 50;

      if (diff >= THROTTLE_MS) {
        socket.emit("shapeDragging", { shape, boardId });
        dragEmitRef.current.lastTime = now;
      } else {
        if (dragEmitRef.current.timeout) {
          clearTimeout(dragEmitRef.current.timeout);
        }
        dragEmitRef.current.timeout = window.setTimeout(() => {
          socket.emit("shapeDragging", { shape, boardId });
          dragEmitRef.current.lastTime = Date.now();
        }, THROTTLE_MS - diff) as unknown as number;
      }
    },
    [socket, boardId]
  );

  const handleDragMove = useCallback(
    (e: KonvaEventObject<DragEvent>, shape: Shape) => {
      const node = e.target;
      const updated: Shape = {
        ...shape,
        properties: {
          ...shape.properties,
          x: node.x(),
          y: node.y(),
        },
      };
      setShapes((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
      emitShapeDragging(updated);
    },
    [emitShapeDragging]
  );

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
      <div>
        {editingText && (
          <TextEditorOverlay
            editingText={editingText}
            setEditingText={setEditingText}
            setShapes={setShapes}
            key={editingText.id}
          />
        )}
        <div
          style={{
            width: "100vw",
            height: "100vh",
            overflow: "scroll",
            background: "#171717",
          }}
          className="minimal-scrollbar"
        >
          <div className="fixed top-0 left-0 z-50 w-[99.2vw]">
            <EditorHeader activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          {activeTab === "Document" && (
            <div className="bg-red-500 w-full h-screen"></div>
          )}
          {activeTab === "Both" && (
            <div className="flex w-full h-screen">
            <Doc/>

              <div className="flex-1 relative bg-[#171717] overflow-auto">
                <div className="fixed left-[40%] top-15 z-50 pointer-events-auto">
                  <Sidebar
                    drawAction={drawAction}
                    setDrawAction={setDrawAction}
                  />
                </div>
                <div className="w-[5000px] h-[5000px]">
                  <Stage
                    width={5000}
                    height={5000}
                    ref={stageRef}
                    onMouseDown={onStageMouseDown}
                    onMouseMove={onStageMouseMove}
                    onMouseUp={onStageMouseUp}
                    onClick={onStageClick}
                  >
                    <Layer>
                      {shapes.map((shape) => {
                        const props = {
                          id: shape.id,
                          ...shape.properties,
                          draggable: isDraggable,
                          onClick: (e: KonvaEventObject<MouseEvent>) =>
                            onShapeClick(e, shape.id),
                          onDblClick:
                            shape.type === DrawType.Text
                              ? onTextDblClick
                              : undefined,
                          onDragEnd: (e: KonvaEventObject<DragEvent>) =>
                            handleShapeUpdate(
                              e,
                              shape.id,
                              false,
                              setShapes,
                              socket,
                              boardId as string
                            ),
                          onDragMove: (e: KonvaEventObject<DragEvent>) =>
                            handleDragMove(e, shape),
                        };

                        switch (shape.type) {
                          case DrawType.Arrow:
                            return <Arrow key={shape.id} {...props} />;
                          case DrawType.Rectangle:
                            return <Rect key={shape.id} {...props} />;
                          case DrawType.Circle:
                            return <Circle key={shape.id} {...props} />;
                          case DrawType.Line:
                            return <Line key={shape.id} {...props} />;
                          case DrawType.Scribble:
                            return (
                              <Line
                                key={shape.id}
                                {...props}
                                lineJoin="round"
                                lineCap="round"
                              />
                            );
                          case DrawType.Text:
                            return (
                              <Text key={shape.id} {...props} id={shape.id} />
                            );
                          default:
                            return null;
                        }
                      })}
                      <Transformer ref={transformerRef} />
                    </Layer>
                  </Stage>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Canvas" && (
            <>
              <div className="fixed left-5 top-15 z-50 pointer-events-auto">
                <Sidebar
                  drawAction={drawAction}
                  setDrawAction={setDrawAction}
                />
              </div>
              <div style={{ width: 5000, height: 5000 }}>
                <Stage
                  width={5000}
                  height={5000}
                  ref={stageRef}
                  onMouseDown={onStageMouseDown}
                  onMouseMove={onStageMouseMove}
                  onMouseUp={onStageMouseUp}
                  onClick={onStageClick}
                >
                  <Layer>
                    {shapes.map((shape) => {
                      const props = {
                        id: shape.id,
                        ...shape.properties,
                        draggable: isDraggable,
                        onClick: (e: KonvaEventObject<MouseEvent>) =>
                          onShapeClick(e, shape.id),
                        onDblClick:
                          shape.type === DrawType.Text
                            ? onTextDblClick
                            : undefined,
                        onDragEnd: (e: KonvaEventObject<DragEvent>) => {
                          handleShapeUpdate(
                            e,
                            shape.id,
                            false,
                            setShapes,
                            socket,
                            boardId as string
                          );
                        },
                        onDragMove: (e: KonvaEventObject<DragEvent>) =>
                          handleDragMove(e, shape),
                      };

                      switch (shape.type) {
                        case DrawType.Arrow:
                          return <Arrow key={shape.id} {...props} />;
                        case DrawType.Rectangle:
                          return <Rect key={shape.id} {...props} />;
                        case DrawType.Circle:
                          return <Circle key={shape.id} {...props} />;
                        case DrawType.Line:
                          return <Line key={shape.id} {...props} />;
                        case DrawType.Scribble:
                          return (
                            <Line
                              key={shape.id}
                              {...props}
                              lineJoin="round"
                              lineCap="round"
                            />
                          );
                        case DrawType.Text:
                          return (
                            <Text key={shape.id} {...props} id={shape.id} />
                          );
                        default:
                          return null;
                      }
                    })}
                    <Transformer ref={transformerRef} />
                  </Layer>
                </Stage>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
