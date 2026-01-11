import React, { useState,useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext';
import axios from 'axios'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'



const Login = () => {

  const {backendUrl , token ,setToken} = useContext(AppContext) //states from context hook
  //state to change signup and signin
  const [state, setState] = useState('Sign Up')
  const navigate = useNavigate()

  //states for user entered data to set that data set data 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');


  //function to handle submit
  const onSubmitHandler = async (e) => {
    e.preventDefault();//to avoide reload of page
    // Form submission logic here
    try {
      
      if(state === 'Sign Up'){
        //send signup data to backend on url /api/user/register
        const {data}= await  axios.post(backendUrl+ '/api/user/register',{name,password,email})

        //if successful signup
        if(data.success){
          console.log(token)
          localStorage.setItem('token',data.token)
          setToken(data.token)
        }
        //if any error occured
        else{
          toast.error(data.message)
        }

      }
      else{
        //else send signup data
        const {data} = await  axios.post(backendUrl+ '/api/user/login',{password,email})

        //if user had account 
        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)
        }
        //if user credentials are wrong
        else{
          toast.error(data.message)
        }


      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=> {
    if(token){
        navigate('/')
    }
  },[token])


  return (

    <form  onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-3xl font-semibold'>{state === 'Sign Up' ? "Create Account" : "Login"}</p>
        <p>Please {state === 'Sign Up' ? "sign up" : "log in"} to book appointment</p>


        {/* Name input for signup*/}

        {/* name is hidden for login */}
        {state === 'Sign Up' && (
          <div className='w-full'>
            <p>Full Name</p>
            <input
              type="text"
              className='border border-zinc-300 rounded w-full p-2 mt-1'
              // set value in setname
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}
        
      {/* Email input*/}
        <div className='w-full'>
          <p>Email</p>
          <input
            type="email"
            className='border border-zinc-300 rounded w-full p-2 mt-1'
            //set email in set email
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        {/*Password */}
        <div className='w-full'>
          <p>Password</p>
          <input
            type="password"
            className='border border-zinc-300 rounded w-full p-2 mt-1'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        {/* button to submit form */}
        <button
          type="submit"
          className='bg-blue-500 text-white cursor-pointer w-full py-2 rounded-md text-base'>
          {state === 'Sign Up' ? "Create Account" : "Login"}
        </button>

        {state === "Sign Up" ? (
         //data to show if we are on sign up
         <p>
            Already have an account?{' '}
            <span
              onClick={() => setState('Login')}
              className='text-blue-500 underline cursor-pointer'>
              Login here
            </span>
          </p>
        ) : (
          //data to show if we are on signup
          <p>
            Create a new account?{' '}
            <span
              onClick={() => setState('Sign Up')}
              className='text-blue-500 underline cursor-pointer'>
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  )
}

export default Login
