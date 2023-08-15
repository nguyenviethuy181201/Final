
import { Store } from '../store';
import Hearder from '../components/header';
import Footer from '../components/footer';
import {BiChevronDown} from "react-icons/bi"
import {MdDelete} from "react-icons/md"
import { Link, redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import {AiOutlineSetting} from "react-icons/ai";
import Axios from 'axios';
import { toast } from 'react-toastify';
// import { getError } from '../utils';
import React, { useContext, useEffect, useReducer } from 'react';
import { getError } from '../utils';
import LoadingBox from '../components/LoadingBox';
const reducer = (state, action) => {
    switch (action.type) {
      case 'CREATE_REQUEST':
        return { ...state, loading: true };
      case 'CREATE_SUCCESS':
        return { ...state, loading: false };
      case 'CREATE_FAIL':
        return { ...state, loading: false };
      default:
        return state;
    }
  };

const PreviewOrder = () => {
    const date = new Date();

    const navigate = useNavigate();
    const [{ loading }, dispatch] = useReducer(reducer, {
        loading: false,
      });
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;
    
    const number = localStorage.setItem('number', 20);
    
    cart.itemsPrice = cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0);
    cart.shippingPrice = cart.itemsPrice > 10000 ? 0 : 10;
    
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice;

    
    const placeOrderHandler = async () => {
        try {
            
          dispatch({ type: 'CREATE_REQUEST' });
    
          const { data } = await Axios.post('/v4/order/createOrder',
            {
              orderItems: cart.cartItems,
              shippingAddress: cart.shippingAddress,
              paymentMethod: cart.paymentMethod,
              itemsPrice: cart.itemsPrice,
              shippingPrice: cart.shippingPrice,
              totalPrice: cart.totalPrice,
              // orderCode: moment(date).format('YYYYMMDDHHmmss'),
            },
            {
              headers: {
                authorization: `Bearer ${userInfo.token}`,
              },
            }
          );
          ctxDispatch({ type: 'CART_CLEAR' });
          dispatch({ type: 'CREATE_SUCCESS' });
          localStorage.removeItem('cartItems');
          
          localStorage.setItem('orderTotalPrice', cart.totalPrice);
          // localStorage.setItem('orderId', data.order._id);
          // localStorage.setItem('method', cart.paymentMethod);
          // console.log(localStorage.getItem('orderTotalPrice'))
          // navigate(`/order/${data.order._id}`);
          // console.log(moment(date).format('YYYYMMDDHHmmss'));
          // navigate(`/ordersuccess/${data.order._id}`);
          navigate(`/ordersuccess/${data._id}`)
          
          

        
        } catch (err) {
          dispatch({ type: 'CREATE_FAIL' });
          toast.error(getError(err));
        }
      };

      const createPaymentUrl = async () => {
        try {
          const response = await Axios.post('/api/vnpay', {
            amount: cart.totalPrice,
            // Truyền các thông tin cần thiết khác nếu có, ví dụ: bankCode, ...
          });
      
          // Thông tin URL thanh toán được trả về từ server
        //   const paymentUrl = response.data;
          
      
          // Redirect user to the payment URL
          window.location.href = response.data;
        } catch (error) {
          // Xử lý lỗi nếu có
          console.error('Error creating payment URL:', error);
        }
      };
      // const VTCPayHandler = async () => {
      //   try {

          
      //     const response = await Axios.post('/vtcpay', {
      //       amount: cart.totalPrice,
      //     });

      //     try{
      //       const { data } = await Axios.post('/api/orders',
      //         {
      //           orderItems: cart.cartItems,
      //           shippingAddress: cart.shippingAddress,
      //           paymentMethod: cart.paymentMethod,
      //           itemsPrice: cart.itemsPrice,
      //           shippingPrice: cart.shippingPrice,
      //           totalPrice: cart.totalPrice,
      //           translationCode: response.data.translationCode,
      //         },
      //         {
      //           headers: {
      //             authorization: `Bearer ${userInfo.token}`,
      //           },
      //         }
      //       ); 
      //     } catch (err) {
      //       dispatch({ type: 'CREATE_FAIL' });
      //       toast.error(getError(err));
      //     }

          
      //     // Redirect user to the payment URL
      //     window.location.href = response.data.url;
      //   } catch (error) {
      //     // Xử lý lỗi nếu có
      //     console.error('Error creating payment URL:', error);
      //   }
        
        
      // };

      const VTCPayHandler = async () => {
        
        try {
          const response = await Axios.post('/api/vtcpay', {
            amount: cart.totalPrice,
          });
          
          
          try{
            const { data } = await Axios.post('/api/orders',
              {
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                totalPrice: cart.totalPrice,
                translationCode: response.data.translationCode,
              },
              {
                headers: {
                  authorization: `Bearer ${userInfo.token}`,
                },
              }
            );
          } catch(error) {
            console.log('loi o day ne')
          }

          window.location.href = response.data.url;
          
          
          

          
          
        } catch (error) {
          // Xử lý lỗi nếu có
          console.error('Error creating payment URL:', error);
        }

        // try{

        //   const response = await Axios.post('/vtcpay/vtc_ipn',{

        //   })
        //   console.log(response.data);
        // }catch{
        //   console.log('ko cap nhat duoc csdl')
        // }
        
        
      };

      
      

      
    

    useEffect(() => {
        if (!cart.paymentMethod) {
        navigate('/paymentmethod');
        }
    }, [cart, navigate]);
    
  return (
    <div className="w-full mt-[200px] bg-[#F1F5F9]">
            <Hearder/>
            <div className="w-5/6 mx-auto py-[20px]">
                {/* <div className="rounded bg-gray-400 w-full h-[50px] justify-center items-center flex">
                    <p>Preview Order</p>
                </div> */}
                <div className='w-full  mt-[20px] grid grid-cols-6 gap-x-[20px]'>
                    <div className='col-span-4  flex flex-col gap-y-[10px] '>
                        <div className='w-full  rounded border p-[10px] bg-white'>
                            <div className='flex items-center justify-between'>
                                <p className='text-lg font-medium'>Shipping Information</p>
                                <Link to="/shipping">
                                
                                    <AiOutlineSetting className='font-medium text-xl'/>
                                </Link>
                            </div>

                            <div className='mt-[10px] flex flex-col gap-y-[5px]'>
                                
                                <p>Name: <span>{cart.shippingAddress.fullName}</span></p>
                                <p>Email: <span>{cart.shippingAddress.email}</span></p>
                                <p>Phone Number: <span>{cart.shippingAddress.phoneNumber}</span></p>
                                <p>Address: <span>{cart.shippingAddress.address}</span></p>
                                
                            </div>
                        </div>       

                        <div className='w-full  rounded border p-[10px] bg-white'>
                            <div className='flex items-center justify-between'>
                                <p className='text-lg font-medium'>Payment Method</p>
                                <Link to="/paymentmethod">
                                
                                    <AiOutlineSetting className='font-medium text-xl'/>
                                </Link>
                            </div>

                            <div className='mt-[10px]'>
                                <p>Method: <span>{cart.paymentMethod}</span></p>
                            </div>
                        </div>

                        <div className='w-full  rounded border p-[10px] bg-white'>
                            <div className='flex items-center justify-between'>
                                <p className='text-lg font-medium'>Products</p>
                                <Link to="/cart">
                                
                                    <AiOutlineSetting className='font-medium text-xl'/>
                                </Link>
                            </div>

                            <div>
                                <ul className='flex flex-col gap-y-[10px]'>
                                    {cart.cartItems.map((item, index) => (
                                        <li>
                                            <div className='grid grid-cols-4'>
                                                <div className='col-span-1 '>
                                                  <img className='object-contain w-[150px] h-[150px]' src={item.images} alt="" />
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
                                            {index < cart.cartItems.length - 1 && <div className='border-b border-black/10 mt-[10px]'></div>}
                                        </li>

                                    ))}
                                </ul>
                            </div>
                        </div>        
                    </div>
                    <div className='col-span-2 h-[285px] relative   rounded border p-[10px] flex flex-col gap-y-[20px] bg-white'>
                        <div className=''>
                            <p className='text-lg font-medium'>Order Summary</p>
                        </div>
                        <div>
                            <ul className='flex flex-col gap-y-[10px]'>
                                <li className='grid grid-cols-2'>
                                    <div className='col-span-1'>
                                        <p>Product</p>
                                    </div>
                                    <div className='col-span-1'>
                                        <p>${cart.itemsPrice}</p>
                                    </div>
                                </li>

                                <li className='grid grid-cols-2'>
                                    <div className='col-span-1'>
                                        <p>Ship</p>
                                    </div>
                                    <div className='col-span-1'>
                                        <p>${cart.shippingPrice}</p>
                                    </div>
                                </li>

                                <li className='grid grid-cols-2'>
                                    <div className='col-span-1'>
                                        <p className=' font-semibold'>Order Total</p>
                                    </div>
                                    <div className='col-span-1'>
                                        <p className=' font-semibold'>${cart.totalPrice}</p>
                                    </div>
                                </li>
                                
                            </ul>
                        </div>
                        <div className='w-full h-[40px] rounded bg-gray-200 flex justify-center items-center mx-auto'>
                            {
                                cart.paymentMethod === 'COD' ?
                                (
                                    <button type='button' onClick={placeOrderHandler}>
                                        Proceed to Checkout
                                    </button>
                                ) : (
                                    <button type='button' onClick={createPaymentUrl} >
                                        Proceed to Checkout
                                    </button>
                                )
                            }
                        </div>
                        {loading && <div className='absolute top-[68%] left-1/2 transform -translate-x-1/2 -translate-y-1/2'><LoadingBox/></div>}

                        <div className='w-full h-[40px] rounded bg-gray-200 flex justify-center items-center mx-auto'>
                            
                                
                               
                                    <button type='button' onClick={VTCPayHandler} >
                                        test vtcpay
                                    </button>
                                
                                    
                                
                            
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
  )
}

export default PreviewOrder;