import { useState, useEffect, type CSSProperties } from 'react';
import { UniqueIdentifier, useDraggable } from '@dnd-kit/core';
import { Coordinates } from '@dnd-kit/utilities';

interface DraggableProps {
  style?: React.CSSProperties;
  label?: string;
  id: string;
  onParentChange?: (newParent: UniqueIdentifier) => void;
}

const defaultCoordinates: Coordinates = {x: 0, y: 0};

export function Draggable({
  label = 'Drag me.',
  style,
  id,
  onParentChange
}: DraggableProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [translate, setTranslate] = useState<Coordinates>(defaultCoordinates);
  const [initialPosition, setInitialPosition] = useState<DOMRect | null>(null);
  const [targetParent, setTargetParent] = useState<UniqueIdentifier | null>(null);

  const {attributes, listeners, setNodeRef, isDragging: isDraggingKit, transform } = useDraggable({
    id
  });

  useEffect(() => {
    setIsDragging(isDraggingKit);
  }, [isDraggingKit]);

  useEffect(() => {
    const element = document.getElementById(id);
    if (!element) return;

    const handleDragStart = () => {
      setInitialPosition(element.getBoundingClientRect());
    };

    const handleDragEnd = (event: CustomEvent) => {
      const { collisions } = event.detail as { collisions: { id: UniqueIdentifier }[] | null };

      if (collisions?.length) {
        const newParent = collisions[0].id;
        const targetElement = document.querySelector(`[data-droppable-id="${newParent}"]`);

        if (targetElement && initialPosition) {
          const finalPosition = targetElement.getBoundingClientRect();
          const deltaX = finalPosition.left - initialPosition.left + (finalPosition.width - initialPosition.width) / 2;
          const deltaY = finalPosition.top - initialPosition.top + (finalPosition.height - initialPosition.height) / 2;

          setTranslate({ x: deltaX, y: deltaY });
          setTargetParent(newParent);
        }
      }
    };

    element.addEventListener('dragstart', handleDragStart);
    element.addEventListener('dragend', handleDragEnd as EventListener);

    return () => {
      element.removeEventListener('dragstart', handleDragStart);
      element.removeEventListener('dragend', handleDragEnd as EventListener);
    };
  }, [id, initialPosition]);

  const handleTransitionEnd = () => {
    if (targetParent && onParentChange) {
      onParentChange(targetParent);
      setTargetParent(null);
      setTranslate(defaultCoordinates);
    }
  };

  const s: CSSProperties = {
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '8px',
    textWrap: 'nowrap',
    position: 'relative',
    zIndex: 1000,
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : `translate3d(${translate.x}px, ${translate.y}px, 0)`,
    transition: isDragging ? undefined : 'transform 0.3s ease',
    backgroundColor: isDragging ? '#09fd' : '#09f7',
    ...style
  }

  return (
    <button
      id={id}
      ref={setNodeRef}
      style={s}
      onTransitionEnd={handleTransitionEnd}
      {...attributes}
      {...listeners}
    >{label}</button>
  );
}