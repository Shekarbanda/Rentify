import { createSlice } from "@reduxjs/toolkit";

const CategorySlice = createSlice({
  name: "Category",
  initialState: {
    value: "",
    search: "",
    location: "",
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
  },
});

export const { setCategories, setSearch, setLocation } = CategorySlice.actions;
export default CategorySlice.reducer;
