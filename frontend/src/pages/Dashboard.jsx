import React from 'react'
import GoalForm from '../components/Goals/GoalForm'

import {FaCross} from 'react-icons/fa'

import { useEffect,useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import  {useNavigate} from 'react-router-dom'
import {getAllGoals,delGoal} from '../features/goal/goalSlice'
import GoalTable from '../components/Goals/GoalTable'



function Dashboard() {

  const [editTask,setEditTask]=useState(false)
  const edit=()=>{
    setEditTask(true)
  }
  

  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {user,isEdit}=useSelector((state)=>(state.auth))
  const {allGoals}=useSelector((state)=>(state.goal))
  useEffect(()=>{
    if(!user){
      navigate("/login")
    }
  },[user,navigate]) 

  useEffect(()=>{
    console.log("getallgoals useffect");
    dispatch(getAllGoals())
  },[])

  
  // const goals=allGoals.map((e)=>(e.text))
  
  return (
    <>
    <div>Dashboard</div>
   <GoalForm/>
   <GoalTable/>
   

    {/* <h2>Hey there</h2>
    {allGoals.map((e)=>(
      <ul>
        <li>
          {e.text} <button onClick={()=>{
            dispatch(delGoal(e._id))
           
            console.log('id',e._id)
          }}> Delete</button>   <button className='my-btn' onClick={edit}>Edit</button>
        </li>
      </ul>
    ))} */}
  
  </>
   
    
  )
}

export default Dashboard