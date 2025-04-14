import './App.css'
import { DragOverlayExample } from './demos/DragOverlay'
import { DropAnywhere } from './demos/DropAnywhere'
import { DroppableDemo } from './demos/Droppable'
import { DroppableOverlayDemo } from './demos/DroppableOverlay'

type AppProps = {
  component: 'dropAnywhere'
  qty: number
} | {
  component: 'droppableDemo' | 'droppableOverlayDemo'
  parents?: string[]
} | {
  component: 'dragOverlayDemo'
}

function App(props: AppProps) {
  const { component } = props;
  return (
    <>
      {component === 'dropAnywhere' 
        && 
        <DropAnywhere qty={props.qty} />
      }
      {component === 'droppableDemo' 
        && 
        <DroppableDemo parents={props.parents} />
      }
      {component === 'dragOverlayDemo' 
        && 
        <DragOverlayExample />
      }
      {
        component === 'droppableOverlayDemo' 
        && 
        <DroppableOverlayDemo parents={props.parents} />
      }
    </>
  )
}

export default App
