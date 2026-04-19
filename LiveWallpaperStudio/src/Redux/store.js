import {configureStore} from '@reduxjs/toolkit'
import searchSlice from './features/SearchSlice'

const store =configureStore({

    reducer:{

    search:searchSlice

    }

})

export default store;