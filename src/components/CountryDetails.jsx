import { useParams, Link } from "react-router-dom"
import { IoArrowBackOutline } from 'react-icons/io5'
import { useSelector } from "react-redux";
import { useGetCountriesQuery } from "../services/coutriesApi";


const CountryDetails = () => {

  const { countryName } = useParams();
  const { data } = useGetCountriesQuery()
  const queryCountryData = data.find((item) => {
    return item.name.common.toLowerCase() === countryName.toLowerCase();
  })

  //Country Properties
  const nativeName = (queryCountryData.name.nativeName[Object.keys(queryCountryData.name.nativeName)[0]].common);
  const currency = Object.keys(queryCountryData.currencies)[0];
  const language = Object.entries(queryCountryData.languages);
  const languageList = language.map((item, index) => {
    let result = item[1];
    if (index !== language.length - 1) {
      result += ', '
    }
    return result;
  })

  //Border Countries
  let bors = []
  if (queryCountryData.hasOwnProperty('borders')) {
      queryCountryData.borders.forEach((bor) => {
        data.find((item) => {
            if(item.fifa === bor) {
                bors.push(item.name.common)
            }
        })
    })
    }

  const isDarkMode = useSelector((state) => state.darkMode.value);
  if (countryName === 'Macau')  {
    return <div>
      <Link to={`/`}>
        <div className={`${isDarkMode ? 'bg-darkModeElements text-lightModeElements' : 'bg-lightModeElements text-lightModeText'} flex justify-between items-center 
          w-24 py-2 px-4 align-baseline shadow-lg rounded-sm `}>
        <IoArrowBackOutline />
        Back
      </div>
      </Link>
      <div>No Data On Macau</div>
    </div>
  }
  return (
    <section className={`${isDarkMode ? 'bg-darkModeBackground' : 'bg-lightModeBackground'} mt-10`}>
      <Link to={`/`}>
        <div className={`${isDarkMode ? 'bg-darkModeElements text-lightModeElements' : 'bg-lightModeElements text-lightModeText'} flex justify-between items-center 
          w-24 py-2 px-4 align-baseline shadow-lg rounded-sm `}>
        <IoArrowBackOutline />
        Back
      </div>
      </Link>
      <div className={`md:grid md:grid-cols-2 md:gap-16`}>
        <div className={`mt-16 mb-12`}>
          <img src={queryCountryData.flags.png} alt="flag" className='h-60 w-full md:h-96'/>
        </div>
        <div className={`md:mt-11 md:py-10`}>
          <div><h1 className={`${isDarkMode ? 'text-lightModeElements' : 'text-lightModeText'} mt-4 font-semibold text-xl font-nunito md:text-2xl md:font-extrabold`}> { queryCountryData.name.common }</h1></div>
          <div className={`md:grid md:grid-cols-2`}>
            <div className={`mb-10`}>
              <h1 className={`${isDarkMode ? 'text-lightModeElements' : 'text-lightModeText'} mt-4 font-medium font-nunito text-sm mb-4 md:font-semibold`}>Native Name:
                <span className={`${isDarkMode ? 'text-lightModeElements' : 'text-lightModeText'} font-extralight text-sm`}> { nativeName }</span></h1>
              <h1 className={`${isDarkMode ? 'text-lightModeElements' : 'text-lightModeText'} font-medium font-nunito text-sm mb-4 md:font-semibold`}>Population: <span className={`${isDarkMode ? 'text-lightModeElements' : 'text-lightModeText'} font-extralight text-sm`}>{ queryCountryData.population }</span></h1>
              <h1 className={`${isDarkMode ? 'text-lightModeElements' : 'text-lightModeText'} font-medium font-nunito text-sm mb-4 md:font-semibold`}>Region: <span className={`${isDarkMode ? 'text-lightModeElements' : 'text-lightModeText'} font-extralight text-sm`}>{ queryCountryData.region }</span></h1>
              <h1 className={`${isDarkMode ? 'text-lightModeElements' : 'text-lightModeText'} font-medium font-nunito text-sm mb-4 md:font-semibold`}>Sub Region: <span className={`${isDarkMode ? 'text-lightModeElements' : 'text-lightModeText'} font-extralight text-sm`}>{ queryCountryData.subregion }</span></h1>
              <h1 className={`${isDarkMode ? 'text-lightModeElements' : 'text-lightModeText'} font-medium font-nunito text-sm mb-4 md:font-semibold`}>Capital: <span className={`${isDarkMode ? 'text-lightModeElements' : 'text-lightModeText'} font-extralight text-sm`}>{ queryCountryData.capital[0] }</span></h1>
            </div>
            <div>
              <h1 className={`${isDarkMode ? 'text-lightModeElements' : 'text-lightModeText'} mt-4 font-medium font-nunito text-sm mb-4 md:font-semibold`}>Top Level Domain:
                <span className={`${isDarkMode ? 'text-lightModeElements' : 'text-lightModeText'} font-extralight text-sm`}> { queryCountryData.tld[0] }</span></h1>
              <h1 className={`${isDarkMode ? 'text-lightModeElements' : 'text-lightModeText'} mt-4 font-medium font-nunito text-sm mb-4 md:font-semibold`}>Currencies:
                <span className={`${isDarkMode ? 'text-lightModeElements' : 'text-lightModeText'} font-extralight text-sm`}> { currency }</span></h1>
              <h1 className={`${isDarkMode ? 'text-lightModeElements' : 'text-lightModeText'} mt-4 font-medium font-nunito text-sm mb-4 md:font-semibold`}>Languages:
                <span className={`${isDarkMode ? 'text-lightModeElements' : 'text-lightModeText'} font-extralight text-sm`}> { languageList.map((item) => item) }</span></h1>
            </div>
          </div>
          <div className={`md:flex md:justify-between md:items-baseline mt-10 md:mt-0`}>
            { /* Borders */}
            <h1 className={`${isDarkMode ? 'text-lightModeElements' : 'text-lightModeText'} mt-4 md:mt-0 font-semibold text-xl font-nunito mb-3`}>Border Countries:</h1>
            <div className={`grid grid-cols-3 gap-2 pb-3 md:pb-0`}>
              {bors ?
                bors.map((item) => (
                  <Link to={`/countryDetails/${item}`} key={item}>
                <div className={`${isDarkMode ? 'bg-darkModeElements text-lightModeElements' : 'bg-lightModeElements text-lightModeText'} py-2 shadow-lg rounded-sm text-sm text-center w-24`}>
                  { item }
                </div>
              </Link>
                ))
                : <div>No Neighbour</div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CountryDetails