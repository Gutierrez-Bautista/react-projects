import { useState } from 'react';
import { UniqueIdentifier, DndContext} from '@dnd-kit/core';
import { Draggable } from '../components/Draggable';
import { Droppable } from '../components/Droppable'

interface DroppableDemoProps {
  parents?: string[]
}

export function DroppableOverlayDemo ({ parents = ['A'] }: DroppableDemoProps) {
  const [parent, setParent] = useState<UniqueIdentifier | null>(null);
  const [overlayParent, setOverlayParent] = useState<UniqueIdentifier | null>(null)

  const item = <Draggable 
    id="draggable-1" 
    label="Drag me." 
    onParentChange={setParent}
  />;

  const Overlay = <Draggable
    id="draggable-overlay"
    label="Drag me."
    onParentChange={setOverlayParent}
    style={{
      position: 'absolute',
      opacity: 0.5
    }}
  />

  return (
    <DndContext 
      onDragStart={(event) => {
        const draggable = document.getElementById(event.active.id as string);
        if (draggable) {
          draggable.dispatchEvent(new Event('dragstart'));
        }
      }}
      onDragEnd={(evt) => {
        setOverlayParent(null)
        const draggable = document.getElementById(evt.active.id as string);
        if (draggable) {
          draggable.dispatchEvent(new CustomEvent('dragend', { 
            detail: { collisions: evt.collisions }
          }));
        }
      }}
      onDragOver={(event) => {
        if (!event.over) return

        const droppable = document.querySelector(`[data-droppable-id="${event.over.id}"]`)

        if (droppable) {
          setOverlayParent(event.over.id)
        }
      }}
    >
      <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
        <div style={{ 
          padding: '20px',
          border: '1px dashed #ccc',
          borderRadius: '4px'
        }}>
        {!parent ? (
          item
        ) : null}
        </div>
        {parents.map(id => (
          <Droppable key={id} id={id}>
            {parent === id
              ? item
              : null
            }
            {
              overlayParent === id
                ? Overlay
                : null
            }
          </Droppable>
        ))}
      </div>
    </DndContext>
  );
}