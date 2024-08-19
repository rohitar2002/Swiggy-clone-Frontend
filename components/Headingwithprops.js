import { Link } from "react-router-dom";
import { Opened } from "./Showopen";

export const Headingwithprops = (myrecivedprops) => {
    const restaurants = myrecivedprops.propslist;
    let { id, name, areaName, cuisines, avgRating, aggregatedDiscountInfoV3 } = restaurants["info"];
    console.log("Id: ", id);
    
    let {slaString} = restaurants["info"]?.sla
    console.log("I am inside the Headingwithprops component.");
    console.log("myreceivedprops: ", myrecivedprops);

    cuisines = cuisines.join(", ");

    return (
        // <div style={{
        //     "borderTop": "2px solid black",
        //     "padding": "10px"
        // }} className="text-lg text-blue-600 italic font-semibold">
        //     <h2>Id of Restaurant: {restaurants["info"]["id"]}</h2>
        //     <h2>The Name of this Restaurant is:  {restaurants["info"]["name"]}</h2>
        //     <h2>Cost of two items: {restaurants["info"]["costForTwo"]}</h2>


        //     {/* {console.log("value of Index: ", myrecivedprops.index)} */}
        //     {console.log("Inside my myrecivedprops:\n", myrecivedprops)}
        //     {console.log("Inside my proplist:\n", myrecivedprops.propslist)}
        //     {console.log("restaurants data: \n", restaurants)}


        //     <div>
        //         <Link to={"menu/" + restaurants["info"]["id"]} >
        //         <img src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/" + restaurants["info"]["cloudinaryImageId"]} style={{
        //             "margin": "auto",
        //             "display": "block"
        //         }}></img> </Link>
        //     </div>
        // </div>

        // <div className=" border-2 border-black shadow-lg m-6 rounded-xl flex flex-col w-2/12">
        <Link to={"/menu/" + id} className="relative shadow-lg m-6 rounded-xl flex flex-col h-80 w-1/5 hover:w-72 hover:m-8 hover:h-72 hover:last:text-base">
            <h2 className="absolute top-28 left-3 text-xl text-white font-bold ">{aggregatedDiscountInfoV3 ? (aggregatedDiscountInfoV3.header + " " + aggregatedDiscountInfoV3.subHeader) : <span></span>}</h2>
            <img src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/" + restaurants["info"]["cloudinaryImageId"]} className="h-3/6 rounded-t-xl" />

            <div className="m-4">
                <h2 className="font-bold mb-4 ">{name.length <= 25 ? name : (name.substring(0, 25) + "...")}</h2>
                <h2>✳ {avgRating} * {slaString}</h2>
                <h2>{cuisines.length <= 30 ? cuisines : (cuisines.substring(0, 30) + "...")}</h2>
                <h2>{areaName}</h2>
            </div>
        </Link>
        // </div>

    )
}


export const withOpenedLabel = (RestaurantCard) => {

    return (props) => {
        console.log("I am inside the HOC, Props: ", props);
        return (
            <div>
                <Opened />
                <RestaurantCard propslist={props.propslist} />
            </div>
        )
    }
}