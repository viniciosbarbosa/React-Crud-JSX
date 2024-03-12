import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useApi } from './hooks/useApi'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const url = "http://localhost:3000/products"

  const {data} = useApi(url)

  console.log(data)

  return (
   <div>
      <h1>Lista de Produtos</h1>      
   </div>
  )
}

export default App
