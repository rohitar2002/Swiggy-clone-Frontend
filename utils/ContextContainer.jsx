import { createContext } from "react";

const user = createContext({
    Username: "Default User",
    Userlocation:  "Default Location"
})

export const menu  = createContext({
    "BreakFast": ["Aaloo Palanta", "Palak Palanta", "Panner Palanta"],
    "Lunch": ["Makhni Dal", "Aaloo Gobhi", "Mixed Veg", "Tandoori Naan"],
    "Dinner": ["Roti-Sabzi", "Chana Dal", "Curry-Rice", "Curry-Kofta"]
})

console.log("My created Context is: ", user);
console.log(typeof user);

console.log("My created another Context is: ", menu);
console.log(typeof user);

console.log("User name: ", user._currentValue2.Username);
console.log("User Location: ", user._currentValue2.Userlocation);
export default user;