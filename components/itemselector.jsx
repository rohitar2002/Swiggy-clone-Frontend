import { incrementsel, decrementsel } from "../utils/projectStore/CartSlice";
import { useDispatch } from "react-redux";

const Itemselector = ({data}) => {
    const dispatch = useDispatch();
    const { id, val } = data;

    return (
        <div className="flex justify-between">
            <p onClick={() => {
                dispatch(decrementsel(id))
            }}>-</p>
            <h2>{val}</h2>
            <p onClick={() => {
                dispatch(incrementsel(id))
            }}>+</p>
        </div>
    )
}

export default Itemselector;