export const Contact = ()=>{
    const postdata = async ()=>{
        const userdata = {
            "Name": "Shubham",
            "Address": "karnal",
            "id": 20
        }

        const options = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },

            body: JSON.stringify(userdata),
        }
        const response = await fetch("http://localhost:8000/postdata", options);

        console.log("Now we are inside the contact page.");
        console.log("response status: ", response.status);
        console.log("response statusText: ", response.statusText);

        const res_data = await response.json();

        console.log("Received response from the server by POST request are: ", res_data);

        // const res = await fetch("http://localhost:8000/postdata");
        // console.log("After making get request for id: 101.");
        // console.log(res.status);
        // console.log(res.status);

        // const data_101 = await res.json();
        // console.log("Inside the post data function, data_101: ", data_101);
        
        // return data_101;
    }

    postdata();
    // console.log("Outside the post data function, data_101: ", postdata());
    return(
        <div className="relative top-40">
            <h2>This is my Contact us page.</h2>           
        </div>
    )
}