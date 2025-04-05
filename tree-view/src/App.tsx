import { ReactNode, useState } from 'react'
import './App.css'

function Subtree ({ children, text }: { children: ReactNode, text: string }) {
  const [see, setSee] = useState(false)

  const handleClick = (evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    if (evt.currentTarget === evt.target) {
      setSee(prev => !prev)
    }
  }

  return (
    <ul className='subtree'>
      <li onClick={handleClick}>{text} <span>{see ? '-' : '+'}</span></li>
      {see && children}
    </ul>
  )
}

function Sidebar () {
  return (
    <div className='sidebar'>
      <nav>
        <ul className='subtree-container'>
          <li><span>Item 1</span></li>
          <li>
            <Subtree text='Item 2'>
              <li>Item 2.1</li>
              <li>Item 2.2</li>
              <li>
                <Subtree text='Item 2.3'>
                  <li>Item 2.3.1</li>
                  <li>Item 2.3.2</li>
                </Subtree>
              <li>Item 2.4</li>
              </li>
            </Subtree>
          </li>
          <li>Item 3</li>
        </ul>
      </nav>
    </div>
  )
}

function App() {
  return (
    <>
      <Sidebar />
    </>
  )
}

export default App
