import {useState,useEffect} from 'react'

import {FaSignInAlt} from "react-icons/fa"






import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'


import { login,reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
function Login() {
    
    const [formData,setFormData]=useState({
       
        email:"",
        password:"",
       
    })

    const{email,password}=formData
    
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {user,isLoading,isError,isSuccess,message}=useSelector((state)=>state.auth)

    useEffect(()=>{
       if(message){
        toast.error(message)
       }

       
        if (isSuccess || user ){
            
            navigate('/')
        }
       
        dispatch(reset())
       

    },[user,isError,isSuccess,message])

useEffect(()=>{
    if (isSuccess || user ){
        toast.success('User logged in')
        navigate('/')
    }
},[user])
    const onChange=(e)=>{

        setFormData((prevState)=>(
            
            {

            ...prevState,
            [e.target.name]:e.target.value
        }
        
        )
        )
    } 

    

    
    const onSubmit=(e)=>{

        e.preventDefault()

        const userData={
            email,
            password
        }
       

        dispatch(login(userData))
      
    }
        
       

   

  return (
    <>
    <section className='heading'> 
        <h1><FaSignInAlt/> Log in</h1>
        <p>Login and Set your Goals</p>
    </section>

    <section className='form'>
            <form onSubmit={onSubmit}>
                <div className='form-group'>

                


                <div className='form-group'>

                         {/* Email*/}
                            <input 
                                    type="text" className="form-control" id="email" 
                                    value={email} name="email" 
                                    placeholder='Enter your email' 
                                    onChange={onChange}
                            />
                </div>

                <div className='form-group'>

                     {/* Password */}
                     <input 
                        type="text" className="form-control" id="password" 
                        value={password} name="password" 
                        placeholder='Enter Password' 
                        onChange={onChange}
                        />
                    
                </div>

               
            
                    
                </div>

                <div className='form-group'>
                    <input type="submit" className='btn btn-block' value='Login' />
                </div>
                
               
            </form>


    </section>
    </>
    )
        
}

export default Login