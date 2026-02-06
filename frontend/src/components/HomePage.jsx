import React from 'react'
import WelcomeBanner from './WelcomeBanner'
import FoodGrid from './FoodGrid'
import Footer from './Footer'

import './HomePage.css'
import QuickActions from './QuickActions'
import Sidebar from './sidebar/Sidebar'
import TodaysPlan from './TodaysPlan'
import Header from './Header'
import HeroSection from './HeroSection'

const HomePage = () => {
  return (
    <div className='home-container'>
      <HeroSection />
      <QuickActions />
      <TodaysPlan />
      <FoodGrid />
      <Footer />
    </div>
  )
}

export default HomePage
