import {configureStore} from '@reduxjs/toolkit'
import searchSlice from './features/SearchSlice'
import collectionSlice from './features/CollectionSlice';

const store =configureStore({

    reducer:{

    search:searchSlice,
    collection:collectionSlice

    }

})

export default store;