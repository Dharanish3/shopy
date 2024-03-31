import { createSlice } from "@reduxjs/toolkit";







export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    list:  localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [],
    quantity: 0,
    totalPrice: 0,
  },



  reducers: {
    // Add to cart
    addCart: (state, action) => {
      const check = state.list.findIndex(
        (item) => item._id === action.payload._id
      );

      if (check !== -1) {
        state.list[check].quantity += 1;
      } else {
        state.list.push({ ...action.payload, quantity: 1 });
      }

      state.totalPrice = state.list.reduce(
        (sum, item) => sum + parseInt(item.price.replace(/,/g, '') * item.quantity),
        0
      );
       localStorage.setItem("list", JSON.stringify(state.list));
    },
   


    // Remove Cart
    removeCart: (state, action) => {
      state.list = state.list.filter((item) => item._id !== action.payload._id);
      state.totalPrice = state.list.reduce(
        (sum, item) => sum + parseInt(item.price.replace(/,/g, '') * item.quantity),
        0
      );
      localStorage.setItem("list", JSON.stringify(state.list));
    },




    // Update Quantity
    updateQuantity: (state, action) => {
      const { _id, quantity } = action.payload;
      const check = state.list.findIndex((item) => item._id === _id);

      if (check !== -1) {
       
        state.list[check].quantity =
          quantity !== undefined ? quantity : state.list[check].quantity + 1;
      }

      state.totalPrice = state.list.reduce(
        (sum, item) => sum + parseInt(item.price.replace(/,/g, '') * item.quantity),
        0
      );
      localStorage.setItem("list", JSON.stringify(state.list));
    },

    // Clear Cart
    clearCart : (state,action) => {
      state.list = [],
      state.quantity =0,
      state.totalPrice=0
      localStorage.setItem("list", JSON.stringify(state.list));
    }

  },
});

export const { addCart, removeCart, updateQuantity ,clearCart} = cartSlice.actions;

export default cartSlice.reducer;
