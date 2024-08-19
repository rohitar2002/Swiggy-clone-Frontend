import { useSelector } from "react-redux"
import { Cart_items } from "./cart_user";
import { Link } from "react-router-dom";

export const Cart = () => {
    const cartdata = useSelector(store => store.cart.items);
    const resInfo = useSelector(store => store.cart.resInfo);

    console.log("We are inside the cart page and received resInfo are: ", resInfo);

    return (
        <div className="relative top-40 mx-auto w-7/12  py-4 my-5 ">
            {cartdata.length == 0 ? (<div className="flex justify-center items-center flex-col h-10/12 py-10">
                <img src="https://cdn.pixabay.com/photo/2020/12/31/12/28/cook-5876388_640.png" className="w-3/12" alt="cart-icon" />

                <h2 className="font-bold text-xl text-center m-10">Cart is Empty now. Please Fill it firstly!</h2>

                <Link to={"/"}>
                    <button type="button" className="p-4 rounded-xl text-white bg-blue-500">SEE RESTAURENTS NEAR YOU</button>
                </Link>
            </div>) :
                <Cart_items data={{ cartdata, resInfo }} />}
        </div>
    )
}