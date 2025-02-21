import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContex";
import { IFetchParams } from "../models/fetch.model";

interface Params<T> {
  data: Data<T>;
  loading: boolean;
  error: ErrorType;
}

type Data<T> = T | null;
type ErrorType = Error | null;

export function useFetch<T>({url,options}:IFetchParams): Params<T> {
  const [data, setData] = useState<Data<T>>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType>(null);
  const { authState } = useAuth();

  const { method,headers,body } = options;

  const optionsFetch = {
    method,
    headers: {
      ...headers,
      "Authorization": `Bearer ${authState?.token}`,
    },
    body
  }

  if(!body) {
    delete optionsFetch.body;
  }

  useEffect(() => {
    let controller = new AbortController();
    
    setLoading(true); 
    
    const fetchData = async () => {
      try { 
        const response = await fetch(url,{
          ...optionsFetch,
          signal: controller.signal
        });
       
        if(!response.ok){
          throw new Error("Error en la petición");
        }
        
        const jsonData:T = await response.json();
        console.log(jsonData);
        setData(jsonData);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      controller.abort();
    }

  },[url]);

  return {data, loading, error };
}


/* 
Por que los headers que le llegan al servidor son los siguientes
{
  host: '192.xxx.x.xxx:3000',
  connection: 'Keep-Alive',
  'accept-encoding': 'gzip',
  'user-agent': 'okhttp/4.12.0'
}

si yo le envio otros:
{"headers": {"authorization": "Bearer token"}, "method": "GET"}
*/