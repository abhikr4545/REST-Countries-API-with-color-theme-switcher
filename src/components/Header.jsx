import { BsMoon } from 'react-icons/bs'
import { IoIosSunny } from 'react-icons/io'
import { useSelector, useDispatch } from "react-redux"
import { toggleDarkMode } from "../services/darkModeToggle";

const Header = () => {
  const dispatch = useDispatch()
  const isDarkMode = useSelector((state) => state.darkMode.value);
  return (
    <div className='w-full shadow-lg'>
      <div className={` flex items-center justify-between py-6 px-5 container`}>
        <h1 className={`font-nunito font-bold ${isDarkMode && 'text-white'}`}>Where in the world?</h1>
        <div onClick={() => dispatch(toggleDarkMode())} className={`flex items-center justify-between cursor-pointer`}>
          { isDarkMode ?  <IoIosSunny className='text-white mr-2' /> :  <BsMoon  className='text-black mr-2'/>}
          {isDarkMode ?  <h1 className='text-white'>Light Mode</h1> : <h1>Dark Mode</h1>}
        </div>
      </div>
    </div>
  )
}

export default Header