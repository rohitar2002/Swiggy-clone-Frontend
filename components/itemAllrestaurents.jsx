import { act } from "react";
import { cloudimgdomain } from "../utils/constants";
import { Link } from "react-router-dom";

const ItemAllRes = (AllresInfo) => {
    const { itemAllres } = AllresInfo;

    console.log("Received props inside all res: ", AllresInfo);
    console.log("Received props inside all res: ", itemAllres);

    return (
        <div className="h-72 mx-16 mb-12  border-b  overflow-hidden box-content pt-4">
            <h2 className="font-bold text-2xl ">What's on your mind?</h2>
            <div className="flex overflow-x-scroll overflow-y-hidden pb-10 w-full">
                {itemAllres.map((itemdes) => {
                    let { imageId, description, id, action } = itemdes;
                    const imageURL = cloudimgdomain + imageId;

                    let {link} = action;
                    const myurl = new URL(link);
                    console.log("myurl: ", myurl);
                    
                    const itemid = myurl.searchParams.get("collection_id");
                    const itemtag = myurl.searchParams.get("tags");
                    
                    

                    // entityId = entityId.length > 30 ? entityId.substring(36, 63) : entityId;

                    // console.log("Creted entityId: ", entityId);
                    
                    return (
                        <Link className="min-w-[13%]"  to = {"/itemAllres/" + itemid + "/" + itemtag} key = {id}>
                            <img src={imageURL} alt="item-image"  className="w-full"/>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default ItemAllRes;