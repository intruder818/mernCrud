import e from 'cors'
import React from 'react'

import {useState,useEffect} from "react"

import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {addGoal,reset} from '../../features/goal/goalSlice'
import {toast} from 'react-toastify'

function GoalForm() {

    const navigate =useNavigate()

    const dispatch=useDispatch()
    const {isError,message,isSuccess}=useSelector((state)=>(state.goal))
    const {user}=useSelector((state)=>(state.auth))

    const [formData,setFormData]=useState({
       
        text:"",
        expense:"",
        city:"",
        user:user
       
    })

useEffect(()=>{

    if(isError){
        toast.error(message)

    }
},[isError])


useEffect(()=>{
    
   console.log("reset done");
    dispatch(reset())
   
},[user,isError,isSuccess,message,navigate,dispatch])


    const onChange=(e)=>{

        setFormData((prevState)=>(
            
            {

            ...prevState,
            [e.target.name]:e.target.value
        }
        
        )
        )
    } 
const {text,expense,city}=formData
const onSubmit =(e)=>{
            console.log("submit function");
        e.preventDefault()

        const goalData={
            text,
            expense,
            city
            
        }

        console.log('goalData',goalData);
        dispatch(addGoal(goalData))
        setFormData({text:"",expense:"",
        city:"",})
      

    }
  return (
    <div>
<form >

<div className='form-group'>


{/* Text*/}
   <input 
           type="text" className="form-control" id="text" 
           value={text} name="text" 
           placeholder='Add To do' 
           onChange={onChange}
   />
</div>

<div className='form-group'>

{/* City*/}
   <input 
           type="text" className="form-control" id="city" 
           value={city} name="city" 
           placeholder='City' 
           onChange={onChange}
   />
</div>

<div className='form-group'>

{/* Expense*/}
   <input 
           type="text" className="form-control" id="expense" 
           value={expense} name="expense" 
           placeholder='Expense' 
           onChange={onChange}
   />
</div>


                <div className='form-group'>
                    <input type="submit" className='btn btn-block' onClick={onSubmit}/>
                </div>
</form>


    </div>
  )
}

export default GoalForm