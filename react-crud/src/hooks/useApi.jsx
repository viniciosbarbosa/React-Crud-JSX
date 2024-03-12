import { useState , useEffect} from "react";

export const useApi = (url) =>{
    const [data , setData] = useState(null)
    const [config , setConfig] = useState(null)
    const [method , setMethod] = useState(null)
    const [callFetch , setCallFetch ] = useState(null)

    const httpRequestType = (data , method) =>{
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

    }

    useEffect(() =>{

        const fetchData = async () => {

            try {
                const response = await fetch(url)
                const jsonResponse = await response.json()
                setData(jsonResponse)
                
            } catch (error) {
                console.error("Erro ao buscar dados da API:", error);
            }
        }

        fetchData()

    }, [url , callFetch])

    useEffect(()=> {
        const httpRequestPost = async() =>{
            let fetchOptions = [url , config]

            if(method === "POST"){
                const response = await fetch(... fetchOptions)
                const jsonResponse = await response.json()

                setCallFetch(jsonResponse)
            }
        }
        httpRequestPost()

    }, [config , method , url])



    return {data , httpRequestType}
}