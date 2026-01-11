import React from 'react'
import { assets } from '../assets/frontend/assets'

const Contact = () => {
  return (
    <div className='mx-4 md:mx-20 w-full'>
    <div className='text-center text-2xl pt-10 text-gray-500'>
     {/* heading */}
      <p>
        CONTACT <span className="text-gray-700 font-medium">US</span>
      </p>
    </div>
  
    <div className='my-10 flex flex-col md:flex-row items-center w-full justify-center gap-10 mb-28 text-sm text-center md:text-left'>
      {/* image on left side */}
      <div>
        <img src={assets.contact_image} alt="Contact" className='w-full md:max-w-[360px]' />
      </div>
      
      {/* info on right side */}
      <div className='flex flex-col justify-center items-start  gap-6  text-gray-600'>
        <b className='text-gray-800'>OUR OFFICE</b>
        <div>
          <p>00000 Willms Station</p>
          <p>Suite 000, Washington, USA</p>
        </div>
        <div>
          <p>Tel: (000) 000-0000</p>
          <p>Email: greatstackdev@gmail.com</p>
        </div>
        <b className='text-gray-800'>CAREERS AT PRESCRIPTO</b>
        <p>Learn more about our teams and job openings.</p>
        <button className='border py-2 cursor-pointer px-4 max-w-[130px] rounded hover:bg-black hover:text-white transition duration-300 ease-in-out'>
          Explore Jobs
        </button>
      </div>
    </div>
  </div>
  
  )
}

export default Contact
