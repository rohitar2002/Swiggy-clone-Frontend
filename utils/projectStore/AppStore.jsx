import { configureStore } from "@reduxjs/toolkit";
import cartreducer from "./CartSlice"

const store = configureStore({
    reducer : {
        cart : cartreducer,
    }
});

console.log("Created Store is: ", store);
console.log("Dispatch method: ", store.dispatch);
console.log("Store State are: ", store.getState());
export default store;
export const store_state = store.getState;