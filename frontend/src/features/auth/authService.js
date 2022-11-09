import axios from 'axios'

const API_URL='http://localhost:4000/api/users/'

//Register user

const register=async (userData)=>{
    const response=await axios.post(API_URL,userData)

    if( response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }

    return response.data
}



const login =async(userData)=>{
   
   
    
   } 
    
   

const authService={
    register,
    login
}


export default authService