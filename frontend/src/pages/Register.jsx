import {useState,useEffect} from 'react'

import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {FaUser} from "react-icons/fa"


import { register,reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'


function Register() {
    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:"",
        password2:""
    })

    const{name,email,password,password2}=formData


    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {user,isLoading,isError,isSuccess,message}=useSelector((state)=>state.auth)

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        console.log('message:',message);
        if (isSuccess && user ){
            navigate('/')
        }
        console.log('user:',user,'isSuccess:',isSuccess);
        dispatch(reset())
        console.log('After dispatch','user:',user,'isSuccess:',isSuccess);

    },[user,isError,isSuccess,message,navigate,dispatch])

    useEffect(()=>{
        console.log("isReset:",isSuccess);
    },[isSuccess])

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
        console.log(formData);
        e.preventDefault()
        if (password!==password2){
           console.log("Password does not match");
           toast.error("Password does not match")
           
        }else{

            const userData={
                name,
                email,
                password
            }
            console.log(userData);
            dispatch(register(userData))
          
        }
        

    }

   

  return (
    <>
    <section className='heading'> 
        <h1><FaUser/> Register</h1>
        <p>Please create an account</p>
    </section>

    <section className='form'>
            <form onSubmit={onSubmit}>
                <div className='form-group'>

                    {/* Name */}
                <input 
                        type="text" className="form-control" id="name" 
                        value={name} name="name" 
                        placeholder='Enter your Name' 
                        onChange={onChange}
                />


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

                <div className='form-group'>

                            {/* Password2 */}
                        <input 
                            type="text" className="form-control" id="password2" 
                            value={password2} name="password2" 
                            placeholder='Confirm Password' 
                            onChange={onChange}
                         />
                
                </div>

            
                    
                </div>

                <div className='form-group'>
                    <input type="submit" className='btn btn-block' />
                </div>
                
               
            </form>


    </section>
    </>
    )
        
}

export default Register