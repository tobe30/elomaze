import React from 'react'
import Hero from '../../components/Hero'
import FeaturedListings from '../../components/FeaturedListing'
import FindRoommates from '../../components/FindRoomates'
import PropertyGrid from '../../components/PropertyGrid'
import Card from '../../components/Card'
import AgentCard from '../../components/AgentCard'
import HomeGallery from '../../components/HomeGallery'
// import HomePage from '../components/HomePage'
const Home = () => {
  return (
    <div>
        
        <Hero />
        <PropertyGrid/>
        <Card/>
        <AgentCard/>
        <HomeGallery/>

        {/* <HomePage/>    */}
    </div>
  )
}

{/* <FeaturedListings/> */}
export default Home