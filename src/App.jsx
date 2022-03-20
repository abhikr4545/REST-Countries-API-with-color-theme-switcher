import { useSelector } from "react-redux"
import { useGetCountriesQuery } from "./services/coutriesApi"
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import CountryDetails from "./components/CountryDetails";
import { Routes, Route } from "react-router-dom";

const App = () => {

  const { isLoading } = useGetCountriesQuery()
  const isDarkMode = useSelector((state) => state.darkMode.value);

  if(isLoading) return <div>Loading...</div>

  return (
    <section className={`${isDarkMode ? 'bg-darkModeBackground' : 'bg-lightModeBackground'}`}>
      <Header />
      <section className={`${isDarkMode ? 'bg-darkModeBackground' : 'bg-lightModeBackground'} container`}>
        <Routes>
          <Route path="/" element={ <HomePage /> }/>
          <Route path="/countryDetails/:countryName" element={ <CountryDetails />}/>
        </Routes>
      </section>
    </section>
  )
}

export default App