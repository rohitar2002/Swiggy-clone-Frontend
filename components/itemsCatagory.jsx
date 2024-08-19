import { useDispatch, useSelector } from "react-redux";
import { additems, addresInfo } from "../utils/projectStore/CartSlice";
import Itemselector from "./itemselector";

export const CategoryItem = (propslist) => {
    // const [showItems, setshowItems] = useState(false);
    const dispatch = useDispatch();
    const cartdata = useSelector(store => store.cart.items);

    let itemsid = [];

    if (cartdata.length) {
        itemsid = cartdata.map(({ itemInfo, itemsel }) => {
            const retdata = {
                id: itemInfo?.id,
                selitem: itemsel
            }
            return retdata;
        })
    }

    const textshow = (id) => {
        let retval = 0;
        itemsid.forEach(element => {
            if (element?.id == id) {
                retval =  element?.selitem;
                return;
            }
        });
        return retval;
    }
    console.log("propslist: ", propslist);
    const { title, itemCards, showItems, ItemIndex, setItemIndex, index, resInfo } = propslist?.props;
    // const showItems = propslist?.showItems;

    // const { info } = propslist?.props?.itemsCards[0]?.card;
    const showBody = () => {
        console.log("ShowBody Function is now clicked.");
        ItemIndex == index ? setItemIndex(null) : setItemIndex(index);
    }
    // const handler = ()=>{
    //     dispatch(additems("burgers"));
    // }

    return (
        <div className="border border-b-black p-4 my-4 shadow-xl">
            <div className="flex justify-between cursor-pointer" onClick={showBody}>
                <h2 className="text-lg font-bold"> {title} ({itemCards.length}) </h2>
                <span>⬇</span>
            </div>

            {
                showItems ? (itemCards.map((singleItem) => {
                    let { id, name, description, price, imageId } = singleItem?.card?.info;
                    if (!price) {
                        price = singleItem?.card?.info.defaultPrice;

                        console.log("Condition for default price is true, Price: ", price);
                    }

                    const payload_data = {
                        itemInfo: singleItem?.card?.info,
                        itemsel: 1
                    }
                    let val;
                    return (
                        <div key={id} className="border border-b-black m-4 p-6 rounded-lg flex justify-between">
                            <div className="w-9/12">
                                <h2 className="text-lg font-bold">{name}</h2>
                                <h2>₹ {price / 100}</h2>
                                <h2>{description}</h2>
                            </div>

                            {   
                                imageId ? (<div className="w-3/12 relative">
                                    <button type="button" className="bg-white text-green-500 text-lg font-bold rounded-lg py-3 px-2 m-4 absolute top-32 left-3 border shadow-lg w-24" >
                                        {(val = textshow(id)) > 0  ? (<Itemselector data = {{id, val}}/>) 
                                        : (<h2 onClick={() => {
                                            cartdata.length == 0 && dispatch(addresInfo(resInfo));

                                                dispatch(additems(payload_data))
                                            }}>Add</h2>)}
                                    </button>
                                    <img src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/" + imageId} alt="" />
                                </div>) :
                                    (<button type="button" className="bg-white text-green-500 text-lg font-bold rounded-lg m-4 px-2 w-24 h-14 border shadow-lg relative right-2 " >
                                        {(val = textshow(id)) > 0 ? (
                                        //     <div className="flex justify-between w-full">
                                        //     <p onClick={() => {
                                        //         dispatch(decrementsel(id))
                                        //     }}>-</p>
                                        //     <h2>{val}</h2>
                                        //     <p onClick={() => {
                                        //         dispatch(incrementsel(id))
                                        //     }}>+</p>
                                        // </div>

                                        <Itemselector data = {{id, val}}/>
                                        ) : (<h2 onClick={() => {
                                            cartdata.length == 0 && dispatch(addresInfo(resInfo));
                                            dispatch(additems(payload_data))
                                        }} className="text-center">Add</h2>) }
                                    </button>)}
                        </div>
                    )
                })) : <p></p>
            }
        </div>
    )
}