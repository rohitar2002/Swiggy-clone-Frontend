// Introduction of Key and props of componensts in React JS


//props in components.......
import { useState, useEffect } from "react"
import { Shimmer } from "./Shimmer"
import { Headingwithprops } from "./Headingwithprops"
import useFetch from "../utils/useFetchData"
import { changedatafunction } from "../utils/changedList"
import { withOpenedLabel } from "./Headingwithprops"
import { useSelector, useDispatch } from "react-redux"
import { incrementcount } from "../utils/projectStore/CartSlice"
import ItemAllRes from "./itemAllrestaurents"

const Home = () => {
    let [myval, setmyval] = useState(" ");
    let [inputtext, setinputtext] = useState(" ");
    const countval = useSelector(store => store.cart.count);
    const dispatch = useDispatch();

    const { resdata, fillteredresdata, itemres, setfillteredresdata } = useFetch("http://localhost:8000/api/dapi/restaurants/list/v5?lat=29.3986523&lng=76.971507&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");

    const OpenedLabel = withOpenedLabel(Headingwithprops)

    console.log("setList: ", setfillteredresdata);
    console.log("received data for what is in our mind: ", itemres);
    useEffect(() => {
        console.log("We are inside the useEffect function and run after its dependencies has changed.");

        return () => {
            console.log("for cleanup tasks function which is created from dependencies changed component.");
        }
    }, [myval])


    console.log("We have Entered into the Home component.");

    const changeEvent = (e_cont) => {
        setinputtext(e_cont.target.value);

        console.log("Change Event occur: ", inputtext);
        console.log("Change Event occur with the following value: ", e_cont.target.value);
    }

    const datachanged = async (event) => {
        event.preventDefault();

        console.log("Data has changed.");

        console.log("Before changes: ", fillteredresdata);
        let fillteredList = resdata.filter((res_item, index) => {
            console.log("Index: ", index);
            console.log("Name: ", (res_item["info"]["name"]));
            console.log("Name: ", (res_item["info"]["cuisines"]));
            console.log("inputtext: ", inputtext.toLowerCase());


            let cuisines_string = (res_item["info"]["cuisines"]).join(" ");
            console.log("cuisines_string: ", cuisines_string);

            return ((cuisines_string.toLowerCase())).includes(inputtext.toLowerCase());
        })

        setfillteredresdata(fillteredList);

        console.log("After changes: ", fillteredresdata);
    }

    const topratedres = (event) => {
        event.preventDefault();
        new Promise((resolve, reject) => {
            console.log("Statment indicate changing the state of state variable.");
            setfillteredresdata(changedatafunction(resdata));

            resolve();
        })
            .then(() => {
                // console.log("resData is change happend on click Event:\n", resdata);
                console.log("Total resData item:\n", tot_res);
            })

    }
    console.log("This statement is to be print before returning jsx.");
    let tot_res = fillteredresdata.length;

    if (tot_res == 0) {

        console.log("Hello tot_res == 0, condition is true.");
        return (
            <div className="relative top-40">
                <Shimmer />
            </div>
        )
    }
    return (
        <div className="relative top-32 ">
            <ItemAllRes itemAllres = {itemres}/>

            <div>
                <div>
                    <span className="p-4 font-bold text-2xl m-4 ">Restaurants with online food delivery in Panipat</span>
                    <button type="button" className="border-2 border-solid border-black px-3 h-12 bg-blue-500 text-white ml-10 rounded-lg" onClick={topratedres}>Top Rated Restaurants</button>

                    <input type="text" id="search-input" style={{
                        height: "40px",
                        width: "200px",
                        marginLeft: "100px"
                    }} value={inputtext} onChange={changeEvent} className="border border-solid border-black text-center" />

                    <button className="h-15 border-2 border-solid border-black text-lg rounded-lg py-2 px-7 ml-5 bg-blue-500 text-white" onClick={datachanged}>Search</button>
                    {/* </div> */}
                </div>
                <div className="flex flex-wrap justify-around mt-6">
                    {

                        (fillteredresdata).map((item, index) => {
                            console.log("hello, I am inside the map method.", item["info"]["isOpen"]);
                            if (index % 2 != 0) {
                                item["info"]["isOpen"] = false;
                            }

                            return (
                                // item["info"]["isOpen"] ? <OpenedLabel key={item["info"]["id"]} propslist={item} /> :
                                <Headingwithprops key={item["info"]["id"]} propslist={item} />
                            )
                        })
                    }
                </div>


            </div>
        </div>
    )
}


export default Home;
