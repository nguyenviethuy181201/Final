import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../store';
import Hearder from '../components/header';
import Footer from '../components/footer';
import {ReactComponent as PaymentImage} from "../payment.svg"


const PaymentMethod = () => {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: { shippingAddress, paymentMethod },
    } = state;

    
    const [paymentMethodName, setPaymentMethod] = useState(
        paymentMethod || 'Other'
    );

    useEffect(() => {
        if (!shippingAddress.address) {
        navigate('/shipping');
        }
    }, [shippingAddress, navigate]);
    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
        localStorage.setItem('paymentMethod', paymentMethodName);
        navigate('/placeorder');
    };
  return (
    <div className='w-full mt-[200px] bg-[#F1F5F9]'>
            <Hearder/>
            <div className='w-5/6 mx-auto py-[20px]'>
                <div className='flex w-11/12 mx-auto bg-white rounded-lg overflow-hidden'>
                    <div className='w-[50%] flex justify-center items-center  '>
                        <form onSubmit={submitHandler}  className='w-[50%] mx-auto '>
                            <div className='flex flex-col items-center'>
                                <p className='font-medium text-xl'>Payment Method</p>
                            </div>
                            <div className='flex flex-col gap-y-[12px] mt-[30px]'>

                                <div className='flex items-center gap-x-[5px]'>
                                    <input className='w-[20px] h-[20px]' type="radio" id="Other" label="Other" value="Other" checked={paymentMethodName === 'Other'} onChange={(e) => setPaymentMethod(e.target.value)} /> 
                                    <label className='font-medium' htmlFor="Other">Other</label>
                                </div>

                                

                                <div className='flex items-center gap-x-[5px]'>
                                    <input className='w-[20px] h-[20px]' type="radio" id="COD" label="COD" value="COD" checked={paymentMethodName === 'COD'} onChange={(e) => setPaymentMethod(e.target.value)} /> 
                                    <label className='font-medium' htmlFor="COD">COD</label>
                                </div>
                                
                                <button className='bg-orange-300 w-full mt-[10px] h-[30px] rounded font-medium'>Next step</button>
                                                              
                            </div>
                        
                    
                        </form>
                    </div>
                    <div className='w-[50%] bg-white  flex items-center justify-center'>
                        <PaymentImage className=''/>
                    </div>
                </div>
            </div>
            <Footer/>
            
        </div>
  )
}

export default PaymentMethod;