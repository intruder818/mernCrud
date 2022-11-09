import {FaSignInAlt,FaSignOutAlt,FaUser} from "react-icons/fa"

import { Link, Navigate, useNavigate} from "react-router-dom"

import { useSelector,useDispatch} from "react-redux"
import { logout,reset } from "../features/auth/authSlice"


function Header(){

    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {user}=useSelector((state)=>(state.auth))
   


    const onLogout=()=>{
        dispatch(logout())
        dispatch(reset())
    }


    return(

        <header className="header">
            <div className="logo">
                <Link  to="/">Goal Setter</Link>
            </div>
                <ul>

                    {user? <li>
                        <Link to="/">
                            <button type="" className="btn" onClick={onLogout}>

                            <FaSignInAlt/> Logout
                            </button>
                        
                        </Link>
                        
                    </li>: 
                    <>
                    <li>
                        <Link to="/login">
                        <FaSignInAlt/> Login
                        </Link>
                        
                    </li>

                    <li>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </li>

                    </>
                    
                    }

                   

                    
                </ul>
           
            
        </header>
    )

}

export default Header