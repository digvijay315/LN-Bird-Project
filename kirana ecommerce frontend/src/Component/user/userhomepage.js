import React from 'react'
import Header from './header'
import HeroBanner from './hero'
import Popularproducts from './popularproducts'
import DealOfTheDay from './dealofthedayproducts'
import HeroProcessSection from './heroprocess'
import Footer from './footer'

function Userhomepage() {
  return (
    <div >
        <Header/>
        <HeroBanner/>
        <Popularproducts/>
        {/* <DealOfTheDay/> */}
        <HeroProcessSection/>
        <Footer/>
  
    </div>
  )
}

export default Userhomepage
