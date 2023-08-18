import React from 'react'
import Hearder from '../components/header';
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';
import { Store } from '../store';
import { useContext, useEffect, useState } from 'react';
import {ReactComponent as ShipImage} from "../ship.svg"
const ShippingAddressScreen = () => {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        userInfo,
        cart: { shippingAddress },
    } = state;
    

    const [fullName, setFullName] = useState(shippingAddress.fullName || '');
    const [address, setAddress] = useState(shippingAddress.address || '');
    const [email, setEmail] = useState(shippingAddress.email || '');
    const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber || '');
    useEffect(() => {
        if (!userInfo) {
        navigate('/signin?redirect=/shipping');
        } 
    }, [userInfo, navigate]);
    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: {
                fullName,
                address,
                email,
                phoneNumber,
            },
        });
        localStorage.setItem(
        'shippingAddress',
        JSON.stringify({
            fullName,
            address,
            email,
            phoneNumber,
            })
        );
        navigate('/paymentmethod');
    };
    return (
    <div className='w-full mt-[200px] bg-[#F1F5F9]'>
            <Hearder/>
            <div className='w-5/6 mx-auto  py-[20px]'>
                <div className='flex w-11/12 mx-auto bg-white rounded-lg overflow-hidden'>
                    <div className='w-[50%] flex justify-center items-center  '>
                        <form onSubmit={submitHandler}  className='w-[50%] mx-auto '>
                            <div className='flex flex-col items-center'>
                                <p className='font-medium text-xl'>Shipping information</p>
                                
                            </div>
                            <div className='flex flex-col gap-y-[12px] mt-[30px]'>

                                <div>
                                    <label className="font-medium block" htmlFor="">Full Name</label>
                                    <input onChange={(e) => setFullName(e.target.value)} value={fullName} required  className='outline-none w-full flex items-center pl-[10px] h-[30px] rounded placeholder:opacity-30 placeholder:font-thin placeholder:italic border' type="text"  placeholder='Enter your full' />
                                </div>
                                <div>
                                    <label className="block font-medium" htmlFor="">Address</label>
                                    <input onChange={(e) => setAddress(e.target.value)} value={address} required  className='outline-none w-full flex items-center pl-[10px] h-[30px] rounded placeholder:opacity-30 placeholder:font-thin placeholder:italic border' type="text" placeholder='Enter your address' />
                                </div>

                                <div>
                                    <label className="block font-medium" htmlFor="">Email</label>
                                    <input onChange={(e) => setEmail(e.target.value)} value={email} required  className='outline-none w-full flex items-center pl-[10px] h-[30px] rounded placeholder:opacity-30 placeholder:font-thin placeholder:italic border' type="email" placeholder='Enter your email' />
                                </div>

                                <div>
                                    <label className="block font-medium" htmlFor="">Phone</label>
                                    <input onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} required className='outline-none w-full flex items-center pl-[10px] h-[30px] rounded placeholder:opacity-30 placeholder:font-thin placeholder:italic border' type="tel" placeholder='Enter your phone number' pattern="[0-9]{10}" />
                                </div>

                                
                                
                                <button className='bg-orange-300 w-full mt-[10px] h-[30px] rounded font-medium'>Next step</button>
                                

                                
                                
                                
                                
                            </div>
                        
                    
                        </form>
                    </div>
                    <div className='w-[50%] bg-white  flex items-center justify-center'>
                        <ShipImage className=''/>
                    </div>
                </div>
            </div>
            <Footer/>
            
        </div>
  )
}

export default ShippingAddressScreen;