// custom hoom

import { useEffect, useState } from "react"
import ipConfig from "../configurations/constants-config"
import {SongContent } from "../constants/songsTypes"

export const useExternalSongsHook = () =>{
    const [lyrics, setLyrics] = useState([])
    const [dataSongs, setData] = useState<SongContent []>([]);
      const[loadingData, setLoadingData] = useState(true)
      const[error, setError] = useState('')
    useEffect(() =>{
  const fetchData=async()=>{
        try{
        const response = await fetch(`http://10.72.30.211:3001/lyrics`);
        if(!response.ok){
          throw new Error('Network response was not ok');
        }
      const dt = await response.json();
       console.log('Fetched Data:', dt);
      setData(dt);
       }
        catch(e:any){
          setError(e.message || 'something is wrong')
    } finally{
      setLoadingData(false)
    }
  };
  fetchData()
}, [])
return { dataSongs, loadingData, error };
}
