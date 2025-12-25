import { getLocalStorage, setLocalStorage } from "@/utils";
import { ReactNode } from "react";
import { DraggableEvent } from "react-draggable";
import { DraggableData, Props, Rnd } from "react-rnd";

// Interface
interface DragProps {
  nameDragComponent: string;
  positionXDefault: number;
  positionYDefault: number;
  isDragging: boolean;
  children: ReactNode;
}
export const Drag = ({
  children,
  isDragging,
  nameDragComponent,
  positionXDefault,
  positionYDefault,
}: DragProps) => {
  const dragPosition = getLocalStorage(nameDragComponent);

  const positionX = dragPosition?.x ?? positionXDefault;

  const positionY = dragPosition?.y ?? positionYDefault;

  function savingPositionComponentTask(
    mouse: DraggableEvent,
    position: DraggableData,
  ) {
    setLocalStorage(nameDragComponent, {
      mouse,
      x: position.x,
      y: position.y,
    });
  }

  const propsRnd: Props = {
    bounds: "window",
    enableResizing: false,
    default: {
      x: positionX,
      y: positionY,
      height: "",
      width: "",
    },
    onDragStop: savingPositionComponentTask,
    disableDragging: isDragging,
  };
  return <Rnd {...propsRnd}>{children}</Rnd>;
};
