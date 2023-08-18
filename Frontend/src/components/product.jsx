import React from "react";

import {BiChevronRight} from "react-icons/bi"
import {AiFillStar} from "react-icons/ai"
import {BsFillEyeFill} from "react-icons/bs"
import {AiFillHeart} from "react-icons/ai"
import {BiCartAlt} from "react-icons/bi"
import { Link } from "react-router-dom";
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../store';

const Product = (props) => {
    const { product } = props;
    
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: { cartItems },
    } = state;

    const truncateDescription = (description, maxLength) => {
        if (description.length > maxLength) {
            return description.substring(0, maxLength) + '...';
        }
        return description;
    };

    function formatNumberWithCommas(number) {
        return new Intl.NumberFormat('en-US').format(number);
    }

    const addToCartHandler = async (item) => {
        const existItem = cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`v4/product/${item._id}/getProductById`);
        if (data.quantity < quantity) {
        window.alert('Đã hết hàng');
        return;
        }
        ctxDispatch({
        type: 'CART_ADD_ITEM',
        payload: { ...item, quantity },
        });
    };

    return(
        // <div className="w-full">
        //     <div className="w-5/6 mx-auto mt-8">
        //         <div className="flex justify-between mt-4">
        <div className=" bg-white border p-[10px] rounded relative">
        <div className="  flex justify-center items-center  rounded mx-auto object-cover">
            <img className=" object-contain h-[300px]" src={product.images} alt="" />
        </div>
        <div className="flex  justify-between text-xl font-medium">
            <p className="">{truncateDescription(product.name, 40)}</p>
            
        </div>

        <div className="flex items-center  justify-between  my-[5px]">
            <div className="flex items-center ">
                <AiFillStar className="text-yellow-300"/>
                <AiFillStar className="text-yellow-300"/>
                <AiFillStar className="text-yellow-300"/>
                <AiFillStar className="text-yellow-300"/>
                <AiFillStar className="text-yellow-300"/>
            </div>
            
            <div className="flex">
                Đã bán <p>bao nhiêu</p>              
            </div>
        </div>
        <div className=" items-center ">
            <div className="flex items-center">
                <p className="font-semibold text-sm line-through">{formatNumberWithCommas(product.price)}</p>
                <p className="text-red-500 text-sm">-50%</p>
            </div>
            <p className="font-semibold text-xl text-un">{formatNumberWithCommas(product.price)}</p>
            
                                    <div className="flex justify-center items-center border rounded-md p-[5px] mb-[15px]">
                                        <Link to={`/product/${product._id}`}>Buy now</Link>
                                    </div>
        </div>
        
        
        
    </div>

                    // {/* <div className="border rounded  w-[280px]">
                    //     <div className="bg-gray-200 w-[250px] h-[250px] rounded mx-auto my-[15px]">
                    //         <img src="" alt="" />
                    //     </div>
                    //     <div className="flex w-[250px] mx-auto justify-between">
                    //         <p>ProductTitle</p>
                    //         <div className="flex items-center gap-x-[4px]">
                    //             <p>5</p>
                    //             <AiFillStar className="text-yellow-300"/>
                    //         </div>
                    //     </div>

                    //     <div className="flex items-center w-[250px] justify-between mx-auto my-[5px]">
                    //         <p className="text-xs">Space for a small product description </p>
                    //         <div className="flex">
                    //             <p>1000 </p> solds              
                    //         </div>
                    //     </div>
                    //     <div className="flex items-center w-[250px] mx-auto justify-between">
                    //         <p className="font-semibold text-xl">$100</p>
                    //         <div className="flex justify-center items-center border rounded-md p-[5px] mb-[15px]">
                    //             <p>Buy now</p>
                    //         </div>
                    //     </div>
                    // </div>

                    // <div className="border rounded  w-[280px]">
                    //     <div className="bg-gray-200 w-[250px] h-[250px] rounded mx-auto my-[15px]">
                    //         <img src="" alt="" />
                    //     </div>
                    //     <div className="flex w-[250px] mx-auto justify-between">
                    //         <p>ProductTitle</p>
                    //         <div className="flex items-center gap-x-[4px]">
                    //             <p>5</p>
                    //             <AiFillStar className="text-yellow-300"/>
                    //         </div>
                    //     </div>

                    //     <div className="flex items-center w-[250px] justify-between mx-auto my-[5px]">
                    //         <p className="text-xs">Space for a small product description </p>
                    //         <div className="flex">
                    //             <p>1000 </p> solds              
                    //         </div>
                    //     </div>
                    //     <div className="flex items-center w-[250px] mx-auto justify-between">
                    //         <p className="font-semibold text-xl">$100</p>
                    //         <div className="flex justify-center items-center border rounded-md p-[5px] mb-[15px]">
                    //             <p>Buy now</p>
                    //         </div>
                    //     </div>
                    // </div>

                    // <div className="border rounded  w-[280px]">
                    //     <div className="bg-gray-200 w-[250px] h-[250px] rounded mx-auto my-[15px]">
                    //         <img src="" alt="" />
                    //     </div>
                    //     <div className="flex w-[250px] mx-auto justify-between">
                    //         <p>ProductTitle</p>
                    //         <div className="flex items-center gap-x-[4px]">
                    //             <p>5</p>
                    //             <AiFillStar className="text-yellow-300"/>
                    //         </div>
                    //     </div>

                    //     <div className="flex items-center w-[250px] justify-between mx-auto my-[5px]">
                    //         <p className="text-xs">Space for a small product description </p>
                    //         <div className="flex">
                    //             <p>1000 </p> solds              
                    //         </div>
                    //     </div>
                    //     <div className="flex items-center w-[250px] mx-auto justify-between">
                    //         <p className="font-semibold text-xl">$100</p>
                    //         <div className="flex justify-center items-center border rounded-md p-[5px] mb-[15px]">
                    //             <p>Buy now</p>
                    //         </div>
                    //     </div>
                    // </div> */}
        //         </div>
        //     </div>
        // </div>
    )
}
export default Product;