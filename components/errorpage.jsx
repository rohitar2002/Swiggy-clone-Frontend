import { useRouteError } from "react-router-dom"

export const Errorpage = ()=>{
    const errorinfo = useRouteError();

    console.log("errorinfo: ", errorinfo);
    return(
        <div>
            <h2>Oops Somting went Wrong!!!!!!</h2>
            <h3>Status: {errorinfo.status}</h3>
            <h3>StatusText: {errorinfo.statusText}</h3>
        </div>
    )
}