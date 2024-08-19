import { useEffect, useState, useContext } from "react"
import { Shimmer } from "./Shimmer";
import { useParams } from "react-router-dom";
import { CategoryItem } from "./itemsCatagory";
import user, { menu } from "../utils/ContextContainer";

import { Outlet } from "react-router-dom";
import ItemShimmer from "./itemscat_shimmer";

export const MenuList = () => {
    const [MenuList, setMenuList] = useState(null);
    const [ItemIndex, setItemIndex] = useState(null);
    const MenuData = useContext(menu);
    let {Username, Userlocation, UserAge, Namechanger} = useContext(user);
    let showItems  = false;

    const {resid} = useParams();

    console.log("We are inside our MenuItems module, UserData: ", Username);
    console.log("Fetched params:", resid);
    // https://www.swiggy.com/restaurants/pizza-hut-sector-18-sector-26-chandigarh-435686

    const handler = ()=>{
        setshowItems(true);
    }
    const fetchList = async () => {
        const Fetch_URL = "http://localhost:8000/api/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=30.73390&lng=76.78890&restaurantId=" + resid + "&catalog_qa=undefined&submitAction=ENTER";
        const data = await fetch(Fetch_URL);

        console.log(data.status);
        console.log(data.statusText);

        const List = await data.json();
        // console.log("Actual data comes from swiggy api are:\n", List);

        setMenuList(List);
    }

    const changename = (event)=>{
        Username = event.target.value;
        console.log("Changed Username: ", Username)
    }

    useEffect(() => {
        fetchList();
    }, []);


    if (MenuList == null) {
        return <ItemShimmer />
    }
    const { name, city, locality, costForTwoMessage, cuisines, cloudinaryImageId } = MenuList?.data?.cards[2]?.card?.card?.info;
    const { cards } = MenuList?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR;

    console.log("Inside MenuList, received data are:", MenuList?.data?.cards[2]?.card?.card?.info);
    const resInfo = {
        res_name : name,
        res_locality: locality,
        res_city: city,
        res_img: cloudinaryImageId,
    }

    const itemsList = cards.filter((cardItem)=>{
        return (cardItem?.card?.card["@type"] == "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory") ;
    })

    console.log("itmesLists: \n", itemsList);
    // console.log("Title: ", title);
    // console.log("Recommended items List:\n",  itemCards);
    return (
        <div className="relative top-40 ">
            <div className="w-1/2 mx-auto shadow-xl p-6 mb-4 flex justify-center">
                <h2 className="text-lg font-bold mx-3">UserName: </h2>
                <input type="text" className="border border-black p-1" value={Username} onChange={changename}/>
            </div>
            <div className="w-1/2 mx-auto border-2 border-black shadow-xl p-6 flex justify-between">
               <div>
                <h2 className="text-xl font-bold">{name}</h2>
                <h2 className="text-lg">{cuisines.join(", ")} - {costForTwoMessage}</h2>
                <h2 className="text-lg">{locality}, {city}</h2>
               </div>
               <div className="flex flex-col items-center">
                    <img src="https://cdn-icons-png.flaticon.com/128/2991/2991231.png" alt="location-img" className="w-12"/> 
                    <user.Consumer>
                        {({UserData, MenuData})=>{
                            console.log("We are inside the render prop of Consumer Component. And Its fetched data are: ", UserData);
                            console.log("We are inside the render prop of Consumer Component. And Its fetched data are: ", MenuData);

                            return ( 
                                <h2>{ Userlocation} {UserAge}</h2>   
                             )
                        }}    
                    </user.Consumer>   
               </div>
            </div>

            <div className="w-1/2 mx-auto p-6">
                {itemsList.map((singleItem, index)=>{
                    const {title, itemCards} = singleItem?.card?.card;
                    console.log("title: ", title);
                    console.log("itemsCards: ", itemCards);
                    console.log("index inside the map function: ", index);

                    // if (index == ItemIndex) {
                    //     showItems = true;
                    // }
                    // else{
                    //     showItems = false;
                    // }

                    showItems = index == ItemIndex ? true : false;
                    return (
                        // <div key={title} className="border border-b-black p-4 my-4 shadow-xl">
                        //     <div className="flex justify-between">
                        //        <h2 className="text-lg font-bold"> {title} ({itemCards.length}) </h2>
                        //        <span>⬇</span>
                        //     </div>


                        // </div>
                        <CategoryItem key = {title} props = {{title, itemCards, showItems, ItemIndex, setItemIndex, index, resInfo}} />
                    )
                })}

                <div className="border border-gray-500 p-4 shadow-lg">
                    <h2 className="font-bold text-lg">Best Choice Foods</h2>
                    <div className="m-4 text-lg">
                        <h2>▶ {MenuData.BreakFast.join(",  ")} </h2>
                        <h2>▶ {MenuData.Lunch.join(",  ")} </h2>
                        <h2>▶ {MenuData.Dinner.join(",  ")} </h2>
                    </div>
                </div>
            </div>
        </div>
    )
}