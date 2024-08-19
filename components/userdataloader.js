export const fetchdata = async ()=>{
    const fetchuserdata = await fetch("http://localhost:8000/userdata");

    // fetchuserdata.then((res)=>{
    //     console.log(res.status);
    //     console.log(res.statusText);
    //     console.log("Fetched data from server, before conversion, are: ", res);

    //     return res.json();
    // }).then((data)=>{
    //     console.log("Fetched data from server, after conversion, are: ", data);

    //     return data;
    // })

    console.log("We are inside the loader function.");
    console.log(fetchuserdata.status);
    console.log(fetchuserdata.statusText);
    console.log("Fetched data from server, before conversion, are: ", fetchuserdata);

    const data = await fetchuserdata.json();
    return data;
}