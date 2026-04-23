import { createSlice } from "@reduxjs/toolkit";

const searchSlice=createSlice({

    name:'search',

    initialState:{
     query:' ',
     activeTab:'photos',
     result:[],
     loading:false,
     error:null

    },

    reducers:{

setquery(state,action){

    state.query=action.payload;


},
setactiveTab(state,action){

    state.activeTab=action.payload;

},

setresult(state,action){

    state.result=action.payload
    state.loading=false    
},

setloading(state){

    state.loading=true,
    state.error=null

},
seterror(state,action){
state.error=action.payload
state.loading=false
},
clearResults(state){
    state.result=[];
} 
}


})


export const{setquery,setactiveTab,setloading,setresult,clearResults,seterror}=searchSlice.actions;

export default searchSlice.reducer;