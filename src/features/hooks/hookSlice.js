import { createSlice } from "@reduxjs/toolkit";
import { fetchDataFromApi } from "../../components/utils/api";

const initialState = {
    loading: false,
    searchResults: [],
    selectCategory: "New",
    mobileMenu: false,
    updateComment: ''
}

export const hookSlice = createSlice({
    name:'hooks',
    initialState,
    reducers: {
        toggleLoading: (state) => {
            state.loading = !state.loading
        },
        toggleMobilMenu: (state) => {
            state.mobileMenu = !state.mobileMenu
        },
        addUpdateComment: (state, action) => {
            state.updateComment = action.payload
        },
        addSearchResult: (state, action) => {
            console.log(action.payload)
            state.searchResults = action.payload
        },
        addSelectedCategory: (state, action) => {
            console.log(action.payload)
            state.selectCategory = action.payload
        },
        fetchSearchResults: async (state) => {
            try {
            //   state.loading = true;
              const response = await fetchDataFromApi(`videos`,{params: {query: 'a'}})
              console.log(response)
            //   state.searchResults = response.data;
            } catch (error) {
              console.error(error);
            } finally {
            //   state.loading = false;
            }
          },
    }
})

export const {toggleLoading, toggleMobilMenu, addSearchResult, addSelectedCategory, addUpdateComment, fetchSearchResults} = hookSlice.actions

export default hookSlice.reducer