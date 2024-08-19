import { useState, useEffect } from "react";

const useFetch = (dataApi)=>{
    let [resdata, setresdata] = useState([]);
    let [fillteredresdata, setfillteredresdata] = useState([]);
    let [itemres, setitemres] = useState([]);

    useEffect(() => {
        console.log("Now, we are calling useEffect hook after first Rendering DOM, inside useFetch hook.");

            fetchData();
    
        return () => {
            console.log("I am inside the function which can used for cleanup tasks.");
        }
    }, [])


    console.log("We are now Entering into useFetch hook.");

    const fetchData = async ()=>{
        try {
            let data = await fetch(dataApi);
    
            let jsondata = await data.json();
            
            console.log("fetch data from swiggy API are \n", jsondata);
            console.log(jsondata?.data?.cards[1]?.card.card?.gridElements?.infoWithStyle?.restaurants);
            
            setresdata(jsondata?.data?.cards[1]?.card.card?.gridElements?.infoWithStyle?.restaurants);
            
            setfillteredresdata(jsondata?.data?.cards[1]?.card.card?.gridElements?.infoWithStyle?.restaurants); 

            setitemres(jsondata?.data?.cards[0]?.card.card?.gridElements?.infoWithStyle?.info);
        }
        catch(err){
            console.log("Here, We Encounter Error regarding fetching data from swiggy.\n", err);
        }
    }

    
    console.log("We are now returing from useFetch hook.", setfillteredresdata);
    return {resdata, fillteredresdata, itemres, setfillteredresdata};
}

export default useFetch;