import React from 'react';

import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

import Header from './components/Header';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


import './index.css' 

function App() {
  return (
    <>
    
        <ToastContainer/>
        <Router>

            <div className='container'>
                <Header/>
                <Routes>
                    <Route path='/' element={<Dashboard/>}></Route>
                    <Route path='/login' element={<Login/>}></Route>
                   
                    <Route path='/Register' element={<Register/>}></Route>
                </Routes>
            </div>
        </Router>
            
    </>
   
    
  );
}

export default App;
