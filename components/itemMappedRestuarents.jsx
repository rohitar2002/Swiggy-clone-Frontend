import { useEffect, useState } from "react"
import { Shimmer } from "./Shimmer";
import { useParams } from "react-router-dom";
import { Headingwithprops } from "./Headingwithprops"

const AllresMappedItem = () => {
    const [resInfo, setresInfo] = useState([]);
    const [name, setname] = useState("");
    const [description, setdescription] = useState("");
    const params = useParams();

    console.log("Params: ", params);
    const { resId, restag } = params;


    const resAPIsub1 = "&sortBy=&filters=&type=rcv2&offset=0&page_type=null";
    const API = `http://localhost:8000/api/dapi/restaurants/list/v5?lat=29.3986523&lng=76.971507&collection=${resId}&tags=${restag}` + resAPIsub1;

    useEffect(() => {
        fetch(API, {
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((res) => (res.json()))
            .then((data) => {
                console.log(("Data: ", data));

                const filteredList = data?.data?.cards.filter((itemcard) => {
                    console.log("We have entered into the filter method for resInfo List.", itemcard);

                    return (itemcard?.card?.card["@type"] == "type.googleapis.com/swiggy.presentation.food.v2.Restaurant");
                })

                console.log("FilteredList: ", filteredList);
                
                setresInfo(filteredList);

                setname(data?.data?.cards[0]?.card?.card?.title);
                setdescription(data?.data?.cards[0]?.card?.card?.description);

                
            })
    }, [])

    useEffect(()=>{
        console.log("resInfo List: ", resInfo);
        
    }, [resInfo])

    return resInfo.length == 0 ? (
        <div className="relative top-40">
            <h2>Welcome to see the resList for selected item.</h2>
        </div>
    ) : (
        <div className="relative top-36 p-10">
            <div className="flex flex-col justify-between h-20">
                <h2 className="font-bold text-4xl">{name}</h2>
                <h2 className="text-xl">{description}</h2>
            </div>

            <div>
                <h2 className= "font-bold text-2xl mt-10">Restaurants to explore</h2>

                <div className="flex flex-wrap justify-around mt-6">
                    {resInfo.map((rescard)=>{
                        const restaurants = rescard?.card?.card;

                        console.log("My resCard: ", restaurants);
                        
                        return <Headingwithprops key = {restaurants["info"]["id"]} propslist={restaurants} />
                       
                    })}
                </div>
            </div>
        </div>
    )
}

export default AllresMappedItem;