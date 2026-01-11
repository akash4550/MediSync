import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div>
      {/* header section */}
      <Header/> 
      {/* speciality menu section */}
      <SpecialityMenu/>
      {/* top doctors section */}
      <TopDoctors/>

      <Banner/>
    </div>
  )
}

export default Home
