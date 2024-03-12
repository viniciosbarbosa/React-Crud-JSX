import { useState , useEffect} from "react";

export const useApi = (url) =>{
    const [data , setData] = useState(null)

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

    }, [url])

    return {data}
}