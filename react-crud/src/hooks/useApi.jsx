import { useState , useEffect} from "react";

export const useApi = (url) =>{
    const [data , setData] = useState(null)
    const [config , setConfig] = useState(null)
    const [method , setMethod] = useState(null)
    const [callFetch , setCallFetch ] = useState(null)

    const [params , setParams] = useState(null)

    const [attForm , setAttForm] = useState(null)

    const httpRequestType = (data , method , id) =>{
        if(method == "POST"){
            setConfig({
                method,
                headers:{
                    "Content-type" : "application/json"
                },
                body:JSON.stringify(data)
            })
            setMethod(method)
        }

        else if(method == "DELETE"){
            setConfig({
                method,
                headers:{
                    "Content-type" : "application/json"
                },
                body:JSON.stringify(data)
            })
            setParams(data)
            setMethod(method)
        }

        else if(method == "PUT"){
            setConfig({
                method,
                headers:{
                    "Content-type" : "application/json"
                },
                body:JSON.stringify(data)
            })
            setParams(data)
            setMethod(method)
        }

        else if(method == "GET"){
            setConfig({
                method,
                headers:{
                    "Content-type" : "application/json"
                },
                body:JSON.stringify(data)
            })
            setParams(data)
            setMethod(method)
        }
       

    }

    useEffect(() =>{

        const fetchData = async () => {

            try {
                const response = await fetch(url)
                const jsonResponse = await response.json()
                console.log(jsonResponse)
                setData(jsonResponse)
                
            } catch (error) {
                console.error("Erro ao buscar dados da API:", error);
            }
        }

        fetchData()

    }, [url , callFetch])

    useEffect(()=> {
        const httpRequestPost = async() =>{
            let fetchOptions ;

            if(method === "POST"){
                let fetchOptions = [url , config]
                const response = await fetch(... fetchOptions)
                const jsonResponse = await response.json()

                setCallFetch(jsonResponse)
            }

            if(method === "DELETE"){
                const response = await fetch(`${url}/${params}`, config);
                const jsonResponse = await response.json()

                setCallFetch(jsonResponse)
            }

            if(method === "GET"){
                const response = await fetch(`${url}/${params}`);

                const jsonResponse = await response.json()

                setAttForm(jsonResponse)
            }

        
            if(method === "PUT"){
                const response = await fetch(`${url}/${params.id}` , config);
                const jsonResponse = await response.json()

                setCallFetch(jsonResponse)
            }

        


        }
        httpRequestPost()

    }, [config , method , url])



    return {data , httpRequestType , attForm}
}