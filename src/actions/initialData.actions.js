import { categoryConstants , orderConstants, productConstants} from "./constants";
import axiosInstance from "../helpers/axios";

export const getInitialData = () => {
    return async dispatch => {

        const res = await axiosInstance.post(`/initialdata`);
        const { categories , products , orders } = res.data;
        if(res.status === 200) {
            dispatch({ 
                type : categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload : {categories}
            })
            dispatch({
                type : productConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload : {products}
            })
            dispatch({
                type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
                payload: { orders },
              });
        }
        console.log(res)
    }
}