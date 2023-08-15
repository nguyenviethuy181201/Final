import React from 'react'
import { useContext } from 'react';
import { Store } from '../store';
import Hearder from '../components/header';
import Footer from '../components/footer';
import {BiChevronDown, BiLinkAlt} from "react-icons/bi"
import {MdDelete} from "react-icons/md"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Empty } from '../empty-cart.svg';
import axios from 'axios';
const Cart = () => {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: { cartItems },
    } = state;
    console.log(cartItems)
    const updateCartHandler = async (item, quantity) => {
        const { data } = await axios.get(`/v4/product/${item._id}/getProductById`);
        if (data.quantity < quantity) {
          window.alert('Sản phẩm đã hết');
          return;
        }
        ctxDispatch({
          type: 'CART_ADD_ITEM',
          payload: { ...item, quantity },
        });
      };
      const removeItemHandler = (item) => {
        ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
      };
    
      const checkoutHandler = () => {
        navigate('/signin?redirect=/shipping');
      };
    
  return (
    <div className="w-full mt-[100px] bg-[#F1F5F9]">
            <Hearder/>
            {/* <div className="w-5/6 mx-auto ">
                <div className="rounded bg-gray-400 w-full h-[50px] justify-center items-center flex">
                    <p>Shop Cart</p>
                </div>
                <div className='w-full h-[500px] mt-[20px] grid grid-cols-5 gap-x-[20px]'>
                    {
                        cartItems.length === 0 ? (
                            <p>
                                cart is empty. <Link to="/">Go Shopping</Link>  
                            </p>
                        ) : (

                            <div className='col-span-3 flex flex-col gap-y-[5px] border rounded'>
                                <ul className='w-full grid grid-cols-12 gap-[10px] '>
                                    <li className='col-span-3'>
                                        <div className='w-[95%] mx-auto'>
                                            <p>Image</p>
                                        </div>
                                    </li>
                                    <li className='col-span-4'>
                                        Details
                                    </li>
                                    <li className='col-span-2 flex justify-center'>
                                        Qty
                                    </li>
                                    <li className='col-span-2 flex justify-center'>
                                        Price
                                    </li>
                                    <li className='col-span-1 flex justify-center'>
                                        Icon
                                    </li>
                                </ul>
                                {
                                    cartItems.map((item) => (
                                        <div key={item._id}>
                                            <div className='border-b border-black/10 w-full'>
                                                
                                            </div>
                                            <ul className='w-full grid grid-cols-12 gap-[10px]'>
                                                <li className='col-span-3 items-center'>
                                                    <div className='bg-gray-200 rounded w-[95%] h-[100px] mx-auto'>
                                                        <img src="" alt="" />
                                                    </div>
                                                </li>
                                                <li className='col-span-4 flex flex-col justify-center'>
                                                    <p>{item.name}</p>
                                                    <p>Size: </p>
                                                    <p>Color: </p>
                                                </li>
                                                <li className='col-span-2 flex justify-center items-center'>
                                                    <div className='w-[70px] h-[50px] rounded bg-gray-300 flex items-center justify-center gap-x-[10px]'>
                                                        <p className='text-xl font-medium'>{item.quantity}</p>
                                                        <div className='flex flex-col'>
                                                            <button onClick={() => updateCartHandler(item, item.quantity + 1)} 
                                                                className={`${item.quantity === 100 ? 'text-gray-100 cursor-not-allowed' : 'text-black' }`}
                                                                disabled={item.quantity === 100}
                                                            >
                                                                <BiChevronDown className='rotate-180 '/>
                                                                
                                                            </button>
                                                            <button  onClick={() => updateCartHandler(item, item.quantity - 1)}
                                                                className={`${item.quantity === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-black' }`}
                                                                disabled={item.quantity === 1}
                                                            >
                                                                <BiChevronDown />
                                                                
                                                            </button>

                       

                                                        </div>
                                                    </div>
                                                </li>
                                                <li className='col-span-2 flex justify-center items-center'>
                                                    {item.price}
                                                </li>
                                                <li className='col-span-1 flex justify-center items-center'>
                                                    <button onClick={() => removeItemHandler(item)}>
                                                        <MdDelete className='text-3xl'/>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    ))
                                }
                                
                            </div>
                        )
                    }
                    <div className='col-span-2 h-[100px] rounded border'>
                        <div className='w-[90%] mx-auto'>
                            <h3>
                                Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                                items) : $
                                {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                            </h3>
                        </div>
                        <div className='w-[90%] h-[50px] rounded bg-gray-200 flex justify-center items-center mx-auto'>
                            <button onClick={checkoutHandler}>
                                Proceed to Checkout

                            </button>
                        </div>
                    </div>
                </div>
            </div> */}


            <div className="w-5/6 mx-auto py-[20px]">
                
                <div className=''>

                    {
                        cartItems.length === 0 ? (

                            <div className=' flex justify-center items-center flex-col '>
                                <Empty className="w-[500px] h-[400px]"/>
                                <div className=' flex flex-col gap-[20px] '>

                                    <p>Bạn chưa có sản phẩm nào trong giỏ hàng</p>
                                    <div className='w-[300px] bg-red-300 flex justify-center items-center py-[10px] rounded'>
                                        <Link to="/" className=' '>Tiếp tục mua sắm</Link>
                                    </div>
                                </div>
                            </div>
                            // <p>
                            //     cart is empty. <Link to="/">Go Shopping</Link>  
                            // </p>
                        ) : (
                            
                            <div className='w-full  mt-[20px] grid grid-cols-6 gap-x-[20px]'>
                                <div className='col-span-4 flex flex-col gap-y-[10px]  rounded  '>
                                    <div className="">
                                        <ul className='items-center flex grid grid-cols-7 rounded bg-white w-full h-[50px] p-[5px]'>
                                            <li className='flex items-center gap-x-[5px] col-span-3 '>
                                                <input type="checkbox" className='w-[20px] h-[20px]' />
                                                <p>Tất cả (1 sản phẩm)</p>  


                                            </li>
                                            <li className='col-span-1 flex justify-center'>
                                                <p>Price</p>
                                            </li>

                                            <li className='col-span-1 flex justify-center'>
                                                <p>Số lượng</p>

                                            </li>

                                            <li className='col-span-1 flex justify-center'>
                                                <p >
                                                    Thành tiền
                                                </p>

                                            </li>

                                            <li className='col-span-1'>
                                                
                                            </li>


                                        </ul>
                                    
                                    </div>
                                    {/* <ul className='w-full grid grid-cols-12 gap-[10px] '>
                                        <li className='col-span-3'>
                                            <div className='w-[95%] mx-auto'>
                                                <p>Image</p>
                                            </div>
                                        </li>
                                        <li className='col-span-4'>
                                            Details
                                        </li>
                                        <li className='col-span-2 flex justify-center'>
                                            Qty
                                        </li>
                                        <li className='col-span-2 flex justify-center'>
                                            Price
                                        </li>
                                        <li className='col-span-1 flex justify-center'>
                                            Icon
                                        </li>
                                    </ul> */}
                                    {
                                        cartItems.map((item) => (
                                            <div key={item._id}>
                                                
                                                <ul className='w-full grid grid-cols-7  p-[5px] bg-white rounded'>
                                                    <div className='col-span-3 flex items-center gap-[5px]'>
                                                        <li>
                                                            <input type="checkbox" className='w-[20px] h-[20px]'/>
                                                        </li>
                                                        <li className=' items-center'>
                                                            <div className=''>
                                                                <img className='object-contain w-[150px] h-[150px]' src={item.images} alt="" />
                                                            </div>
                                                        </li>
                                                        <li className=' flex flex-col justify-center'>
                                                            <p>{item.name}</p>
                                                            <p>Thể loại: {item.category}</p>
                                                            <p>Lựa chọn:  </p>
                                                        </li>
                                                    </div>
                                                    <li className='col-span-1 flex justify-center items-center'>
                                                        {item.price}
                                                    </li>
                                                    <li className='col-span-1 flex justify-center items-center'>
                                                        <div className='w-[70px] h-[50px] rounded bg-gray-300 flex items-center justify-center gap-x-[10px]'>
                                                            <p className='text-xl font-medium'>{item.quantity}</p>
                                                            <div className='flex flex-col'>
                                                                <button onClick={() => updateCartHandler(item, item.quantity + 1)} 
                                                                    className={`${item.quantity === 100 ? 'text-gray-100 cursor-not-allowed' : 'text-black' }`}
                                                                    disabled={item.quantity === 100}
                                                                >
                                                                    <BiChevronDown className='rotate-180 '/>
                                                                    
                                                                </button>
                                                                <button  onClick={() => updateCartHandler(item, item.quantity - 1)}
                                                                    className={`${item.quantity === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-black' }`}
                                                                    disabled={item.quantity === 1}
                                                                >
                                                                    <BiChevronDown />
                                                                    
                                                                </button>

                        

                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className='col-span-1 flex justify-center items-center'>
                                                        {item.price*item.quantity}
                                                    </li>
                                                    <li className='col-span-1 flex justify-center items-center'>
                                                        <button onClick={() => removeItemHandler(item)}>
                                                            <MdDelete className='text-2xl'/>
                                                        </button>
                                                    </li>
                                                </ul>
                                                
                                            </div>
                                        ))
                                    }
                                    
                                </div>

                                <div className='col-span-2 bg-white h-[110px] rounded border p-[10px]'>
                                    <div className=''>
                                        <h3>
                                            Tổng cộng ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                                            items) : $
                                            {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                                        </h3>
                                    </div>
                                    <div className=' h-[50px] rounded bg-gray-200 mt-[10px] flex justify-center items-center '>
                                        <button onClick={checkoutHandler}>
                                            Proceed to Checkout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <Footer/>
        </div>
  )
}

export default Cart;