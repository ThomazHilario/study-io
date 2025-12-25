import { getLocalStorage, setLocalStorage } from "@/utils";
import { useState } from "react";

type useDragProps = {
  key: string;
};

export const useDrag = ({ key }: useDragProps) => {
  const isDraggingInLocalStorage = getLocalStorage(key) ?? false;

  const [isDragging, setIsDragging] = useState(isDraggingInLocalStorage);

  function updateCheckedValue() {
    const isDraggingInLocalStorage =
      getLocalStorage(key) !== null && getLocalStorage(key);

    const newCheckedValue = isDraggingInLocalStorage === true ? false : true;

    setIsDragging(newCheckedValue);

    setLocalStorage(key, newCheckedValue);
  }

  return {
    isDragging,
    setIsDragging,
    updateCheckedValue,
  };
};
