import { createSlice } from "@reduxjs/toolkit";

const ApiSlice = createSlice({
  name: "api",
  initialState: {
    value: "http://localhost:8000/api/v1/",
  },
  reducers: {},
});

export default ApiSlice.reducer;
