import React from 'react'

import { useEffect,useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import  {useNavigate} from 'react-router-dom'
import {getAllGoals,delGoal,editGoal} from '../../features/goal/goalSlice'
import { Table ,Modal,Input,Form, Pagination} from "antd";
import 'antd/dist/antd.css';


function GoalTable() {
    const [id,setId]=useState(null)
    const [visible, setVisible] = useState(false); 
const Edit = () => { 
 setVisible(true); 
}; 
const [updateData,setupdateData]=useState({
    text:"",
})

const {text}=updateData
const [edit, setEdit] = useState(null);






    const columns = [ 
        { 
        key: "text", 
        title: "Task", 
        dataIndex: "text", 
        }, 
        { 
        key: "createdAt", 
        title: "Time", 
        dataIndex: "createdAt", 
        },
        {
            key:"Actions",
            title:"Actions",
            render:(goal)=>{
                return(  <>
                    <button className='my-btn' onClick={()=>{Edit()
                                                            setId(goal._id)

                    }}>Edit</button>

 <>
                       
<Modal 
title="Edit Details" 
visible={visible} 
onCancel={() => setVisible(false)} 
onOk={() => 
{  
    const goal_id=id
    console.log("Goal ID onOK",goal_id);
    const goalData={
        text,
        goal_id
        
    }
    dispatch(editGoal(goalData))
    setVisible(false)

}} 
okText="submit" 


>


    <Form >

            <Input 
            value={text}
            name="text" 
            onChange={(e) => { 
            setupdateData((pre) => { 
            return { ...pre, [e.target.name]: e.target.value }; 
            }); 
        }} 
        /> 
    </Form>
</Modal>


 </>




                    <button className='my-btn'onClick={()=>(
                    Modal.confirm({
          title: 'Please Confirm to delete ',
         
          okText: 'Confirm',
          cancelText: 'cancel',
          
          onOk: () => {
            dispatch(delGoal(goal._id))
          },
        })
                        )}>Delete</button>
                </>)
                  
                
            }
        }
    ]
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
  return (<>

    
<h2>My Goals</h2>


{allGoals.length>0?<>
    <div className="app"> 
<div className="table"> 

<Table dataSource={allGoals} columns={columns} pagination={false} /> 

</div> 
</div> 
<Pagination defaultCurrent={1} total={allGoals.length} /></>:
<><h3>Please add your Tasks First</h3></>}

    {/* {allGoals.map((e)=>(
      <ul>
        <li>
          {e.text} <button onClick={()=>{
            dispatch(delGoal(e._id))
           
            console.log('id',e._id)
          }}> Delete</button>   <button className='my-btn' >Edit</button>
        </li>
      </ul>
    ))} */}
  </>
  )
}

export default GoalTable