import { useDispatch,useSelector } from "react-redux"
import {seterror,setquery,setloaing,setresult} from '../Redux/features/SearchSlice'
import { fetchImages,fetchGif,fetchVideos } from "../Api/MediaApi"
import { useEffect } from "react"

const ResultGrid = () => {
    const {query,activeTab,loading,error,results}=useSelector((store)=>store.search)
    
    let data;



useEffect(function(){
const  getData=async()=>{
    if(activeTab=='photos'){
        let response= await fetchImages(query);
        data=response;
    }

    if(activeTab=='videos'){
const response=await fetchVideos(query);
data=response
}

if(activeTab=='GIF'){
    const response=await fetchGif(query);
    data=response.data.results;

}


console.log(data);


}


getData()


},[query,activeTab])


  return (
    <div>
       <button >dba</button>
    </div>
  )
}


export default ResultGrid