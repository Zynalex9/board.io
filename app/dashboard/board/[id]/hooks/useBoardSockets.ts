import { Shape } from "@/types/allTypes";
import { useEffect } from "react";
import { Socket } from "socket.io-client";

export const useBoardSocket = (
  socket: Socket | null,
  boardId: string,
  setShapes: React.Dispatch<React.SetStateAction<Shape[]>>,
  setSelectedShape: (id: string) => void
) => {
  useEffect(() => {
    if (!socket) return;

    const handleDragged = (updatedShape: Shape) => {
      setShapes((prev) => prev.map((s) => (s.id === updatedShape.id ? updatedShape : s)));
    };

    const handleDelete = (shapeId: string) => {
      setShapes((prev) => prev.filter((s) => s.id !== shapeId));
      setSelectedShape("");
    };

    const handleLiveDrag = (payload: any) => {
      const shape: Shape = payload?.shape ?? payload;
      if (!shape?.id) return;
      setShapes((prev) => prev.map((s) => (s.id === shape.id ? shape : s)));
    };

    const handleNewShape = (lastElem: Shape) => {
      setShapes((prev) => (prev.some((pv) => pv.id === lastElem.id) ? prev : [...prev, lastElem]));
    };

    socket.on("shapeDragged", handleDragged);
    socket.on("shapeDeleted", handleDelete);
    socket.on("shapeDragging", handleLiveDrag);
    socket.on("newShape", handleNewShape);

    return () => {
      socket.off("shapeDragged", handleDragged);
      socket.off("shapeDeleted", handleDelete);
      socket.off("shapeDragging", handleLiveDrag);
      socket.off("newShape", handleNewShape);
    };
  }, [socket, boardId, setShapes, setSelectedShape]);
};
