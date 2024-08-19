import { Component } from "react";

class MemberDetails extends Component {
    constructor(myprops){
        super(myprops);
        console.log(myprops.myurl + " constructor !");
        console.log("Received props Values are: ", myprops);

        console.log("By using this keyword: ", this, this.props);

        this.state = {
           UsersPost: null,
        }
    }

    // increment(){
    //     console.log("setState method: ", this.setState);
    //     this.setState({
    //         count: this.state.count + 1,
    //         greet: this.state.greet + "Morning guy",
    //         Country: this.state.Country + "Loving Country"
    //     });
    // }
    async componentDidMount(){
        console.log(this.props.myurl + " Mounting happing !");

        // const datafromApi = await fetch("https://fakestoreapiserver.reactbd.com/posts");
        // const jsonData = await datafromApi.json();

        // console.log("Fetched Single user data: ", jsonData);

        // this.setState({
        //     UsersPost: jsonData,
        // })

        // this.timer = setInterval(()=>{
        //     console.log("We are running the interval for child component: ", this.props.id);
        // }, 1000)
        // console.log("Name: ", name, " , location: ", location);
    }

    componentDidUpdate(){
        console.log("This is Child Updation call for ", this.props.id);
    }
    componentWillUnmount(){
        // console.log("Timer for ", this.props.id, ": ", this.timer);
        // clearInterval(this.timer);
        console.log("Child Component Unmounting Happened for ", this.props.id);
    }
    render() {
        console.log(this.props.myurl + " render function !");
        return (
            <div className="membersDetails">  
                <img src={this.props.myurl} alt="useravatar" />    
                <h3>Id: {this.props.id}</h3>
                <h3>Title of Post: {this.props.mytitle}</h3>
            </div>
        )
    }
}

export default MemberDetails;