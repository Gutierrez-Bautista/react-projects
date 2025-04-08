import { DragEventHandler } from "react"
import { Data } from "./interfaces"

interface Props {
  data: Data
  handleDragging: (dragging: boolean) => void
}

export default function Card ({ data, handleDragging }: Props) {
  const handleDragEnd = () => handleDragging(false)

  const handleDragStart: DragEventHandler = (evt) => {
    evt.dataTransfer.setData('text', `${data.id}`)
    handleDragging(true)
  }

  return (
    <div className="card" draggable onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <p>{data.content}</p>
    </div>
  )
}