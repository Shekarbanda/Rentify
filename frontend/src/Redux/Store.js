import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slices/UserSlice";
import apislice from "./Slices/ApiSlice";
import itemslice from "./Slices/ItemSlice";
import categoryslice from "./Slices/CategorySlice";

export const store = configureStore({
  reducer: {
    User: userSlice,
    api: apislice,
    Item: itemslice,
    Category: categoryslice,
  },
});
