import { useEffect, useState } from "react"

export interface ApiObject {
  id: string
  author: string
  width: number
  height: number
  url: string
  download_url: string
}

export function useSlider({ url }: { url: string }) {
  const [currentImg, setCurrentImg] = useState(0)
  const [images, setImages] = useState<{
    url: string
    author: string
  }[]>()

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data) {
          console.log(data)
          setImages(data.map((v: ApiObject) => {
            return {
              url: v.download_url,
              author: v.author
            }
          }))
        }
      })
  }, [url])

  return {
    currentImg, setCurrentImg,
    images
  }
}