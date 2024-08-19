export const changedatafunction = (resdata) => {
    // const [stateval, setstateval] = useState("");
    const fillteredList = (resdata).filter((res_item) => {
        let itemfortwo_ori = res_item["info"]["costForTwo"];
        let index;
        for (index = 0; index < itemfortwo_ori.length; index++) {
            if (itemfortwo_ori[index] == " ") {
                console.log("Index: ", index);
                break;
            }
        }
        let itemfortwo = (res_item["info"]["costForTwo"]).slice(1, index);

        console.log(res_item["info"]["costForTwo"], " ", itemfortwo);

        return (itemfortwo <= 300)
    })


    console.log("Change in resdata happened: \n", fillteredList);
    return fillteredList;
}
