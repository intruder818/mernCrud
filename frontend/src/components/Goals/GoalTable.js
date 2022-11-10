import React from 'react'

import { useEffect,useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import  {useNavigate} from 'react-router-dom'
import {getAllGoals,delGoal,editGoal} from '../../features/goal/goalSlice'
import { Table ,Modal,Input,Form, Col,Row,Pagination} from "antd";
import 'antd/dist/antd.css';


function GoalTable() {
  
  const [loading,setLoading]=useState(false)
    const [id,setId]=useState(null)
    const [visible, setVisible] = useState(false); 
const Edit = () => { 
 setVisible(true); 
}; 
const [updateData,setupdateData]=useState({
    text:"",
    expense:"",
    city:""
})

const {text,city,expense}=updateData
const [edit, setEdit] = useState(null);

const navigate=useNavigate()
const dispatch=useDispatch()
const {user,isEdit,}=useSelector((state)=>(state.auth))
const {allGoals,isLoading,isSuccess,cityExpense,totalExpense}=useSelector((state)=>(state.goal))
const catExpense=cityExpense

const pklsum=catExpense.map((e)=>{if (e._id=="Panchkula"){
  return e.Total
}})


const zksum=catExpense.map((e)=>{if (e._id=="Zirakpur"){
  return e.Total
}})

console.log("catExpense",(catExpense));

useEffect(()=>{
  if(!user){
    navigate("/login")
  }
},[user,navigate]) 

useEffect(()=>{
  console.log("getallgoals useffect");
  dispatch(getAllGoals())
},[])
useEffect(()=>{
  console.log("getallgoals useffect");
  dispatch(getAllGoals())
},[dispatch,isSuccess])




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
          key: "expense", 
          title: "Expense", 
          dataIndex: "expense", 
          },
          { 
            key: "city", 
            title: "city", 
            dataIndex: "city", 
            },
        {
            key:"Actions",
            title:"Actions",
            render:(goal)=>{
                return(  <>
                    <button className='my-btn edit' onClick={()=>{Edit()
                                                            setId(goal._id)
                                                            setupdateData({
                                                              text:goal.text,
                                                              city:goal.city,
                                                              expense:goal.expense
                                                            })
                                                            

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
        expense,
        city,
        goal_id
        
    }
    dispatch(editGoal(goalData))
    setVisible(false)
    setupdateData({ text:"",
    expense:"",
    city:""})
    

}} 
okText="submit" 


>




    <Form >

    <Input 
            value={text}
            name="text" 
            placeholder='Edit Task'
            onChange={(e) => { 
            setupdateData((pre) => { 
            return { ...pre, [e.target.name]: e.target.value }; 
            }); 
        }} 
        /> 
  

           

  <Input 
            value={city}
            name="city" 
            placeholder='Edit City'
            onChange={(e) => { 
            setupdateData((pre) => { 
            return { ...pre, [e.target.name]: e.target.value }; 
            }); 
        }} 
        /> 

      <Input 
            value={expense}
            name="expense" 
            placeholder='Add Expense'
            onChange={(e) => { 
            setupdateData((pre) => { 
            return { ...pre, [e.target.name]: e.target.value }; 
            }); 
        }} 
        /> 
    </Form>
</Modal>


 </>




                    <button className='my-btn del'onClick={()=>(
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
   
  return (<>

    
<h2>My Goals</h2>


{allGoals.length>0?<>
    <div className="app"> 
<div className="table"> 

<Table 
dataSource={allGoals}  
loading={isLoading} 
columns={columns} 
pagination={{ pageSize:8,onChange:(page)=>(dispatch(getAllGoals(page)))}} 

footer={() =>{return (<>

 <Row>
  <Col>Panchkula:</Col>
  <Col>{pklsum}</Col>

  <Col>Zirakpur</Col>
  <Col>{zksum}</Col>

 </Row>
</>)}}

/> 

</div> 
</div> 


</>:
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