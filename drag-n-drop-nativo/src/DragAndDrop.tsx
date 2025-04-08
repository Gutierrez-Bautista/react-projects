import { data } from "./assets/data";
import CardCointainer from "./CardContainer";
import { Status } from "./interfaces";
import { useDragAndDrop } from "./hooks/useDragAndDrop";

const pokemonTypes: Status[] = ['bad', 'normal', 'good']

export default function DragAndDrop () {
  const { listItems, isDragging, handleDragging, handleUpdateList} = useDragAndDrop(data)

  return (
    <div className="drag-n-drop">
      { pokemonTypes.map(cont => {
        return <CardCointainer status={cont} key={cont} items={listItems} isDragging={isDragging} handleDragging={handleDragging} handleUpdateList={handleUpdateList} />
      }) }
    </div>
  )
}