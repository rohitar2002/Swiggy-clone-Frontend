import { createSlice } from "@reduxjs/toolkit";

const Statedata = {
    items : [],
    resInfo : {}, 
    count: 0
}

const cartSlice = createSlice({
    name: "Cart",
    initialState : Statedata,

    reducers: {
        addresInfo : (state, action)=>{
            state.resInfo = action.payload;
            // const {res_name, res_locality, res_city, res_img} = action.payload;
            // state.resInfo
        },
        additems : (state, action)=>{
            state.items.push(action.payload);

            //  return {...state, items.push() }
        },
        incrementsel : (state, action)=>{
            const id = action.payload;
            // state.items.forEach(element => {
            //     if(element?.itemInfo?.id == id){
            //         // element?.itemsel += 1;
            //         return;
            //     }
            // });

            let i = 0;
            const itemsarr = state.items;
            while (i < itemsarr.length) {
                if (itemsarr[i]?.itemInfo.id == id) {
                    state.items[i].itemsel += 1;
                    break;
                }
                i++;
            }
           
        },

        decrementsel : (state, action)=>{
            const id = action.payload;
            // state.items.forEach(element => {
            //     if(element?.itemInfo?.id == id){
            //         // element?.itemsel -= 1;
            //         return;
            //     }
            // });

            let i = 0;
            const itemsarr = state.items;
            while (i < itemsarr.length) {
                if (itemsarr[i]?.itemInfo.id == id) {
                    if (state.items[i].itemsel == 1) {
                        state.items[i].itemsel = [];
                        state.items = itemsarr.filter((element)=>{
                            return element?.itemInfo?.id != id;
                        })
                    }

                    else{
                        state.items[i].itemsel -= 1;
                    }
                    break;
                }
                i++;
            }
        },

        removeitem : (state, action)=>{
            const id = action.payload;
            const itemsarr = state.items;

            state.items = itemsarr.filter(({itemInfo})=>{
                return itemInfo?.id != id;
            })

            if (state.items.length == 0) {
                state.resInfo = {};
            }
            
        },
        clearitems : (state)=>{
            state.items.length = 0;
            state.resInfo = {}
        }, 
        incrementcount: (state)=>{
            // state.count += 1;

            return {...state, count: state.count + 2};  
        }
    }
});
console.log("Created Cart Slice is: ", cartSlice)
console.log("Action creators: ", cartSlice.actions.additems);
console.log("Action creators: ", cartSlice.actions.removeitem);
console.log("Action creators: ", cartSlice.actions.clearitems);
console.log(cartSlice.getInitialState());
console.log(cartSlice.getSelectors());
console.log(cartSlice.reducer);
console.log(cartSlice._reducer);

export default cartSlice.reducer;
export const { additems, removeitem, clearitems, incrementsel, decrementsel, addresInfo, incrementcount } = cartSlice.actions;
export const { getSelectors, selectors } = cartSlice;