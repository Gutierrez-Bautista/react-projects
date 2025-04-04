import { useEffect, useState } from 'react'
import './App.css'

export interface ApiResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export interface Product {
  id: number
  title: string
  description: string
  thumbnail: string
}

function ProductCard ({title, description, thumbnail}: {description: string, title: string, thumbnail: string}) {
  return (
    <div>
      <h4>{title}</h4>
      <span>{description}</span>
      <img src={thumbnail} alt={title} />
    </div>
  )
}

function App() {
  const [page, setPage] = useState(0)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const url = `https://dummyjson.com/products?limit=${10}&skip=${page * 10}&select=title,description,thumbnail`
    fetch(url)
      .then(res => res.json())
      .then((data: ApiResponse) => {
        setProducts(prev => [...prev, ...data.products])
      })
  }, [page])

  const handleBtn = () => {
    if (page < 3) {
      setPage(prev => prev + 1)
    }
  }

  return (
    <>
    <h1>Load More</h1>
    <div className="container">
      {products.map(prod => {
        console.log(prod)
        return (
          <ProductCard key={`${page}-${prod.id}`} title={prod.title} description={prod.description} thumbnail={prod.thumbnail} />
        )
      })}
    </div>
    <button onClick={handleBtn}>Load More</button>
    </>
  )
}

export default App
