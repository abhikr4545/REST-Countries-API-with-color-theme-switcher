import React from 'react'
import { useSelector } from 'react-redux';

const CountryCard = ({ name, population, region, capital, flag}) => {

  const isDarkMode = useSelector((state) => state.darkMode.value);
  
  return (
    <div className={`rounded-lg mt-4 mx-auto w-64 md:mx-0 cursor-pointer`}>
      <div className='overflow-hidden rounded-t-lg w-64'>
        <img src={flag} alt="flag" className='h-36 w-64'/>
      </div>
      <div className={`${isDarkMode ? 'bg-darkModeElements' : 'bg-white'} w-64 rounded-b-lg pl-6 py-6 `}>
        <h1 className={`${isDarkMode ? 'text-lightModeBackground' : 'text-black'} font-bold text-lg`}>{ name }</h1>
        <h3 className={`${isDarkMode ? 'text-lightModeBackground' : 'text-black'} pt-3 font-light`}><span className='font-semibold'>Population:</span> { population } </h3>
        <h3 className={`${isDarkMode ? 'text-lightModeBackground' : 'text-black'} font-light`}><span className='font-semibold'>Region:</span> { region }</h3>
        <h3 className={`${isDarkMode ? 'text-lightModeBackground' : 'text-black'} font-light`}><span className='font-semibold'>Capital:</span> { capital }</h3>
      </div>
    </div>
  )
}

export default CountryCard