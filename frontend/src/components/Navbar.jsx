import React, { useContext, useState } from 'react'
import {assets} from '../assets/frontend/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

    // all navigaing data
const navData=[
    {id:1,link:"HOME",path:"/"},
    {id:2,link:"All Doctors",path:"/doctors"},
    {id:3,link:"About",path:"/about"},
    {id:4,link:"contact",path:"/contact"}
]


    const navigate=useNavigate();//use navigate hook

    //use context hook
    const {token,setToken} = useContext(AppContext)

    //to handle menu button at different screen size
    const [showMenu,setShowMenu]=useState(false);


    const logout = () => {
        setToken(false)
        localStorage.removeItem('token')
    }
   


  return (
    <div className='md:mx-20 flex justify-between items-center text-sm py-4 mb-5 border-b border-b-gray-400 mx-10'>
       
       {/* desktop menu section */}
       
       {/* logo image */}
        <img onClick={()=> navigate('/')} src={assets.logo} alt="logo image" className='w-44 cursor-pointer'/>
        
        {/* hidden for small screen */}
        <ul className='hidden md:flex items-start gap-6 font-medium'>
            {/* mapping navdata items  */}
            {navData.map(({ id, link, path }) => (
                <li key={id} className='font-semibold uppercase py-1 hover:underline'>
                    <NavLink to={path}>
                        {link}
                    </NavLink>
                </li>
            ))}
        </ul>


        <div className='flex items-center gap-4'>

            {
                // if we are login then show user image and drop down 
                token? 
                
                /*   dropdown section */
                <div className='flex items-center gap-2 cursor-pointer group relative'>
                    <img className='w-8 rounded-full' src={assets.profile_pic} alt="profile picture"/>
                    <img className='w-2.5 ' src={assets.dropdown_icon} alt="dropdown icon" />
                    <div className='top-0 absolute right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                        <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 '>
                            <p onClick={()=> navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                            <p onClick={()=> navigate('my-appoinments')} className='hover:text-black cursor-pointer'>My Appoinments</p>
                            <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                        </div>
                    </div>
                </div> :  
                // else show create account button
                <div className='flex justify-center items-center gap-3'>

                    <button onClick={()=> navigate('/login')} className='px-8 py-3 border bg-blue-400 text-white rounded-full font-light hidden md:block cursor-pointer'>Create account</button>
                    <button onClick={()=> navigate('/chat')} className='px-8 py-3 border bg-red-400 text-white rounded-full font-light hidden md:block cursor-pointer'>आरोग्य साथी</button>
                </div>

            }

            {/* menu icon image */}
            <img onClick={()=> setShowMenu(true)} src={assets.menu_icon} className='w-6 md:hidden cursor-pointer' alt="" />

            
            {/* Mobile menu */}
            <div className={` ${showMenu? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                <div className='flex items-center justify-between px-5 py-6'>
                    <img className='w-36 ' src={assets.logo} alt="" />
                    <img className='w-7 cursor-pointer' src={assets.cross_icon} onClick={()=>setShowMenu(false)} alt="" />
                </div>

                <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>

                    {navData.map(({ id, link, path }) => (
                        <li key={id} className='font-semibold uppercase py-1 hover:underline'>
                            <NavLink onClick={()=> setShowMenu(false)} to={path} className='px-4 py-2 rounded inline-block'>
                                {link}
                            </NavLink>
                        </li>
                     ))}
                </ul>
            </div>

        </div>
    </div>
  )
}

export default Navbar
