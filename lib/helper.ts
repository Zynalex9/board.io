import { KonvaEventObject } from "konva/lib/Node";
import { updateBoardElement } from "@/Queries/board";
import { DrawType, Shape } from "@/types/allTypes";
import { Socket } from "socket.io-client";

export const isActiveLink = (href: string, currentPath: string) => {
  return href === currentPath;
};

export const handleShapeUpdate = (
  e: KonvaEventObject<any>,
  id: string,
  isTransform: boolean = false,
  setShapes: React.Dispatch<React.SetStateAction<Shape[]>>,
  socket: Socket | null,
  boardId: string
) => {
  setShapes((prev) =>
    prev.map((shape) => {
      if (shape.id !== id) return shape;

      let updatedProps = { ...shape.properties };

      if (isTransform) {
        const node = e.target;
        if (shape.type === DrawType.Rectangle) {
          updatedProps = {
            ...updatedProps,
            x: node.x(),
            y: node.y(),
            width: node.width() * node.scaleX(),
            height: node.height() * node.scaleY(),
          };
          node.scaleX(1);
          node.scaleY(1);
        } else if (shape.type === DrawType.Circle) {
          updatedProps = {
            ...updatedProps,
            x: node.x(),
            y: node.y(),
            radius: node.radius() * node.scaleX(),
          };
          node.scaleX(1);
          node.scaleY(1);
        } else {
        }
      } else {
        const node = e.target;
        updatedProps = {
          ...updatedProps,
          x: node.x(),
          y: node.y(),
        };
      }
      socket?.emit("shapeDragged", {
        shape: { ...shape, properties: updatedProps },
        boardId,
      });

      updateBoardElement(id as string, { ...shape, properties: updatedProps });

      return { ...shape, properties: updatedProps };
    })
  );
};
