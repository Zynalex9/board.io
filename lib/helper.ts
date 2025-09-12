import { KonvaEventObject } from "konva/lib/Node";
import { updateBoardElement } from "@/Queries/board";
import { DrawType, Shape } from "@/types/allTypes";

export const isActiveLink = (href: string, currentPath: string) => {
  return href === currentPath;
};

export const handleShapeUpdate = (
  e: KonvaEventObject<any>,
  id: string,
  isTransform: boolean = false,
  setShapes: React.Dispatch<React.SetStateAction<Shape[]>>
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
          node.scaleX(1); // reset scale to 1
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
          // for Line/Arrow/Scribble, usually no transform scaling
        }
      } else {
        // Dragging
        const node = e.target;
        updatedProps = {
          ...updatedProps,
          x: node.x(),
          y: node.y(),
        };
      }

      // Call backend
      updateBoardElement(id as string, { ...shape, properties: updatedProps });

      return { ...shape, properties: updatedProps };
    })
  );
};
