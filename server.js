const app = require("express")();
const { createProxyMiddleware } = require("http-proxy-middleware");
const userdata = require('./mockdata')
const bodyparser = require('body-parser')
const cors = require('cors')

console.log("My import user data are: ", userdata);
console.log("typeof userdata is: ", typeof userdata);
console.log("At index 0: ", userdata[0], " ", userdata[0]["id"], " ", userdata[0]["Name"]);
console.log("At index 1: ", userdata[1], " ", userdata[1]["id"], " ", userdata[1]["Name"]);
console.log("At index 2: ", userdata[2], " ", userdata[2]["id"], " ", userdata[2]["Name"]);

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', "GET, POST, PUT, OPTIONS");
    res.header('Access-Control-Allow-Headers', "Content-type");
    

    if ( req.method === 'OPTIONS') {
        res.sendStatus(200);
    }
    else{
        next();
    }
})

// app.use(bodyparser.json());
app.get("/userdata", (req, res, next)=>{
    // if (req.path == "/userdata") {
        res.json(userdata); 
    // }
    // next();
})

// app.use((req, res, next)=>{
//     if (req.path == "/postdata") {
//         const data = req.body;
//         console.log("Received at localhost:8000, data: ", data);

//         res.json(data);
//     }
//     next();
// })
 
app.use("/api", createProxyMiddleware({
    target : "https://www.swiggy.com/", 

    changeOrigin: true,
    pathRewrite: {
        '^api': ""
    }
}))

// app.use((req, res, next)=>{
//     res.header('Access-Control-Allow-Origin', "*");

//     if ( req.method === 'OPTIONS') {
//         res.sendStatus(200);
//     }
//     else{
//         next();
//     }
// })

// app.options("/postdata", cors());

// app.use(cors({
//     origin: "http://localhost:7000",
// }))


app.use(bodyparser.json());
app.post("/postdata", (req, res)=>{
    // res.header('Access-Control-Allow-Origin', "*");
    // res.setHeader('Access-Control-Allow-Origin', "*",)

    const data = req.body;
        console.log("Received at localhost:8000, data: ", data);

        userdata.push(data);

        console.log(userdata);
        res.status(201);
        res.json(data);
 
})

app.listen(8000, ()=>{
    console.log("Server is listning now.....");
})