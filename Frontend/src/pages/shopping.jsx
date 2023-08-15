import React from 'react'
import Hearder from '../components/header';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';
import { useContext, useState, useReducer, useEffect } from 'react';
import { Store } from '../store';
import UserTest from '../components/sidebar';
import {AiFillCaretDown, AiFillStar,AiOutlineStar} from 'react-icons/ai';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Product from '../components/product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_SUCCESS':
        return { ...state, products: action.payload, loading: false };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

const Shopping = () => {
  
const [showCategory, setShowCategory] = useState(false);
const [showReview, setShowReview] = useState(false);
const [showPrice, setShowPrice] = useState(false);
const [show, setShow] = useState(false);
const [categories, setCategories] = useState([]);
const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
});
useEffect(() => {
    const fetchData = async () => {
    // const result = await axios.get('/api/products');
    // setProducts(result.data);
    dispatch({ type: 'FETCH_REQUEST' });
    try {
        const result = await axios.get('/v4/product/getAllProducts');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.products });
    } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
    }
    };
    fetchData();

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/v4/categories/getAllCategories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }
    fetchCategories();
}, []);

console.log(categories);


  return (
    
    <div className='w-full mt-[200px] bg-[#F1F5F9]'>
        <Hearder/>
        <div className='w-5/6 mx-auto py-[50px] grid grid-cols-5 gap-x-[20px]'>

            <div className="col-span-1  rounded overflow-hidden">
                <div className=''>
                    <div className='flex cursor-pointer items-center rounded-tl rounded-tr gap-x-[5px] bg-red-200 p-[5px]'  onClick={() => setShowCategory(!showCategory)}>
                        {
                            showCategory ? (
                                <AiFillCaretDown />
                            ) : (
                                <AiFillCaretDown className='-rotate-90'/>
                            )
                        }
                        
                        <p className="text-2xl font-medium " >Thể loại</p>
                    </div>
                    {showCategory && (
                    <ul className=' flex items-center flex-col gap-y-[10px] p-[10px] bg-white'>
                        {
                            categories.map((category) => (

                            <li className=' text-xl cursor-pointer w-full rounded border flex justify-start p-[5px] bg-gray-300 '>
                                {category.title}
                            </li>
                            ))
                        }
                        
                    </ul>
                    )}
                </div>
                <div className=''>
                    <div className='flex cursor-pointer items-center gap-x-[5px] bg-red-200 p-[5px]' onClick={() => setShowReview(!showReview)}>
                        {
                            showReview ? (
                                <AiFillCaretDown />
                            ) : (
                                <AiFillCaretDown className='-rotate-90'/>
                            )
                        }
                        
                        <p className="text-2xl font-medium" >Đánh giá</p>
                    </div>
                    {showReview && (
                    <ul className=' flex items-start flex-col gap-y-[10px] p-[10px] bg-white'>
                        <li className='text-xl cursor-pointer flex'>
                            <AiFillStar className="text-yellow-300"/>
                            <AiOutlineStar className="text-yellow-300"/>
                            <AiOutlineStar className="text-yellow-300"/>
                            <AiOutlineStar className="text-yellow-300"/>
                            <AiOutlineStar className="text-yellow-300"/>
                        </li>

                        <li className='text-xl cursor-pointer flex'>
                            <AiFillStar className="text-yellow-300"/>
                            <AiFillStar className="text-yellow-300 "/>
                            <AiOutlineStar className="text-yellow-300"/>
                            <AiOutlineStar className="text-yellow-300"/>
                            <AiOutlineStar className="text-yellow-300"/>
                        </li>

                        <li className='flex cursor-pointer text-xl '>
                            <AiFillStar className="text-yellow-300"/>
                            <AiFillStar className="text-yellow-300"/>
                            <AiFillStar className="text-yellow-300"/>
                            <AiOutlineStar className="text-yellow-300"/>
                            <AiOutlineStar className="text-yellow-300"/>
                        </li>

                        <li className='text-xl cursor-pointer flex'>
                            <AiFillStar className="text-yellow-300"/>
                            <AiFillStar className="text-yellow-300"/>
                            <AiFillStar className="text-yellow-300"/>
                            <AiFillStar className="text-yellow-300"/>
                            <AiOutlineStar className="text-yellow-300"/>
                        </li>

                        <li className='flex cursor-pointer text-xl '>
                            <AiFillStar className="text-yellow-300"/>
                            <AiFillStar className="text-yellow-300"/>
                            <AiFillStar className="text-yellow-300"/>
                            <AiFillStar className="text-yellow-300"/>
                            <AiFillStar className="text-yellow-300"/>
                        </li>
                        
                    </ul>
                    )}
                </div>
                <div className=''>
                    <div className='flex items-center gap-x-[5px] rounded-bl rounded-br cursor-pointer bg-red-200 p-[5px]' onClick={() => setShowPrice(!showPrice)}>
                        {
                            showPrice ? (
                                <AiFillCaretDown />
                            ) : (
                                <AiFillCaretDown className='-rotate-90'/>
                            )
                        }
                        
                        <p className="text-2xl font-medium" >Giá</p>
                    </div>
                    {showPrice && (
                    <ul className=' flex items-center flex-col gap-y-[10px] p-[10px] bg-white'>
                        <li className='flextext-xl cursor-pointer w-full rounded border flex justify-start p-[5px] bg-gray-300'>
                            0 - 1,000,000
                        </li>
                        <li className='flextext-xl cursor-pointer w-full rounded border flex justify-start p-[5px] bg-gray-300'>
                            1,000,001 - 10,000,000
                        </li>
                        <li className='flextext-xl cursor-pointer  w-full rounded border flex justify-start p-[5px] bg-gray-300'>
                            10,000,000 - 100,000,000
                        </li>
                    </ul>
                    )}
                </div>
                
                
            </div>
            
            <div className='col-span-4  rounded  '>
                <div className='flex justify-between bg-white p-[5px] items-center'>
                    <p className='text-xl'>kết quả</p>
                    <div>
                        <div className='relative cursor-pointer border rounded w-[150px] h-[40px] border rounded flex justify-between items-center px-[5px] ' onClick={() => setShow(!show)}>
                            <p>Sort by</p>
                            <AiFillCaretDown/>

                            {
                                show && (
                                    <div className='absolute w-[150px] z-1 z-10 top-[40px] left-0 bg-white rounded' >
                                        <ul className=''>
                                            <li className='hover:bg-red-200 p-[5px] cursor-pointer'>
                                                Giá giảm dần
                                            </li>
                                            <li className='hover:bg-red-200 p-[5px] cursor-pointer'>
                                                Giá tăng dần
                                            </li>
                                        </ul>
                                    </div>

                                )
                            }
                        </div>
                    </div>
                </div>

                <div className=' mt-[10px] rounded grid grid-cols-4 gap-[20px]'>
                {loading ? (
                       <LoadingBox/>
                    ) : error ? (
                        <MessageBox>{error}</MessageBox>
                    ) : (  
                        products.map((product) => (
                            <div>
                                <Product product={product}/>
                            </div>

                        ))
                    )}
                </div>
            </div>
        </div>
        <Footer/>
        
    </div>
    
  )
}

export default Shopping;


