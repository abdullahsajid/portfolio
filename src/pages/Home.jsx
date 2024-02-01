import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Hero from '../components/Hero'
import About from '../components/about/About'
import Projects from '../components/projects/Projects'
import Footer from '../components/footer/Footer'
const Home = () => {
  return (
    <>
      <Navbar/>
      <div className='bg-[#111] flex flex-col px-8 max-sm:pl-4 pt-24 gap-5'>
        <Hero/>
        <div className='divider mt-9' style={{transform:"rotateX(180deg)"}}></div>
        <About/>
        <div className='divider mt-9 mb-5'></div>
        <Projects/>
        <div className='divider mt-9' style={{transform:"rotateX(180deg)"}}></div>
        <Footer/>
      </div>
    </>
  )
}

export default Home
