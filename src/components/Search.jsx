import { useState } from 'react';
import { FiSearch } from 'react-icons/fi'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetCountriesQuery } from '../services/coutriesApi';
const Search = () => {

  const [searchTerm, setSearchTerm] = useState('')

  const { data } = useGetCountriesQuery()
  const isDarkMode = useSelector((state) => state.darkMode.value);

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const filteredList = data.filter((item) => item.name.common.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className={`mt-4 relative`}>
      <form className={`relative`} onSubmit={handleSubmit}>
        <FiSearch className={`absolute top-5 left-4 text-gray-500 ${isDarkMode && 'text-lightModeElements'}`}/>
        <input type="text" className={`w-full py-4 md:w-96 pl-16 rounded-md shadow-md ${isDarkMode ? 'bg-darkModeElements text-lightModeBackground focus:border-darkModeElements focus:ring-darkModeElements border-darkModeElements' : 'border-gray-300 focus:border-gray-300 focus:ring-gray-300'} `}
        placeholder={`Search for a country...`} onChange={handleChange} value={searchTerm} />
      </form>
      {
        searchTerm &&
        <div className={`absolute w-full md:w-96 overflow-y-scroll z-10 h-24 ${isDarkMode ? 'bg-darkModeElements text-lightModeBackground focus:border-darkModeElements focus:ring-darkModeElements border-darkModeElements' : 'border-gray-300 focus:border-gray-300 focus:ring-gray-300 bg-lightModeElements'}`}>
        {
          filteredList.map((item) => (
            <div className={`${item.name.common}`} key={item.name.common}>
              <Link to={`/countryDetails/${item.name.common}`}>{ item.name.common }</Link>
            </div>
          ))
        }
      </div>
      }
    </div>
  )
}

export default Search