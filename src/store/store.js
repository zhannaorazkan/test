import {configureStore} from "@reduxjs/toolkit";
import configReducer from '../features/config/configSlice'
import createConfigReducer from '../features/config/createConfigSlice'


export const store = configureStore({
    reducer: {
        configs: configReducer,
        createConfig: createConfigReducer,
    }
})
export default store;