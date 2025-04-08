import { DragEventHandler } from "react"
import Card from "./Card"
import { Data, Status } from "./interfaces"

interface Props {
  status: Status
  items: Data[]
  isDragging: boolean
  handleDragging: (dragging: boolean) => void
  handleUpdateList: (id: number, status: Status) => void
}

export default function CardCointainer ({ status, items = [], isDragging, handleDragging, handleUpdateList }: Props) {
  const handleDragOver:DragEventHandler = (evt) => {
    evt.preventDefault()
  }

  const handleDrop: DragEventHandler = (evt) => {
    evt.preventDefault()

    const id = Number(evt.dataTransfer.getData('text'))

    handleUpdateList(id, status)
    handleDragging(false)
  }

  return (
    <div className={"card-container" + (isDragging ? ' card-dragging' : '')} onDragOver={handleDragOver} onDrop={handleDrop}>
      <p>{status} Pokemons</p>
      {
        items.map(i => {
          return status === i.status ? <Card data={i} key={i.id} handleDragging={handleDragging} /> : null
        })
      }
    </div>
  )
}