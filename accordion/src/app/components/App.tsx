import { useState } from 'react'
import './App.css'
import PlusIcon from './icons/plus'
import MinusIcon from './icons/minus'

interface AccordionProps {
  title: string
  id: number
  isSelected: boolean
  clickHandler: (id: number) => void
}

const iconsClases = 'w-7 h-7 absolute top-1/2 right-4 -translate-y-1/2 hover:scale-110 active:scale-95'

function Accordion ({ title, clickHandler, id, isSelected }: AccordionProps) {
  const accordionClasses = isSelected ? 'accordion show' : 'accordion'

  const handleBtnClick = () => {
    clickHandler(id)
  }

  return (
    <article className='bg-[#09f]/5 rounded-xl max-w-md overflow-hidden'>
      <div className='bg-[#09f]/15 py-3 relative text-white cursor-pointer' onClick={handleBtnClick}>
        <h2 className='text-3xl'>{title}</h2>
        {
          isSelected
            ? <MinusIcon className={iconsClases} />
            : <PlusIcon className={iconsClases} />
        }
        
      </div>
      <div className={accordionClasses}>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste reiciendis fuga praesentium nam atque, error distinctio exercitationem voluptatibus nostrum explicabo id maxime provident ea consequatur, suscipit at culpa impedit repudiandae!</p>
      </div>
    </article>
  )
}

function App() {
  const [selected, setSelected] = useState(-1)
  const [enabledMultiple, setEnabledMultiple] = useState(false)
  const [multiSelected, setMultiSelected] = useState(new Set())

  const handleAccordionChange = (currentId: number) => {
    if (enabledMultiple) {
      handlemultiSelected(currentId)
    } else {
      handleSingleSelection(currentId)
    }
  }

  const handleSingleSelection = (currentId: number) => {
    setSelected(prev => {
      return currentId === prev ? -1 : currentId
    })
  }

  const handlemultiSelected = (currentId: number) => {
    setMultiSelected(prev => {
      const aux = new Set(prev.values())
      const deleted = aux.delete(currentId)

      if (!deleted) {
        aux.add(currentId)
      }

      return aux
    })
  }

  return (
    <div className='flex flex-col gap-2'>
      <h1>Accordion</h1>
      <button onClick={() => {setEnabledMultiple(prev => {
        if (prev) {
          setMultiSelected(() => new Set())
          setSelected(-1)
        }
        return !prev
        })}}>
        Enable multi selection
      </button>
      <Accordion
        title='Acc 1'
        id={1}
        isSelected={enabledMultiple ? multiSelected.has(1) : selected === 1}
        clickHandler={handleAccordionChange}
      />
      <Accordion
        title='Acc 2'
        id={2}
        isSelected={enabledMultiple ? multiSelected.has(2) : selected === 2}
        clickHandler={handleAccordionChange}
      />
      <Accordion
        title='Acc 3'
        id={3}
        isSelected={enabledMultiple ? multiSelected.has(3) : selected === 3}
        clickHandler={handleAccordionChange}
      />
    </div>
  )
}

export default App
