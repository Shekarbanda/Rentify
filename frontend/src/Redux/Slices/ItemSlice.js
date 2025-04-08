import { createSlice } from "@reduxjs/toolkit";

const ItemSlice = createSlice({
  name: "Item",
  initialState: {
    value: [],
    load: true,
    wishlist:[],
    allItems:[],
    itemDetails:{}
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
    },
    setAllItemsState: (state,action)=>{
      state.allItems = action.payload
    },
    setItemDetails: (state, action) => {
      const { itemId, data } = action.payload;
      state.itemDetails[itemId] = data;
    }
  },
});

export const { setItems, setLoad, setWishlist, setAllItemsState, setItemDetails } = ItemSlice.actions;
export default ItemSlice.reducer;
