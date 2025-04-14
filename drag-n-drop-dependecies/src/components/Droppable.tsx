import { useDroppable, UniqueIdentifier } from '@dnd-kit/core';
import classNames from 'classnames';

import styles from './Droppable.module.css';

interface DroppableProps {
  children: React.ReactNode;
  id: UniqueIdentifier;
}

export function Droppable({children, id}: DroppableProps) {
  const {isOver, setNodeRef} = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      data-droppable-id={id}
      className={classNames(
        styles.Droppable,
        isOver && styles.over,
        children ? styles.dropped : false
      )}
      aria-label="Droppable region"
      style={{
        width: '200px',
        height: '200px',
        border: '2px solid #ccc',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isOver ? '#787878' : '#555',
        transition: 'background-color 0.2s ease'
      }}
    >
      {children}
    </div>
  );
}