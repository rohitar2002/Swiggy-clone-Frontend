import { Link } from "react-router-dom";
import user from "../utils/ContextContainer";
import { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";

export const Header = () => {
    const [btnStatus, setbtnStatus] = useState("Login");
    const [showStatus, setshowStatus] = useState(checkOnline());
    const { Username } = useContext(user);
    const CartData = useSelector(store => store.cart.items);

    console.log("Received CartData are: ", CartData);

    // console.log("Fetched User Context are: ", UserData);
    console.log("Fetched User Context, using its property, are: ", user._currentValue);

    const changeStatus = () => {
        setbtnStatus(btnStatus == "Login" ? "Logout" : "Login");
    }

    // console.log();
    function checkOnline() {
        console.log("Navigator.online Value: ", navigator.onLine);
        const status = window.navigator.onLine ? "✅" : "🔴";

        return status;
    }
    useEffect(() => {
        console.log("Btn Status has been changed.");
    }, [btnStatus])

    useEffect(() => {
        console.log("Online Status has been changed.");
    }, [showStatus])

    window.addEventListener("online", () => {
        setshowStatus(checkOnline());
    })
    window.addEventListener("offline", () => {
        setshowStatus(checkOnline());
    })
    return (
        <header className="flex justify-between bg-violet-600 xs:bg-blue-500 smd:bg-slate-600 sm:bg-red-400 md:bg-yellow-100 items-center lg:bg-pink-300 shadow-xl fixed top-0 w-full h-[120px] z-10 mt-0">
            <Link to = {"/"}>
            <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/fast-food-restaurant-logo%2C-restaurant-logo-design-template-33255790cb8e1186b28609dd9afd4ee6_screen.jpg?ts=1668794604" alt="res-logo" className="w-24 h-24 m-2 ml-4" />
            </Link>
            <nav className="w-1/2 flex items-center">
                <ul className="flex justify-between items-center w-full m-4 text-lg">
                    <p className="p-4">Online Status: {showStatus}</p>
                    <li className="hover:border-2 hover:rounded-lg hover:px-3 hover:py-2 hover:bg-pink-400"><Link to="/">Home</Link></li>
                    <li className="hover:border-2 hover:rounded-lg hover:px-3 hover:py-2 hover:bg-pink-400"><Link to="/about">About</Link></li>
                    <li className="hover:border-2 hover:rounded-lg hover:px-3 hover:py-2 hover:bg-pink-400"><Link to="/contact">Contact Us</Link></li>
                    <li className="hover:border-2 hover:rounded-lg hover:px-3 hover:py-2 hover:bg-pink-400"><Link to="/team">Team Details</Link></li>
                    <li className="hover:border-2 hover:rounded-lg hover:px-3 hover:py-2 hover:bg-pink-400 relative"><Link to="/cart">
                        {/* Cart - ({CartData.length}) */}
                        <img src="https://cdn-icons-png.flaticon.com/128/1170/1170576.png" alt="cart icon" className="w-10" />
                        <h4 className="bg-red-400 absolute bottom-6 p-1 rounded-xl left-6">{CartData.length}</h4>
                    </Link></li>
                    {btnStatus == "Login" ? <button className="border-2 border-solid border-black px-3 py-2 bg-green-500 text-white rounded-lg" type="button" onClick={changeStatus}>{btnStatus}</button>
                        : <li className="flex flex-col items-center cursor-pointer" onClick={changeStatus}>
                            <img src="https://cdn-icons-png.flaticon.com/128/3001/3001758.png" alt="User-img" className="w-10" />
                            <h2>{Username}</h2>
                        </li>}
                </ul>

            </nav>
        </header>
    )
}