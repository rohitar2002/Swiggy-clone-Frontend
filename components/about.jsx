import { useLoaderData } from "react-router-dom"
import { useEffect } from "react";

const About = () => {
    const userdata = useLoaderData();
    // const fetchdata = async ()=>{
    //     const fetchuserdata = await fetch("http://localhost:8000/userdata");

    //     console.log(fetchuserdata);

    //     return fetchuserdata.json();
    // }

    useEffect(()=>{
        const timerId = setInterval(()=>{
            console.log("We are inside the about us Page.");
        }, 1000)

        return ()=>{
            console.log("Timer Id inside about Us page: ", timerId);
            clearInterval(timerId);
            console.log("Now , we are unmounting the About us page.");
        }
    }, [])
    console.log("we are inside the about page And my fetched data are: ", userdata);
    return (
        <div className="relative top-40">
            <h2>This is my About page.</h2>
            <div>
                <h2>id: {userdata[0]["id"]}</h2>
                <h2>Name: {userdata[0]["Name"]}</h2>
            </div>
            <div>
                <h2>id: {userdata[1]["id"]}</h2>
                <h2>Name: {userdata[1]["Name"]}</h2>
            </div>
            <div>
                <h2>id: {userdata[2]["id"]}</h2>
                <h2>Name: {userdata[2]["Name"]}</h2>
            </div>

        </div>
    )
}

export default About;
// userdata[0]["id"], " ", userdata[0]["Name"]