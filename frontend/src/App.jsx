import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctor from './pages/Doctor'
import Login from './pages/Login'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppoinment from './pages/MyAppoinment'
import Appoinment from './pages/Appoinment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import About from './pages/About'
import { ToastContainer, toast } from 'react-toastify';
import ChatComponent from './components/ChatComponent'

const App = () => {
  return (
    <div className='mx-4 sm-mx-[10%]'>
    
    {/* Navbar */}
    <Navbar/>
    <ToastContainer />

    {/* route creation*/}
    <Routes>
        {/* home route */}
        <Route path='/' element={<Home/>}/>

        {/* doctor page */}
        <Route path='/doctors' element={<Doctor/>}/>
        
        {/* doctor according to speciality */}
        <Route path='/doctors/:speciality' element={<Doctor/>}/>
        
        {/* login page */}
        <Route path='/login' element={<Login/>}/>

         {/* about page */}
         <Route path='/about' element={<About/>}/>
        
         <Route path='/chat' element={<ChatComponent/>}/>
        
        {/* contact page */}
        <Route path='/contact' element={<Contact/>}/>
        
        {/* my profile page */}
        <Route path='/my-profile' element={<MyProfile/>}/>
        
        {/* my appointment page */}
        <Route path='/my-appoinments' element={<MyAppoinment/>}/>
        
        {/* appointment according to doctor */}
        <Route path='/appoinment/:docId' element={<Appoinment/>}/>
    </Routes>

    <Footer/>
    </div>
  )
}

export default App
