import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { setactiveTab } from '../Redux/features/SearchSlice';

const Tabs = () => {
    
    const dispatch=useDispatch();
    const activeTab=useSelector((state)=>state.search.activeTab);

    const  tabs =["photos","videos","GIF"];
 
    return (
    <div className='flex  gap-5 p-2'>

{tabs.map(function(elem,idx){

return (
<button  
onClick={()=>{
    dispatch(setactiveTab(elem))
}} 
key={idx} 
className={`${(activeTab==elem?'bg-blue-400':'bg-gray-500')} transition `}>
    
{elem}

</button>


)
})}

    </div>
  )

}

export default Tabs