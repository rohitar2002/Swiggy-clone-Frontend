import React from "react";
import MemberDetails from "./Team_members";
import { Shimmer } from "./Shimmer";

export class TeamDetails extends React.Component {
    constructor() {
        super();
        console.log("Parent class constructor !");

        this.state = {
            data_container: null, 
            count: 0,
        }
    }
    async componentDidMount() {
        console.log("Parent Mounting happing !");

        const dataList = await fetch("https://fakestoreapiserver.reactbd.com/photos");
        const data = await dataList.json();

        console.log("fetched data from github: ", data);

        this.setState({
            data_container: data,
            count: 1,
        })
        // this.timer = setInterval(()=>{
        //     console.log("I am Inside my setInterval method.");
        // }, 1000)
    }

    componentDidUpdate(preProps, preState) {
        console.log("preProps: ", preProps);
        console.log("preState: ", preState);

        if (preState.data_container != this.state.data_container) {
            console.log("state - data has changed.");
        }
        if (preState.count != this.state.count) {
            console.log("state - count has changed.");
        }
        console.log("This is Parent Updation call.");
    }

    componentWillUnmount(){
        // console.log("Id of timer: ", this.timer);
        // clearInterval(this.timer);
        console.log("Parant Component Unmounting Happened.");
    }
    render() {
        console.log("Parent class render function !");
        const UsersList = this.state.data_container;

        return this.state.data_container == null ? <Shimmer /> : (
            <div className="membersContainer relative top-40">
                <h2 style={{ "margin": "35px 20px" }}>Details of All Members: </h2>

                <ul>
                    {UsersList.map((post) => {
                         const {_id, title, url} = post;
                        return (
                            <li key={_id} >
                                <MemberDetails myurl={url} id = {_id} mytitle = {title}/>
                            </li>
                        )
                    })}
                </ul>

                {/* <MemberDetails url = "https://api.github.com/users/rohitar2002" /> */}
                {/* <MemberDetails url />
                <MemberDetails name = {"Priyanshu Satija"} post = {"Android Developer"} address = {"Model Town, Panipat"}/>
                <MemberDetails name = {"Tony Kakkar"} post = {"Graphic Designer"} address = {"Tehsil Camp, Panipat"}/> */}
                {/* <MemberDetails name = {"Rohit Arora"} post = {"Sofware Engineer"} address = {"Panipat, Haryana"}/>
                <MemberDetails name = {"Rohit Arora"} post = {"Sofware Engineer"} address = {"Panipat, Haryana"}/>
                <MemberDetails name = {"Rohit Arora"} post = {"Sofware Engineer"} address = {"Panipat, Haryana"}/>
                <MemberDetails name = {"Rohit Arora"} post = {"Sofware Engineer"} address = {"Panipat, Haryana"}/> */}
            </div>
        )
    }
}


