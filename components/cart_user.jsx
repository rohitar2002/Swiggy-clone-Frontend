import { Outlet } from "react-router-dom"
import Itemselector from "./itemselector";
import { clearitems, getSelectors, selectors, removeitem } from "../utils/projectStore/CartSlice";
import { useDispatch } from "react-redux";
import { store_state } from "../utils/projectStore/AppStore";

export const Cart_items = (Datacart) => {
    const dispatch = useDispatch();
    const { res_name, res_locality, res_city, res_img } = Datacart.data?.resInfo;

    console.log("We are isnide our cartUser page.");
    console.log(Datacart);
    console.log("Updated Store State are: ", store_state());
    console.log("calling getSelectors method: ", getSelectors());
    console.log("Selectors list: ", selectors);


    let total_price = 0;
    return (
        <div className="p-10 border shadow-lg relative -top-4">
            <div className="flex justify-between items-center">
                <div className="flex">
                    <img src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" + res_img} alt="" className="w-2/12" />
                    <div className="ml-4">
                        <h2 className="font-bold text-xl">{res_name}</h2>
                        <h2>{res_locality}, {res_city}</h2>
                        <hr className="h-[2px] w-1/2 mt-1 bg-black" />
                    </div>
                </div>
                <div className="flex justify-center w-3/12 mr-6">
                    <button type="button" className="border-2 shadow-lg bg-blue-500 text-white w-full  mx-auto h-12 font-bold rounded-lg" onClick={() => {
                        dispatch(clearitems());
                    }}>Clear Cart</button>
                </div>
            </div>

            <div className="my-10 px-8">
                <h2 className="font-bold text-lg my-4">Items Details:</h2>
                {Datacart.data.cartdata.map(({ itemInfo, itemsel }) => {
                    const { name, id } = itemInfo;
                    let price = itemInfo?.price || itemInfo?.defaultPrice;
                    price /= 100;

                    let val = itemsel;
                    total_price += (price * itemsel);
                    return (
                        <div key={id} className="flex justify-between  mt-5 w-full p-4 border border-black rounded-lg shadow-lg">
                            <h2 className="font-bold w-5/12">{name}</h2>
                            <button type="button" className="w-2/12 rounded-xl p-4 border border-black bg-slate-200 shadow-lg h-9 py-1 px-2">
                                <Itemselector data={{ id, val }} />
                            </button>
                            <h2 className="w-4"> ₹{price * itemsel}</h2>
                            <img src="https://cdn-icons-png.flaticon.com/128/484/484662.png" alt="delete-icon" className="w-9 cursor-pointer" onClick={() => {
                                dispatch(removeitem(id));
                            }} />
                        </div>
                    )
                })}

                <div>
                    <h2 className="font-bold text-lg my-4">Bill Details:</h2>
                    <div className="mt-3 border-2 p-4">
                        <div className="flex justify-between p-4">
                            <h2 className="font-bold">Item total: </h2>
                            <h2>{total_price}</h2>
                        </div>
                        <hr className="h-[3px] mt-3 bg-black" />
                        <div className="p-4 relative top-2 flex justify-center items-center">
                            <button type="button" className="border-2 shadow-lg bg-blue-500 text-white w-3/12 h-12 font-bold rounded-lg">Pay: {total_price}</button>
                        </div>

                    </div>

                </div>



            </div>
        </div>
    )
}