import { useState } from "react";
import { Data, Status } from "../interfaces";

export function useDragAndDrop(initialState: Data[]) {
  const [isDragging, setIsDragging] = useState(false)
  const [listItems, setListItems] = useState<Data[]>(initialState)

  const handleDragging = (dragging: boolean) => setIsDragging(dragging)

  const handleUpdateList = (id: number, status: Status) => {
    const card = listItems.find(v => v.id === id)

    if (card && card.status !== status) {
      card.status = status

      setListItems(prev => [...prev.filter(v => v.id !== id), card])
    }
  }

  return {
    isDragging,
    handleDragging,
    handleUpdateList,
    listItems
  }
}