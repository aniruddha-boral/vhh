import { GET_PRODUCTS,DEL_PRODUCT,ADD_PRODUCT } from "./actionType";

export const addProduct = (payload) =>{
    return {
        type:ADD_PRODUCT,
        payload
    }
}

export const getAllProducts = ()=>{
    return {
        type:GET_PRODUCTS,
        
    }
}

export const delProduct = (id)=>{
    return {
        type:DEL_PRODUCT,
        id
    }
}

// export const getSingleProduct = () =>{
//     return {
//         type:GET_SINGLE_PRODUCT,
//         payload,
//     }
// }