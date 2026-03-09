import React from 'react'
import Hero from '../../components/Hero'
import FeaturedListings from '../../components/FeaturedListing'
import NearListings from '../../components/NearListings'
import FindRoommates from '../../components/FindRoomates'
import ServiceCard from '../../components/Service'
// import HomePage from '../components/HomePage'
const Home = () => {
  return (
    <div>
        
        <Hero />
        <FeaturedListings/>
        <NearListings/>
        <FindRoommates/>
        <ServiceCard/>

        {/* <HomePage/>    */}
    </div>
  )
}

export default Home