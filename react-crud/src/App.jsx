import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useApi } from './hooks/useApi'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const url = "http://localhost:3000/products"

  const {data} = useApi(url)
  const [nameProduct , setNameProduct] = useState(null)
  const [princeProduct , setPrinceProduct] = useState(null)

  const deleteProduct = (id) =>{
    console.log(id)
  }

  const updateProduct = (id) =>{
    console.log(id)
  }

  const postUpdateProduct = async (e) => {
    e.preventDefault()

    const params = {
      name:nameProduct,
      prince:princeProduct
    }

    console.log(params)
  }

  return (
   <div>
      <h1>Lista de Produtos</h1>

      {data ?  (  <table className='tbl__geral'>
        <thead className='tbl__head'>
          <th>Nome do Produto</th>
          <th>Preço</th>
          <th>Ação</th>
        </thead>

        <tbody className="tbl__body">
          {data.map((item) =>(
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>
                <button onClick={() => updateProduct(item.id)}>Editar</button>
                <button onClick={() => deleteProduct(item.id)}>Excluir</button>
              </td>
           
            </tr>
          ))}
        </tbody>
      </table>)  : (
        <p>Loading</p>
      ) }
    
      <div className='add_product'>
        <form onSubmit={postUpdateProduct}>
          <label>Name Product
            <input type="text"  value={nameProduct} 
            name='name' 
            onChange={(e)=> setNameProduct(e.target.value)} />
          </label>

          <label>Price
            <input type="text" value={princeProduct} 
            name='price' 
            onChange={(e)=> setPrinceProduct(e.target.value)} />
          </label>

          <button type="submit" onClick={postUpdateProduct}>Click here</button>
        </form>
      </div>
      
   </div>
  )
}

export default App
