import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  length: 0,
  items: {},
};

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const newLength = state.length + 1;
      if (state.items[item.name]) {
        return {
          length: newLength,
          items: {
            ...state.items,
            [item.name]: {
              ...item,
              amount: state.items[item.name].amount + 1,
            },
          },
        };
      } else {
        return {
          length: newLength,
          items: {
            ...state.items,
            [item.name]: {
              ...item,
              amount: 1,
            },
          },
        };
      }
    },
    removeFromCart(state, action) {
      const item = action.payload;
      const newLength = state.length - 1;
      if (state.items[item.name]) {
        if (state.items[item.name].amount === 1) {
          const { [item.name]: omit, ...rest } = state.items;

          return {
            length: newLength,
            items: rest,
          };
        }
        return {
          length: newLength,
          items: {
            ...state.items,
            [item.name]: {
              ...item,
              amount: state.items[item.name].amount - 1,
            },
          },
        };
      } else {
        return state;
      }
    },
    setCart(state, action) {
      return action.payload;
    },
  },
});

export const cartActions = cart.actions;
export default cart.reducer;
