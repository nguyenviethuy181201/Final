
import { Store } from '../store';
import Hearder from '../components/header';
import Footer from '../components/footer';
import {BiChevronDown} from "react-icons/bi"
import {MdDelete} from "react-icons/md"
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {AiOutlineSetting} from "react-icons/ai";
import Axios from 'axios';
import { toast } from 'react-toastify';
import React, { useContext, useEffect, useReducer } from 'react';
import { getError } from '../utils';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true, error: '' };
      case 'FETCH_SUCCESS':
        return { ...state, loading: false, order: action.payload, error: '' };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  }
const OrderDetail = () => {

    const { state } = useContext(Store);
    const { userInfo } = state;

    const params = useParams();
    const { id: orderId } = params;
    const navigate = useNavigate();

    const [{ loading, error, order }, dispatch] = useReducer(reducer, {
        loading: true,
        order: {},
        error: '',
    });
    
    useEffect(() => {
        const fetchOrder = async () => {
          try {
            dispatch({ type: 'FETCH_REQUEST' });
            const { data } = await axios.get(`/v4/order/${orderId}/getOrderDetail`, {
              headers: { authorization: `Bearer ${userInfo.token}` },
            });
            dispatch({ type: 'FETCH_SUCCESS', payload: data });
          } catch (err) {
            dispatch({ type: 'FETCH_FAIL', payload : getError(err) });
          }
        };
    
        if (!userInfo) {
          return navigate('/login');
        }
        if (!order._id || (order._id && order._id !== orderId)) {
            fetchOrder();
          }
        }, [order, userInfo, orderId, navigate]);
    
  return (
    loading ? (
        <div className='col-span-4'>

                        <LoadingBox/>
                    </div>
                    ) : error ? (
                        <div className='col-span-4'>

                            <MessageBox variant="danger">{error}</MessageBox>
                        
                        </div>
    ) : (
    <div className="w-full mt-[200px] bg-[#F1F5F9]">
            <Hearder/>
            <div className="w-5/6 mx-auto py-[20px]">
                {/* <div className="rounded bg-gray-400 w-full h-[50px] justify-center items-center flex">
                    <p>Order</p>
                </div>
                <div className="rounded bg-gray-400 w-full h-[50px] justify-center items-center flex">
                    <p>Order {orderId}</p>
                </div> */}
                <div className='w-full  mt-[20px] grid grid-cols-5 gap-x-[20px]'>
                    <div className='col-span-3  flex flex-col gap-y-[10px] '>
                        <div className='w-full  rounded border p-[10px] bg-white'>
                            <div className='flex items-center justify-between'>
                                <p className='text-lg font-medium'>Shipping Information</p>
                                
                            </div>

                            <div className='mt-[10px] flex flex-col gap-y-[5px]'>
                                
                                <p>Name: <span>{order.shippingAddress.fullName}</span></p>
                                <p>Email: <span>{order.shippingAddress.email}</span></p>
                                <p>Phone Number: <span>{order.shippingAddress.phoneNumber}</span></p>
                                <p>Address: <span>{order.shippingAddress.address}</span></p>
                                
                            </div>
                        </div>       

                        <div className='w-full  rounded border p-[10px] bg-white'>
                            <div className='flex items-center justify-between'>
                                <p className='text-lg font-medium'>Payment Method</p>
                                
                            </div>

                            <div className='mt-[10px]'>
                                <p>Method: <span>{order.paymentMethod}</span></p>
                            </div>
                        </div>

                        <div className='w-full  rounded border p-[10px] bg-white'>
                            <div className='flex items-center justify-between'>
                                <p className='text-lg font-medium'>Products</p>
                                
                            </div>

                            <div>
                                <ul className='flex flex-col gap-y-[10px]'>
                                    {order.orderItems.map((item,index) => (
                                        <li>
                                            <div className='grid grid-cols-4'>
                                                <div className='col-span-1'>
                                                    <img src={item.image} alt="" />
                                                </div>

                                                <div className='col-span-1 flex items-center justify-center'>
                                                    <p>{item.name}</p>
                                                </div>

                                                <div className='col-span-1 flex items-center justify-center'>
                                                    <p>{item.quantity}</p>
                                                </div>

                                                <div className='col-span-1 flex items-center justify-center'>
                                                    <p>${item.price}</p>
                                                </div>
                                            </div>
                                                {index < order.orderItems.length -1 && <div className='border-b border-black/10 mt-[10px]'></div>}
                                        </li>

                                    ))}
                                </ul>
                            </div>
                        </div>        
                    </div>
                    <div className='col-span-2   rounded border p-[10px] flex flex-col gap-y-[20px] bg-white'>
                        <div className='flex flex-col gap-y-[10px]'>
                            <p className='text-xl font-medium'>Mã đơn hàng: 0123456789</p>
                            <p>Ngày đặt hàng: 13/08/2023</p>
                            <p>
                                Tình trạng thanh toán
                            </p>
                            <p>Tình trạng đơn hàng</p>
                        </div>
                        <div className=''>
                            <p className='text-lg font-medium'>Chi phí</p>
                        </div>
                        <div>
                            <ul className='flex flex-col gap-y-[10px]'>
                                <li className='grid grid-cols-2'>
                                    <div className='col-span-1'>
                                        <p>Product</p>
                                    </div>
                                    <div className='col-span-1'>
                                        <p>${order.itemsPrice}</p>
                                    </div>
                                </li>

                                <li className='grid grid-cols-2'>
                                    <div className='col-span-1'>
                                        <p>Ship</p>
                                    </div>
                                    <div className='col-span-1'>
                                        <p>${order.shippingPrice}</p>
                                    </div>
                                </li>

                                <li className='grid grid-cols-2'>
                                    <div className='col-span-1'>
                                        <p className=' font-semibold'>Order Total</p>
                                    </div>
                                    <div className='col-span-1'>
                                        <p className=' font-semibold'>${order.totalPrice}</p>
                                    </div>
                                </li>
                                
                            </ul>
                        </div>

                        <div className='h-[30px] flex justify-center items-center bg-gray-200 rounded py-[10px]'>
                            <p>Mua lại</p>
                        </div>

                        <div className='h-[30px] flex justify-center items-center bg-gray-200 rounded py-[10px]'>
                            <p>Hoàn tiền </p>
                        </div>

                        <div className='h-[30px] flex justify-center items-center bg-gray-200 rounded py-[10px]'>
                            <p>Hủy đơn hàng</p>
                        </div>
                        
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
  )
}

export default OrderDetail;