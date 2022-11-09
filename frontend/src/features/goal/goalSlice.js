import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"



const createSlice=require("@reduxjs/toolkit").createSlice



const Base_url='http://localhost:4000'
const goalApi='/api/goals/'

// goal from local storage
const goal=JSON.parse(localStorage.getItem('goal'))
let allGoals=[]

if (goal){
    allGoals.push(goal)
}



const initialState={
   goal:goal?goal:null,
    allGoals:[],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:"",
    isEdit:false
    
}


// Api--> /api/goals/
export const addGoal=createAsyncThunk('goal/addGoal',async(goal,thunkAPI)=>{
        
       try {

        const token=thunkAPI.getState().auth.user.token
        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            }}
            console.log("Token",token,"config",config);      
         console.log("add Goal api hit");
        const res=await axios.post(Base_url+goalApi,goal,config)
        
        console.log('response',res);
        console.log('res data',res.data);
        if(res.data){

            localStorage.setItem("goal",JSON.stringify(res.data))

        }
        return res.data
       } catch (error) {

        const message =
        (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)
    
       }
})

export const getAllGoals=createAsyncThunk('goal/getAllGoals',async(goal,thunkAPI)=>{

    try {

        const token=thunkAPI.getState().auth.user.token
        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            }}
         
         console.log("Get allGoal api hit");
        const res=await axios.get(Base_url+goalApi,config)
        
        console.log('getAllGoals response data',res.data);

        if(res.data){

            localStorage.setItem("allGoals",res.data)

        }
        return res.data
       } catch (error) {

        const message =
        (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)
    
       }
})

export const delGoal=createAsyncThunk('goal/delGoal',async(goal_id,thunkAPI)=>{
    try {

        const token=thunkAPI.getState().auth.user.token
        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            }}
        console.log("Token",token,"config",config);
         console.log("delGoal api hit");
         const del_api=Base_url+goalApi+goal_id
         console.log("del APiurl",del_api);
        const res=await axios.delete(del_api,config)
        
        console.log('delGoal response data',res.data);

        if(res.data){

            localStorage.removeItem("goal")

        }
        return res.data
       } catch (error) {

        const message =
        (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)
    
       }
})


export const editGoal=createAsyncThunk('goal/editGoal', async(goalData,thunkAPI)=>{


    try {

        const {goal_id}=goalData

        const token=thunkAPI.getState().auth.user.token
        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            }}
        

         
       
         const edit_api=Base_url+goalApi+goal_id
        console.log("Goal ID ",goal_id);
        const res=await axios.put(edit_api,goalData,config)
        
        console.log('Put editGoal response data',res.data);

     
        return res.data
       } catch (error) {

        const message =
        (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)
    
       }

})

export const goalSlice=createSlice({
    name:"goal",
    initialState,
    reducers:{

        reset:(state)=>{
            state.goal=null
            
            state.isError=false
            state.isSuccess=false
            state.message=""
           
        }

    },

    extraReducers:(  builder)=>{
        builder.addCase(addGoal.fulfilled,(state,action)=>{
            state.goal=action.payload
            state.allGoals.push(action.payload)
            state.isSuccess=true
        })
        .addCase(addGoal.rejected,(state,action)=>{
            state.message=action.payload
            state.isError=true
           
        })
        .addCase(getAllGoals.fulfilled,(state,action)=>{
            state.allGoals=action.payload
        }).addCase(getAllGoals.rejected,(state,action)=>{
            state.isError=true
            state.message=action.payload
        }).addCase(delGoal.fulfilled,(state,action)=>{
            state.allGoals=action.payload
        }).addCase(delGoal.rejected,(state,action)=>{
            state.isError=true
            state.message=action.payload
        }).addCase(editGoal.fulfilled,(state,action)=>{
            state.allGoals=(action.payload)
            state.isSuccess=true
        }).addCase(editGoal.rejected,(state,action)=>{
            state.isError=true
            state.message=action.payload
        })
    }



})



export const {reset}=goalSlice.actions

export default goalSlice.reducer