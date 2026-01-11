import React from 'react'
import { assets } from '../assets/frontend/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row items-center bg-blue-500 md:mx-20 rounded-lg px-4 sm:px-10 md:px-16 lg:px-20 py-10 md:gap-8 lg:gap-12'>
      
      {/* Left Side */}
      <div className='w-full md:w-1/2 flex flex-col items-start justify-center gap-6 md:gap-8'>
        
        {/* Heading */}
        <p className='text-3xl sm:text-4xl md:text-4xl lg:text-5xl text-white font-semibold leading-snug md:leading-tight text-center md:text-left'>
          Book Appointment <br /> With Trusted Doctors
        </p>
        
        {/* Info section */}
        <div className='flex flex-col sm:flex-row md:flex-col items-center md:items-start gap-3 text-white text-sm sm:text-base font-light'>
          <img className='w-24 sm:w-28' src={assets.group_profiles} alt="group profile" />
          <p className='text-center sm:text-left'>
            Simply browse through our extensive list of trusted doctors,
            <br className='hidden sm:block' />
            schedule your appointment hassle-free.
          </p>
        </div>

        {/* book appoinment button */}
        <a 
          href='#speciality' 
          className='flex items-center gap-2 bg-white px-6 py-3 rounded-full text-gray-700 text-sm font-medium hover:scale-105 transition-all duration-300 mt-2'
        >
          Book Appointment <img className='w-3' src={assets.arrow_icon} alt="arrow icon" />
        </a>
      </div>

      {/* Right Side Image */}
      <div className='w-full md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end'>
        <img 
          className='w-full max-w-[500px] h-auto  object-contain rounded-lg' 
          src={assets.header_img} 
          alt="header" 
        />
      </div>
    </div>
  )
}

export default Header
