import React, { lazy, Suspense, useState } from 'react'
import ReactDom from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Header } from '../components/header';
import Home from '../components/home'
import About from '../components/about'
import { Errorpage } from '../components/errorpage'
import { Contact } from '../components/contact'
import { Cart } from '../components/cart';
// import { Cart_User } from '../components/cart_user';
// import { Cart_Owner } from '../components/cart_owner';
import { MenuList } from '../components/Menuitems';
import { fetchdata } from '../components/userdataloader';
import { Default } from '../components/defaultpage';
import { TeamDetails } from '../components/Team';
import { Shimmer } from '../components/Shimmer';
import user from '../utils/ContextContainer';
import { Provider } from 'react-redux';
import store from '../utils/projectStore/AppStore';
import AllresMappedItem from '../components/itemMappedRestuarents';

console.log("Hello from JS.");

const Applayout = () => {
    const [Name, setName] = useState("Default User");
    const UserData = { "Username": "RamDas", "Userlocation": "Panipat", "UserAge": 22 };
    const MenuData = { "Menu1": "Palanta", "Menu2": "Paneer", "Menu3": "Dal" };


    return (
        <Provider store={store}>
            <user.Provider value={{ "Username": "Rohan Das", "Userlocation": "Sonipat", "UserAge": 25 }}>
                <div>
                    {/* <user.Provider value = {{ "Username": "RohanDas", "Userlocation": "Sonipat", "UserAge": 25 }}> */}
                    <Header />
                    {/* </user.Provider> */}
                    <Outlet />
                </div>
            </user.Provider>
        </Provider>
    )
}

// const Home = lazy(()=>{
//     console.log("Now, We are calling lazy function.");

//     return import('../components/home');
// })

console.log("TeamDetails: ", TeamDetails);
// const myrouter = createBrowserRouter([
//     {
//         path: "/",
//         element: <Home />,
//         errorElement: <Errorpage />
//     },
//     {
//         path: "/about",
//         loader: fetchdata,
//         element: <About />,
//     },
//     {
//         path: "/contact",
//         element: <Contact />
//     },
// ])

const myrouter = createBrowserRouter([
    {
        path: "/",
        element: <Applayout />,
        errorElement: <Errorpage />,
        children: [
            {
                index: true,
                element: (
                    // <div className= "relative top-40 h-[vh] text-blue-500">
                    //     <h2 className='text-lg bg-pink-500 w-[5rem] h-[100%] italic'>Hello User! Welcome to me Website.</h2>
                    // </div>

                    <Home />
                )
            },
            // {
            //     path:"home",
            //     element: <Suspense fallback = {<Shimmer/>}>
            //          <Home/>
            //     </Suspense>,

            //     children:[

            //     ]
            // },
            
            {
                path: "about",
                loader: fetchdata,
                element: <About />
            },
            {
                path: "contact",
                element: <Contact />
            },
            {
                path: "itemAllres/:resId/:restag",
                element: <AllresMappedItem />
            },
            {
                path: "team",
                element: <TeamDetails />
            },
            {
                path: "menu",
                element: <div><h2>Hello, This jsx comes from menu route.</h2></div>
            },
            {
                path: "menu/:resid",
                element: <MenuList />,
                children: [
                    {
                        path: "rest",
                        element: <div><h2>Hello, This jsx comes from rest route.</h2></div>
                    },
                    {
                        path: "rest/:restlocid",
                        element: <div><h2>Hello, This jsx comes from rest/restlocid route.</h2></div>
                    },
                    {
                        path: ":restlocid",
                        element: <div><h2>Hello, This jsx comes from :restlocid route.</h2></div>
                    },
                ]
            },

            {
                path: "menu/choice",
                element: <div><h2>Hello, This jsx comes from menu/choice route.</h2></div>
            },

            {
                path: "cart",
                element: <Cart />,
                // children: [
                //     {
                //         path: "/cart",
                //         element: <Default />
                //     },
                //     {
                //         path: "user",
                //         element: <Cart_User />,
                //         children: [
                //             {
                //                 path: "/cart/user",
                //                 element: <Default />
                //             }
                //         ]
                //     },
                //     {
                //         path: "owner",
                //         element: <Cart_Owner />
                //     }
                // ]
            }
        ]
    },
    {
        path: "/user/contact/admin",
        element: <Applayout />,
        children: [
            {
                path: "/user/contact/admin",
                element: <Contact />
            },
            {
                path: "user/contact/admin",
                element: <About />
            }
        ]
    }
])


const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={myrouter} />)