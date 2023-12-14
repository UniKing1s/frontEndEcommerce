import { createSlice } from "@reduxjs/toolkit";
export const cartSlice = createSlice({
  name: "cart",
  initialState: JSON.parse(localStorage.getItem("cart"))
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  reducers: {
    updateCart: (state, action) => {
      const index = state.findIndex(
        (element) => element.masp === action.payload.masp
      );
      if (index >= 0) {
        state[index].quantity = state[index].quantity + action.payload.quantity;
        state[index].totalPrice =
          state[index].totalPrice + action.payload.totalPrice;
      } else {
        state.push(action.payload);
      }
      return;
      //   state.push(action.payload);
    },
    updateArrayCart: (state, action) => {
      // state = [];
      if (state.length < 1) {
        action.payload.forEach((value) => state.push(value));
      }
      // state = action.payload.map((x) => x);
      //   state.push(action.payload);
      return;
    },
    deleteCart: (state, action) => {
      const index = state.findIndex(
        (element) => element.masp === action.payload.masp
      );
      // state = state.filter((element) => element.masp !== action.payload.masp);
      // console.log(index);
      if (index >= 0) {
        state.splice(index, 1);
      }
    },
  },
});
export const { updateCart, updateArrayCart, deleteCart } = cartSlice.actions;
export default cartSlice.reducer;
