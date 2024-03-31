import { configureStore } from '@reduxjs/toolkit'
import cartrReducer from './cartSlice'

export default configureStore({
  reducer: {
    cart: cartrReducer,
  },
})