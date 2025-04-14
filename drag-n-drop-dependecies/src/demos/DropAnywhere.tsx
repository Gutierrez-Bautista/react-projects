import { DndContext, useDraggable } from "@dnd-kit/core";
import { Coordinates } from "@dnd-kit/utilities";
import { useEffect, useState } from "react";

import './DropAnywhere.module.css'

interface Props {
  style?: React.CSSProperties;
  label?: string;
  id: string
}

const defaultCoordinates: Coordinates = {x: 0, y: 0};

function Draggable({
  label = 'Drag me.',
  style,
  id
}: Props) {
  const [wasDragged, setWasDragged] = useState(false);
  const [{x, y}, setCordinates] = useState(defaultCoordinates)
  const {attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: {
      x,
      y,
      setCordinates
    }
  })

  useEffect(() => {
    if (isDragging) {
      setWasDragged(true);
    }
  }, [isDragging]);

  const s: React.CSSProperties = {
    ...style,
    position: wasDragged ? 'absolute' : undefined,
    textWrap: 'nowrap',
    zIndex: 1000,
    top: y,
    left: x,
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    backgroundColor: isDragging ? '#09fd' : '#09f7'
  }

  return (
    <button
      ref={setNodeRef}
      style={s}
      {...attributes}
      {...listeners}
    >{label}</button>
  );
}

export function DropAnywhere({ qty }: { qty: number }) {
    return (
      <DndContext
        onDragEnd={({delta, active}) => {
          const {x, y, setCordinates} = active.data.current as {x: number, y: number, setCordinates: (c: Coordinates) => void};
          setCordinates({
            x: x + delta.x,
            y: y + delta.y
          })
        }}
      >
        <div style={{ padding: '2rem', display: 'flex', position: 'relative', zIndex: 500 }}>
          { Array(qty).fill(0).map((_, i) => (
            <Draggable
              key={i}
              id={`draggable-${i}`}
              label={`Draggable ${i + 1}`}
              style={{
                border: '1px solid #09f7',
                padding: '1rem',
                borderRadius: '4px'
              }} 
            />
          )) }
        </div>
      </DndContext>
    )
}