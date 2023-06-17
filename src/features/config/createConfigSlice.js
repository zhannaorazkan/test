import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    formData: {
        server_name: '',
        server_host: '',
        kibana_index: '',
        elasticsearch_hosts: [],
        elasticsearch_username: '',
        elasticsearch_password: '',
    },
    booleanData: {
        elasticsearch_preserveHost: true,
        logging_silent: true,
    },
    numberData: 0,
};

const createConfigSlice = createSlice({
    name: 'createConfig',
    initialState,
    reducers: {
        updateFormData: (state, action) => {
            const { name, value } = action.payload;
            state.formData = {
                ...state.formData,
                [name]: Array.isArray(state.formData[name])
                    ? value.split(',').map((item) => item.trim())
                    : value,
            };
        },

        updateBooleanData: (state, action) => {
            const {name, value} = action.payload;
            state.booleanData = {
                ...state.booleanData,
                [name]: value,
            };
        },
        updateNumberData: (state, action) => {
            state.numberData = action.payload;
        }
    }
})

export const { updateFormData, updateBooleanData, updateNumberData} = createConfigSlice.actions;

export default createConfigSlice.reducer;