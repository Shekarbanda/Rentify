import { createSlice } from "@reduxjs/toolkit";

const CategorySlice = createSlice({
  name: "Category",
  initialState: {
    value: "",
    search: "",
    location: "",
    prevLoc :"",
    filters:{}
  },
  reducers: {
    setCategories: (state, action) => {
      state.value = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setPrevLoc:(state,action)=>{
      state.prevCat = action.payload;
    },
    setFilters: (state, action) => {
      const { filter, data } = action.payload;
      state.filters[filter] = data;
    },
  },
});

export const { setCategories, setSearch, setLocation, setPrevLoc, setFilters } = CategorySlice.actions;
export default CategorySlice.reducer;
