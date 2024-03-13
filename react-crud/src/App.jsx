import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useApi } from './hooks/useApi'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const [url , setUrl] = useState("http://localhost:3000/products")

  const {data , httpRequestType , attForm} = useApi(url)
  const [nameProduct , setNameProduct] = useState(null)
  const [priceProduct , setPriceProduct] = useState(null)

  const [idItemTbl , setIdItemTbl] = useState(null)

  const deleteProduct = (id) =>{
    console.log(id);
    httpRequestType(id , "DELETE")
  }

  const getProductId = (id) =>{
    console.log(id)
    httpRequestType(id , "GET")   
  }

  useEffect(() => {
    if (attForm) {
        setNameProduct(attForm.name);
        setPriceProduct(attForm.price);
        setIdItemTbl(attForm.id)
    }
}, [attForm]);

  const postUpdateProduct = async (e) => {
    e.preventDefault()

    
    if(idItemTbl){
      const params = {
        id:idItemTbl,
        name:nameProduct,
        price:parseFloat(priceProduct)
      }
      httpRequestType(params , "PUT" , idItemTbl)
    }else{
      const params = {
        name:nameProduct,
        price:parseFloat(priceProduct)
      }
      httpRequestType(params , "POST")
    }

     
    
      
    

    setNameProduct("")
    setPriceProduct("")
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
                <button onClick={() => getProductId(item.id)}>Editar</button>
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
          <label>Nome do produto
            <input type="text"  value={nameProduct} 
            name='name' 
            onChange={(e)=> setNameProduct(e.target.value)} />
          </label>

          <label>Preço
            <input type="number" value={priceProduct} 
            name='price' 
            onChange={(e)=> setPriceProduct(e.target.value)} />
          </label>

          {!nameProduct || !priceProduct ? (
          <button type="submit" disabled>Preencha o Form</button>
            ) : (
          <button type="submit" onClick={postUpdateProduct}>Clique aqui</button>
          )}

         
        </form>
      </div>
      
   </div>
  )
}

export default App
