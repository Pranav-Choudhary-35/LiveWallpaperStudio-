import { createSlice } from "@reduxjs/toolkit";

const searchSlice=createSlice({

    name:'search',

    initialState:{
     query:'nature',
     activeTab:'photos',
     result:[],
     loading:false,
     error:null,
     page:1,
     hasMore:true

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
    state.page=1
},

appendResult(state,action){
    state.result=[...state.result,...action.payload]
    state.loading=false
},

setPage(state,action){
    state.page=action.payload
},

setHasMore(state,action){
    state.hasMore=action.payload
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


export const{setquery,setactiveTab,setloading,setresult,clearResults,seterror,appendResult,setPage,setHasMore}=searchSlice.actions;

export default searchSlice.reducer;