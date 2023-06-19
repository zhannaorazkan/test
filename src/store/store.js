import {configureStore} from "@reduxjs/toolkit";
import configReducer from '../features/config/configSlice'
import createConfigReducer from '../features/config/createConfigSlice'
import authReducer from  '../features/auth/authSlice'


export const store = configureStore({
    reducer: {
        configs: configReducer,
        createConfig: createConfigReducer,
        auth: authReducer,
    }
})
export default store;