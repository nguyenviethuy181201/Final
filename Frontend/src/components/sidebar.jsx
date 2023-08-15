import React from 'react'
import Hearder from './header';
import Footer from './footer';
import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { Store } from '../store';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const SideBar = () => {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;
    const location = useLocation();
    const [highlightedItem, setHighlightedItem] = useState('');

    const signoutHandler = () => {
        ctxDispatch({ type: 'USER_SIGNOUT' });
        localStorage.removeItem('userInfo');
        localStorage.removeItem('shippingAddress');
        localStorage.removeItem('paymentMethod');
  };
  useEffect(() => {
    const pathname = location.pathname.substring(1);
    setHighlightedItem(pathname);
    // Thêm các điều kiện xử lý cho các đường dẫn khác ở đây (nếu cần)
}, [location]);
  
//   useEffect(() => {
//     const storedItem = localStorage.getItem('highlightedItem');
//     if (storedItem) {
//         setHighlightedItem(storedItem);
//     }
// }, [location]);
 
    // const handleItemClick = (itemName) => {
    //     setHighlightedItem(itemName);
    //     // localStorage.setItem('highlightedItem', itemName);
    // };
  return (
    <div className='w-full'>
            {
                userInfo && userInfo.role ==="user" ?  (

                <div className='col-span-1 bg-white rounded ' >
                    <ul className='flex flex-col gap-y-[10px] p-[10px]'>
                        
                            <li className={ `${highlightedItem === 'profile' ? 'bg-orange-100' : 'hover:bg-orange-100' } rounded p-[10px]`} >
                                
                                <Link to="/profile">
                                    <p className='text-xl font-medium '>Profile</p>

                                </Link>
                            </li>
                            <li className={ `${highlightedItem === 'orderhistory' ? 'bg-orange-100' : 'hover:bg-orange-100' } rounded p-[10px]`} >
                                <Link to="/orderhistory">
                                
                                    <p className='text-xl font-medium '>Order history</p>
                                </Link>
                            </li>
                            <li className=' rounded p-[10px] hover:bg-orange-100'>
                                <Link onClick={signoutHandler} to="/">
                                
                                    <p className='text-xl font-medium '>Log out</p>
                                </Link>
                            </li>
                        
                    </ul>
                </div>
                ) : userInfo && userInfo.role === "admin" ? (
                    <div className='col-span-1 bg-slate-300 rounded ' >
                        <ul className='flex flex-col gap-y-[10px] p-[10px]'>
                            
                                <li className={ `${highlightedItem === 'profile' ? 'bg-orange-100' : 'hover:bg-orange-100' } rounded p-[10px]`} >
                                   
                                    <Link to="/profile">
                                    
                                    <p className='text-xl font-medium'>Profile</p>
                                    </Link>
                                </li>
                                <li className={ `${highlightedItem === 'dashboard' ? 'bg-orange-100' : 'hover:bg-orange-100' } rounded p-[10px]`} >
                                    <Link to="">
                                    
                                        <p className='text-xl font-medium'>Dashboard</p>
                                    </Link>
                                </li>
                                <li className={ `${highlightedItem === 'orders' ? 'bg-orange-100' : 'hover:bg-orange-100' } rounded p-[10px]`} >
                                    <Link to="/orders">
                                    
                                        <p className='text-xl font-medium'>Orders</p>
                                    </Link>
                                </li>

                                <li className={ `${highlightedItem === 'users' ? 'bg-orange-100' : 'hover:bg-orange-100' } rounded p-[10px]`} >
                                    <Link to="/users">
                                    
                                        <p className='text-xl font-medium'>Users</p>
                                    </Link>
                                </li>
                                <li className={ `${highlightedItem === 'products' ? 'bg-orange-100' : 'hover:bg-orange-100' } rounded p-[10px]`} >
                                    <Link to="/products">
                                    
                                        <p className='text-xl font-medium'>Products</p>
                                    </Link>
                                </li>

                                <li className='rounded p-[10px] hover:bg-orange-100'>
                                    <Link onClick={signoutHandler} to="/">
                                    
                                        <p className='text-xl font-medium'>Log out</p>
                                    </Link>
                                </li>
                            
                        </ul>
                    </div>
                ) : (
                   <p>huhu</p>
                )
            }

    </div>
  )
}

export default SideBar;