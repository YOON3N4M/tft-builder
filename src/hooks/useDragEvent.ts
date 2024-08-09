import React, { DragEvent, useState } from "react";

export default function useDragEvent() {
  const [isDragEnter, setIsDragEnter] = useState(false);

  //드래그되는 대상
  function onDragStart(event: DragEvent<HTMLDivElement>) {}
  //드래그 목표 대상
  function onDragEnter(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragEnter(true);
  }

  function onDragLeave(event: DragEvent<HTMLDivElement>) {
    setIsDragEnter(false);
  }

  function onDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function onDragEnd(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragEnter(false);
  }

  return {
    isDragEnter,
    onDragStart,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDragEnd,
  };
}
