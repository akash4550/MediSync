import React from 'react'
import { specialityData } from '../assets/frontend/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div id='speciality' className='flex flex-col items-center gap-6 py-16 text-gray-800 w-11/12 max-w-6xl mx-auto'>
      {/*main heading*/}
      <h1 className='text-2xl sm:text-3xl font-medium text-center'>Find by Speciality</h1>
      
      {/* text Information */}
      <p className='w-full sm:w-2/3 lg:w-1/2 text-center text-sm sm:text-base px-4'>
        Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
      </p>

        {/* filter according speciality */}
      <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-x-auto scrollbar-hide px-4'>
        {
          specialityData.map((item, index) => (
            <Link
              onClick={() => scrollTo(0, 0)}
              className='flex flex-col items-center text-xs sm:text-sm cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500'
              key={index}
              to={`/doctors/${item.speciality}`} //onclik direct to speciality page
            >
              <img className='w-12 sm:w-20 md:w-24 mb-2' src={item.image} alt={item.speciality} />
              <p className='text-center'>{item.speciality}</p>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default SpecialityMenu
