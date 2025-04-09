import { createSlice } from "@reduxjs/toolkit";

const ApiSlice = createSlice({
  name: "api",
  initialState: {
    value: "https://rentify-backend-7i2g.onrender.com/api/v1/",
  },
  reducers: {},
});

export default ApiSlice.reducer;
