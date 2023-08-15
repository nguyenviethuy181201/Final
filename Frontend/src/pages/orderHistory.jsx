import React from 'react'
import Hearder from '../components/header';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router-dom';
import { Store } from '../store';
import { getError } from '../utils';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import SideBar from '../components/sidebar';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, orders: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};



const OrderHistory = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get(
          '/v4/order/getMyOrder',

          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [userInfo]);

  // console.log(userInfo)
  return (
    <div className='w-full mt-[200px] bg-[#F1F5F9]'>
        <Hearder/>
        <div className='w-5/6 mx-auto py-[20px] grid grid-cols-5 gap-x-[20px]'>
            
            <SideBar/>
            <div className='col-span-4 border rounded bg-white  p-[10px]'>
                <p className='text-2xl font-medium'>Order History</p>
                {
                  loading ? ( 
                    <LoadingBox />
                  ) : error ? (
                    <MessageBox>{error}</MessageBox>
                  ) : (
                <div className='w-full  text-lg font-semibold flex flex-col mt-[10px] gap-y-[10px]'>
                  {
                    orders.map((order) => (

                      <div className='rounded bg-gray-100 p-[20px]'>

                          <p>Mã đơn hàng: {order.orderCode}</p>
                          <p>Trạng thái thanh toán: </p>
                          <p>Trạng thái: {order.transactionStatus}</p>
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
                                  <p className='flex flex-row-reverse'> Tổng tiền: ${order.totalPrice}</p>
                                  <div className='flex flex-row-reverse gap-[10px]'>
                                      <button className='bg-red-200 px-[40px] py-[10px] rounded'>Cancel</button>
                                      <button onClick={ () => {navigate(`/orderdetail/${order._id}`)}} className='bg-red-200 px-[40px] py-[10px] rounded'>Details</button>
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

export default OrderHistory;