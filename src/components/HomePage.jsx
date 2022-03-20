import { useState } from 'react';
import { useSelector } from 'react-redux';
import { BiChevronDown } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import CountryCard from './CountryCard';
import { useGetCountriesQuery } from '../services/coutriesApi';
import Search from './Search';

const HomePage = () => {

  const { data } = useGetCountriesQuery()
  const isDarkMode = useSelector((state) => state.darkMode.value);
  const [optionValue, setOptionValue] = useState('Filter By Region')
  const [show, setShow] = useState(true);
  const [filterList, setFilterList] = useState([]);
  const [showFilterData, setShowFilterData] = useState(false);

  const regionList = ["Asia","Africa", "Americas", "Europe", "Oceania"];

  const countryToDisplay = ["India", "United States", "Brazil", "Iceland", "Russia", "Germany", "France", "Japan"]

  const findCountryData = (name) => {
    return data.find((item) => item.name.common === name)
  }

  const displayList = countryToDisplay.map((item) => {
    const dataOfCountry = findCountryData(item)
    if(dataOfCountry.hasOwnProperty('capital')){
      return (
        <Link to={`/countryDetails/${dataOfCountry.name.common}`} key={dataOfCountry.name.common}>
          <CountryCard name={dataOfCountry.name.common} population={dataOfCountry.population}
            region={dataOfCountry.region} capital={dataOfCountry.capital[0]} flag={dataOfCountry.flags.png} />
        </Link>
      )
    } else {
      return (
        <Link to={`/countryDetails/${dataOfCountry.name.common}`} key={dataOfCountry.name.common}>
          <CountryCard name={dataOfCountry.name.common} population={dataOfCountry.population}
            region={dataOfCountry.region} capital="No Capital" flag={dataOfCountry.flags.png} />
        </Link>
      )
    }
  })
  
  const filteredCountry = filterList.map((item) => {
    const dataOfCountry = findCountryData(item.name.common)
      return (
        <Link to={`/countryDetails/${dataOfCountry.name.common}`} key={dataOfCountry.name.common}>
          <CountryCard name={dataOfCountry.name.common} population={dataOfCountry.population} region={dataOfCountry.region} flag={dataOfCountry.flags.png} />
        </Link>
      )
  }) 
  
  const handleClick = (e) => {
    setShow(!show)
  }

  const handleSelectField = (e) => {
    setOptionValue(e.target.innerText)
    
    if (e.target.innerText !== "Asia") {
      const filteredList = data.filter((item) => item.region === e.target.innerText)
      setFilterList(filteredList)
      setShowFilterData(true)
    }

    if (e.target.innerText === "Asia") {
      const asiaRegionCountryList = data.filter((item) => item.region === "Asia");
      setFilterList(asiaRegionCountryList);
      setShowFilterData(true)
    }

  }

  return (
    <div className={`mt-4 pb-20`} >
      <div className={`md:flex md:justify-between md:items-center`}>
        <Search />
        <div onClick={handleClick} className={`w-56 py-4 px-4 rounded-md shadow-lg ${isDarkMode ? 'bg-darkModeElements text-lightModeElements' : 'bg-lightModeBackground  border-2'} cursor-pointer mt-8 mb-6`}>
          <div className={`flex relative items-center justify-between`}>
          <h1>{ optionValue }</h1>
          <BiChevronDown className={`${isDarkMode && 'text-lightModeElements'}`}/>
          <div className={`absolute z-10 w-56 top-11 -left-4 rounded-lg ${isDarkMode ? 'bg-darkModeElements text-lightModeElements' : 'bg-lightModeBackground border-2'} ${show && 'hidden'}`}>
            {regionList.map((item) => (
              <h2 key={item} value={item} onClick={handleSelectField} className={`pl-3 py-2 cursor-pointer`}>{ item }</h2>
            ))}
            </div>
        </div>
      </div>
      </div>
      <div className='md:grid md:grid-cols-4 md:gap-x-10'>
        {
          showFilterData ? filteredCountry : displayList
        }
      </div>
    </div>
  )
}

export default HomePage