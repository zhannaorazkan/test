import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getConfigs} from "../../api/configs";

const initialState ={
    data: null,
    loading: false,
    error: null,
}
export const fetchConfigs = createAsyncThunk(
    'configs/fetchConfigs',
    async () => {
        const response = await getConfigs();
        return response;
    }
)

const configSlice = createSlice({
    name: 'configs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchConfigs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchConfigs.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchConfigs.rejected, (state, action) => {
                console.log(action);
                state.isLoading = false;
            });
    }
})
export default configSlice.reducer;