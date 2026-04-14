import React, { useEffect } from 'react'
import HomePage from '../Component/HomeComponent/HomePage'
import SubHomePages from '../Component/HomeComponent/SubHomePages'

const Home = () => {
  useEffect(() => {
    document.title = "Bravima"
  }, [])
  return (
    <div>
      <HomePage />
      <SubHomePages />
    </div>
  )
}

export default Home