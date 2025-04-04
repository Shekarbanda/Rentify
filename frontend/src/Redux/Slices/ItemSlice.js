import { createSlice } from "@reduxjs/toolkit";

const ItemSlice = createSlice({
  name: "Item",
  initialState: {
    value: [],
    load: true,
    wishlist:[]
  },
  reducers: {
    setItems: (state, action) => {
      state.value = action.payload;
    },
    setLoad: (state, action) => {
      state.load = action.payload;
    },
    setWishlist:(state, action)=>{
      state.wishlist = action.payload
    }
  },
});

export const { setItems, setLoad, setWishlist } = ItemSlice.actions;
export default ItemSlice.reducer;
