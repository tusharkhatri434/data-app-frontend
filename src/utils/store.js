import { configureStore } from '@reduxjs/toolkit'
import appDataSlice from './appDataSlice'

export const store = configureStore({
  reducer: {
    appData: appDataSlice,
  },
})