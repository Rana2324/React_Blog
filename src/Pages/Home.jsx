import React from 'react'
import Hero from '../Components/Hero';
import wave from '../assets/wave.svg'
const Home = () => {
  return (
   <div className='flex relative flex-col justify-center items-center min-h-[calc(100vh-116px)]'>
   <Hero/>
   <img src={wave} alt="wave" className='absolute bottom-0 w-full' />
   </div>
  );
}

export default Home