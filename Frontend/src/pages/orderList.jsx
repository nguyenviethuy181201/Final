import React from 'react'
import Hearder from '../components/header';
import Footer from '../components/footer';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useReducer } from 'react';
import { Store } from '../store';
import UserTest from '../components/sidebar';
import { getError } from '../utils';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { toast } from 'react-toastify';
const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_SUCCESS':
        return {
          ...state,
          orders: action.payload,
          loading: false,
        };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
      case 'DELETE_REQUEST':
        return { ...state, loadingDelete: true, successDelete: false };
      case 'DELETE_SUCCESS':
        return {
            ...state,
            loadingDelete: false,
            successDelete: true,
        };
      case 'DELETE_FAIL':
        return { ...state, loadingDelete: false };
      case 'DELETE_RESET':
        return { ...state, loadingDelete: false, successDelete: false };
      default:
        return state;
    }
  };


const OrderList = () => {
    const navigate = useNavigate();
    const { state } = useContext(Store);
    const { userInfo } = state;
    const [{ loading, error, orders, loadingDelete, successDelete }, dispatch] = useReducer(reducer, {
      loading: true,
      error: '',
    });
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          dispatch({ type: 'FETCH_REQUEST' });
          const { data } = await axios.get(`/api/orders`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          });
          dispatch({ type: 'FETCH_SUCCESS', payload: data });
        } catch (err) {
          dispatch({
            type: 'FETCH_FAIL',
            payload: getError(err),
          });
        }
      };
      if (successDelete) {
        dispatch({ type: 'DELETE_RESET' });
      } else {
        fetchData();
      }
    }, [userInfo, successDelete]);

    const deleteHandler = async (order) => {
        if (window.confirm('Are you sure to delete?')) {
          try {
            dispatch({ type: 'DELETE_REQUEST' });
            await axios.delete(`/api/orders/${order._id}`, {
              headers: { Authorization: `Bearer ${userInfo.token}` },
            });
            toast.success('order deleted successfully');
            dispatch({ type: 'DELETE_SUCCESS' });
          } catch (err) {
            toast.error(getError(error));
            dispatch({
              type: 'DELETE_FAIL',
            });
          }
        }
      };
  return (
    <div className='w-full'>
        <Hearder/>
        <div className='w-5/6 mx-auto my-[100px] grid grid-cols-5 gap-x-[20px]'>
            <UserTest/>
            <div className='col-span-4 border rounded  p-[10px]'>
                <p className='text-2xl font-medium'>Order History</p>
                {loadingDelete && <p>Loading...</p>}
                {
                  loading ? ( 
                    <p>loading 99%</p>
                  ) : error ? (
                    <p>error 100%</p>
                  ) : (
                <div className='w-full  text-lg font-semibold flex flex-col gap-y-[10px]'>
                  {
                    orders.map((order) => (

                      <div className='rounded bg-gray-100 p-[20px]'>

                        <div className='flex  justify-between'>
                            <div>
                                <p>Id: {order._id}</p>
                                <p>Mã đơn hàng: {order.orderCode}</p>
                                <p>Trạng thái: {order.transactionStatus}</p>
                            </div>
                            <div>

                                <p>Người mua: {order.user.name} ({order.user._id})</p>
                                <p>Người bán: </p>
                            </div>

                        </div>

                        

                          <div>
                            {
                              order.orderItems.map((item) => (

                                <div className='flex items-center'>
                                    <img className='w-[150px] ' src={item.image} alt="" />
                                    <div className='flex flex-col gap-y-[20px]'>
                                        <p>{item.name} </p>
                                        <p>${item.price} x {item.quantity} </p>
                                    </div>
                                </div>
                              ))
                            }
                          </div>


                              <div className='flex flex-col gap-y-[10px]'>
                                  <p className='flex flex-row-reverse'>Tổng tiền: ${order.totalPrice}</p>
                                  <div className='flex flex-row-reverse gap-[10px]'>
                                      <button className='bg-red-200 px-[40px] py-[10px] rounded'>Cancel</button>
                                      <button onClick={ () => {navigate(`/order/${order._id}`)}} className='bg-red-200 px-[40px] py-[10px] rounded'>Details</button>
                                      &nbsp;
                                    <button
                                        className='bg-red-200 px-[40px] py-[10px] rounded'
                                        onClick={() => deleteHandler(order)}
                                    >
                                        Delete
                                    </button>
                                  </div>
                              </div>
          
                              
                      </div>
                    ))


                  }

                    

                </div>

                  )
                }
                
                
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default OrderList;