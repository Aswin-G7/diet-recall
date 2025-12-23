import React from 'react'
import WelcomeBanner from './WelcomeBanner'
import FoodGrid from './FoodGrid'
import Footer from './Footer'

import './HomePage.css'
import QuickActions from './QuickActions'
import Sidebar from './Sidebar'
import TodaysPlan from './TodaysPlan'

const HomePage = () => {
  return (
    <div className='home-container'>
      <WelcomeBanner />
      <Sidebar />
      <QuickActions />
      <TodaysPlan />
      <FoodGrid />
      <Footer />
    </div>
  )
}

export default HomePage
