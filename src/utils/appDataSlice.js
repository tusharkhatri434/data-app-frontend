import { createSlice } from "@reduxjs/toolkit";

const appDataSlice = createSlice({
    name:"appData",
    initialState:{
        lineBarId:0,
        filters:null
    },
    reducers:{
        setLineBarID:(state,action)=>{
          state.lineBarId = action.payload;
        },
        setFilters:(state,action)=>{
        state.filters = action.payload
        }
    }
})

export const {setLineBarID,setFilters} = appDataSlice.actions;

export default appDataSlice.reducer;