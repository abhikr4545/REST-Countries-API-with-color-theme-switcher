import { configureStore } from "@reduxjs/toolkit";
import { countriesApi } from "../services/coutriesApi";
import darkModeReducer from "../services/darkModeToggle";

export default configureStore({
  reducer: {
    [countriesApi.reducerPath]: countriesApi.reducer,
    darkMode: darkModeReducer
  }
})