import './App.css'
import Slidebtn from './SlideBtn'
import { useSlider } from './hooks/useSlider'

// API url: https://picsum.photos/v2/list?page=1&limit=10

export interface ApiObject {
  id: string
  author: string
  width: number
  height: number
  url: string
  download_url: string
}

function App() {
  const {images, setCurrentImg, currentImg} = useSlider({ url: 'https://picsum.photos/v2/list?page=1&limit=10' })

  const handlePrevImg = () => {
    if (!images) return
    setCurrentImg(prev => prev === 0 ? images?.length - 1 : prev-1)
  }
  const handleNextImg = () => {
    if (!images) return
    setCurrentImg(prev => prev === images?.length - 1 ? 0 : prev+1)
  }

  return (
    <div className='flex flex-col items-center gap-3'>
      <h1>Image Slider</h1>
      <div className='h-60 min-w-xs bg-amber-200 relative'>
        <Slidebtn onClick={handlePrevImg} className='absolute top-1/2 left-2 -translate-y-1/2' faceTo='left' />

        <Slidebtn onClick={handleNextImg} className='absolute top-1/2 right-2 -translate-y-1/2' faceTo='right' />

        {images && images.length ?
          images.map((im, i) => {
            return (
              <img src={im.url} alt={`image by ${im.author}`} className={`h-full ${i === currentImg ? '' : 'hidden'}`} />
            )
          })
          : <p>Loading...</p>
        }

        {images && images.length
          ? <div className='flex gap-1.5 absolute bottom-2 left-1/2 -translate-x-1/2'>
              {images.map((_, i) => {
                return <div className={`h-2 w-2 rounded-full ${i === currentImg ? 'bg-zinc-200' : 'bg-zinc-200/50'}`}></div>
              })}
            </div>
          : null
        }
      </div>
    </div>
  )
}

export default App
