import React, { useState } from 'react'
import Hearder from '../../components/header';
import Footer from '../../components/footer';
import { Link, useLocation } from 'react-router-dom';
import { useContext, useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router-dom';
import { Store } from '../../store';
import { getError } from '../../utils';
import axios from 'axios';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import SideBar from '../../components/sidebar';
import {MdDelete} from 'react-icons/md'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import Pagination from '../../components/pagination';
import { BiEdit, BiPlusCircle } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsFillCaretDownFill } from 'react-icons/bs';

const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_SUCCESS':
        return { ...state, 
          products: action.payload.products, 
          pages : action.payload.pages,
          loading: false };
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


const MyProducts = () => {
    const [{ loading, error, products,loadingDelete,pages, successDelete }, dispatch] = useReducer((reducer), {
        
        loading: true,
        error: '',
    });
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [currentPage, setCurrentPage] = useState(queryParams.get('page') || 1);

    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const { state } = useContext(Store);
    const { userInfo } = state;
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([
      
        <input className='p-[10px] w-[180px] outline-none border rounded' placeholder='' type="text" />
    ]);

    const [item, setItem] = useState({})
    const [showSelect, setShowSelect] = useState(false)

    const [selectCategoy, setSelectCategory] = useState("")

    
    //CREATE STATE
    //CREATE STATE
    //CREATE STATE
    //CREATE STATE
    //CREATE STATE

    const [productName, setProductName] = useState("");
    const [productCategoy, setProductCategory] = useState("")
    const [productSubCategories, setProductSubCategories] = useState([{}]);
    const [productPrice, setProductPrice] = useState("");
    const [productQuantity, setProductQuantity]  = useState("");
    const [productDescription, setProductDescription] = useState("")

    const [productImage, setProductImage] = useState("huhu")


    // EDIT STATE
    // EDIT STATE
    // EDIT STATE
    // EDIT STATE
    // EDIT STATE

    const [editproductName, setEditProductName] = useState("");
    const [editproductCategoy, setEditProductCategory] = useState("")
    const [editproductSubCategories, setEditProductSubCategories] = useState([{}]);
    const [editproductPrice, setEditProductPrice] = useState("");
    const [editproductQuantity, setEditProductQuantity]  = useState("");
    const [editproductDescription, setEditProductDescription] = useState("")

    //IMAGE 
    
    console.log(productSubCategories)
    
    useEffect(() => {
        const fetchData = async () => {
        // const result = await axios.get('/api/products');
        // setProducts(result.data);
        try {
            dispatch({ type: 'FETCH_REQUEST' });
            const { data } = await axios.get(`/v4/product/${userInfo._id}/getMyProducts?page=${currentPage}`, {
                headers: { Authorization: `Bearer ${userInfo.token}` },
              });
            
            dispatch({ type: 'FETCH_SUCCESS', payload: {products:data.products, pages: data.pages }});
        } catch (err) {
            dispatch({ type: 'FETCH_FAIL', payload: err.message });
        }
        };
        if (successDelete) {
            dispatch({ type: 'DELETE_RESET' });
          } else {
            fetchData();
          }
        }, [userInfo, successDelete, currentPage]);
    
    useEffect(() => {
      const fetchData = async () => {
      // const result = await axios.get('/api/products');
      // setProducts(result.data);
      try {
        const { data } = await axios.get("/v4/categories/getAllCategories", {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
          
        setCategories(data)
        // console.log(data)
      } catch (err) {
          toast.error(getError(error));
      }
      };
          fetchData();
      }, []);

    // console.log(userInfo)
    const createProductHandler = async () => {
      try {
        dispatch({ type: 'DELETE_REQUEST' });
        const result = await axios.post('/v4/product/createProduct',
        {
          name: productName,
          category : productCategoy,
          sub_categories : productSubCategories,
          description: productDescription,
          quantity : productQuantity,
          price : productPrice,
          images : productImage,

        },{
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
        );
        dispatch({ type: 'DELETE_SUCCESS' });
        toast.success('Create Product successfully');
        setShowModal(false);
      } catch (error) {
        toast.error(getError(error))
        dispatch({
          type: 'DELETE_FAIL',
        });
        
      }
    }

    const editProductHandler = async (product) => {
      try {
        dispatch({ type: 'DELETE_REQUEST' });
        const result = await axios.put(`/v4/product/${product._id}/updateProduct`,
        {
          name: editproductName,
          category : editproductCategoy,
          sub_categories : editproductSubCategories,
          description: editproductDescription,
          quantity : editproductQuantity,
          price : editproductPrice,
          images : "huhu.png",

        },{
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
        );
        dispatch({ type: 'DELETE_SUCCESS' });
        toast.success('Edit Product successfully');
        setShowModal(false);
      } catch (error) {
        toast.error(getError(error))
        dispatch({
          type: 'DELETE_FAIL',
        });
        
      }
    }
    
   
  



  
  

  const deleteHandler = async (product) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        dispatch({ type: 'DELETE_REQUEST' });
        await axios.delete(`/v4/product/${product._id}/deleteProduct`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success('Product deleted successfully');
        dispatch({ type: 'DELETE_SUCCESS' });
      } catch (error) {
        toast.error(getError(error));
        dispatch({
          type: 'DELETE_FAIL',
        });
      }
    }
  };

  
  const handlePageChange = (newPage) => {
    // localStorage.setItem('shoppingCurrentPage', newPage.toString());
    setCurrentPage(newPage);
    // console.log(newPage)
  };
const stopPropagation = (event) => {
  event.stopPropagation();
  };

  const handleCreateSubCetegoriesInput = () => {
    setSubCategories([...subCategories, <input className='p-[10px] w-[180px]  outline-none border rounded' placeholder='' type="text" />]);
  };
  const handleCreateSubCategories = () => {
    setProductSubCategories([...productSubCategories, {label : ""}]);
  };
  const handleEditCreateSubCategories = () => {
    setEditProductSubCategories([...editproductSubCategories, {label : ""}]);
  };
  

  const select = async(product) => {
    setEditProductName(product.name);
    setEditProductCategory(product.category);
    setEditProductPrice(product.price);
    setEditProductQuantity(product.quantity);
    setEditProductDescription(product.description);
    setSelectCategory(product.category);
    setEditProductSubCategories(product.sub_categories);
    setItem(product);
    
    
  }
// console.log(products.length)
  
  return (
    <div className='w-full mt-[100px] bg-[#F1F5F9]'>
        <Hearder/>
        <ToastContainer position="top-right" limit={1} />

        <div className='w-5/6 mx-auto py-[20px] grid grid-cols-5 gap-x-[20px]'>
            
            <SideBar/>
            <div className='col-span-4 border rounded bg-white  p-[10px] shadow-lg'>
              <div className='flex justify-between items-center'>

                <p className='text-2xl font-medium'>Sản phẩm của tôi</p>
                <div onClick={() => {setShowModal(true); setName('Tạo mới sản phẩm')}}  className=' bg-[#cbf1ff] shadow-lg cursor-pointer flex items-center rounded gap-x-[5px] px-[10px] py-[5px]'>
                  <BiPlusCircle className='text-xl'/>
                  <p className='text-xl font-medium'>Tạo mới</p>
                </div>
              </div>
                {
                  loading ? ( 
                    <div className='col-span-4'>

                        <LoadingBox/>
                    </div>
                    ) : error ? (
                        <div className='col-span-4'>

                            <MessageBox variant="danger">{error}</MessageBox>
                        
                        </div>
                  ) : (
                // <div className='w-full  text-lg font-semibold flex flex-col mt-[10px] gap-y-[10px]'>
                 
                // </div>
                <div className="mt-[5px]">
  
                  <div className="overflow-y-hidden rounded border">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className=" bg-gray-300 text-left text-xs font-semibold uppercase tracking-widest">
                            <th className="px-5 py-3">ID</th>
                            <th className="px-5 py-3">Sản phẩm</th>
                            <th className="px-5 py-3">Giá</th>
                            <th className="px-5 py-3">Số lượng</th>
                            <th className="px-5 py-3"></th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-500">
                          {
                            products.map((product, index) => (
                              <tr className={`${index === products.length-1 ? "" : "border-b" }`}>
                            <td className={` border-gray-200 bg-white px-5 py-5 text-sm`}>
                              <p className="whitespace-no-wrap">{product._id}</p>
                            </td>
                            <td className=" border-gray-200 bg-white px-5 py-5 text-sm">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <img className="h-full w-full rounded-full" src={product.images} alt="" />
                                </div>
                                <div className="ml-3">
                                  <p className="whitespace-no-wrap">{product.name}</p>
                                </div>
                              </div>
                            </td>
                            <td className=" border-gray-200 bg-white px-5 py-5 text-sm">
                              <p className="whitespace-no-wrap">{product.price}</p>
                            </td>
                            <td className="  border-gray-200 bg-white px-5 py-5 text-sm">
                              <p className="whitespace-no-wrap">{product.quantity}</p>
                            </td>

                            <td className="  border-gray-200 bg-white px-5 py-5 text-sm">
                              <div className='flex'>

                                <button onClick={() => {setShowModal(true); setName('Chỉnh sửa sản phẩm'); select(product); }}>

                                  <BiEdit className=' text-2xl'/>
                                </button>
                                <button onClick={() => deleteHandler(product)}>

                                  <MdDelete className='text-red-300 text-2xl'/>
                                </button>
                              </div>
                              
                            </td>
                          </tr>
                            ))
                          }
                          
                        </tbody>
                      </table>
                    </div>
                    
                  </div>
                </div>


                  )
                }
                <div className='mt-[20px] flex justify-center items-center'>
                
                <Pagination
                    currentPage={currentPage}
                    totalPages={pages}
                    onPageChange={handlePageChange}
                    // number = {localStorage.getItem('shoppingCurrentPage')}
                />

            </div>
                
                
            </div>
        </div>
        <Footer/>
        {
          showModal && (

        <div onClick={()=> {setShowModal(false); setName(""); setShowSelect(false); setSelectCategory("")}} className='fixed z-10 top-0 right-0 bottom-0 left-0 bg-gray-300/50 '>
          <div onClick={stopPropagation} className='fixed flex flex-col  w-[50%] gap-[10px] p-[10px] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-white rounded overflow-y-auto max-h-[90vh]'>
            <p className='font-medium text-xl'>{name}</p>
            {
              name === "Tạo mới sản phẩm" ? (
                <div className='flex flex-col  gap-[20px] '>
                  <div className='flex gap-[20px]'>

                    <div className='flex flex-col w-[50%]'>
                      <label className='text-sm font-medium' htmlFor="">Tên sản phẩm</label>
                      <input onChange={(e) => setProductName(e.target.value)}  className='p-[10px] outline-none border rounded' placeholder='' type="text" />
                    </div>

                    <div className='flex flex-col w-[50%]'>
                      <label className='text-sm font-medium' htmlFor="">Thể loại</label>
                      <div className='relative'>

                        <div onClick={()=> setShowSelect(!showSelect)} className='cursor-pointer p-[10px] border rounded flex items-center justify-between'>
                          
                          {
                            selectCategoy !== "" ? (<p >{selectCategoy}</p>) : (<p >Lựa chọn</p>)
                          }
                          {
                            showSelect === false ? (<BsFillCaretDownFill className='-rotate-90'/>) : (<BsFillCaretDownFill/>)
                          }
                          
                        </div>
                        <div className={`absolute border w-full bg-gray-100 rounded z-10 ${showSelect === false ? "hidden" : ""} `}>
                          <ul className='flex flex-col gap-[5px]'>
                            {
                              categories.map((category) => (
                                <li onClick={()=> {setShowSelect(false);setProductCategory(category.title) ;setSelectCategory(category.title)}} className='p-[10px] cursor-pointer hover:bg-[#cbf1ff]'>
                                  {category.title}
                                </li>
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                      
                    </div>
                  </div>


                  <div className='flex flex-col '>
                    <label className='text-sm font-medium' htmlFor="">Thuộc tính</label>
                    <div className='flex flex-wrap items-center gap-[5px]'>
                      {/* {subCategories.map((inputElement, index) => (
                        <div className='flex'>
                          {inputElement}
                        </div>
                      ))} */}
                      {
                        productSubCategories.map((subCategory, index) => {
                           return(
                            <input onChange={(e)=> 
                            {
                              const updatedSubCategories = [...productSubCategories];
                              updatedSubCategories[index] = {"label" : e.target.value};
                              setProductSubCategories(updatedSubCategories);
                            }
                            } 
                            
                            className='p-[10px] w-[180px] outline-none border rounded' placeholder='' type="text" />

                           )
                        })
                      }
                      <BiPlusCircle onClick={() => {handleCreateSubCategories()}} className='text-xl'/>
                    </div>
                  </div>
                  <div className='flex gap-[20px]'>

                    <div className='flex flex-col w-[50%]'>
                      <label className='text-sm font-medium' htmlFor="">Giá</label>
                      <input onChange={(e) => setProductPrice(e.target.value)}  className='p-[10px] outline-none border rounded' placeholder='' type="text" />
                    </div>

                    <div className='flex flex-col w-[50%]'>
                      <label className='text-sm font-medium' htmlFor="">Số lượng</label>
                      <input onChange={(e) => setProductQuantity(e.target.value)}  className='p-[10px] outline-none border rounded' placeholder='' type="text" />
                    </div>
                  </div>

                  <div className='flex flex-col '>
                    <label className='text-sm font-medium' htmlFor="">Ảnh</label>
                    <div className='flex gap-[20px]'>
                      <div className='h-[100px] w-[100px] flex justify-center items-center bg-gray-100 border border-black/50 border-dashed '>
                        <AiOutlinePlus className='opacity-50 text-2xl' />
                      </div>

                      <div className='h-[100px] w-[100px] flex justify-center items-center bg-gray-100 border border-black/50 border-dashed '>
                        <AiOutlinePlus className='opacity-50 text-2xl' />
                      </div>

                      <div className='h-[100px] w-[100px] flex justify-center items-center bg-gray-100 border border-black/50 border-dashed '>
                        <AiOutlinePlus className='opacity-50 text-2xl' />
                      </div>

                      <div className='h-[100px] w-[100px] flex justify-center items-center bg-gray-100 border border-black/50 border-dashed '>
                        <AiOutlinePlus className='opacity-50 text-2xl' />
                      </div>

                      <div className='h-[100px] w-[100px] flex justify-center items-center bg-gray-100 border border-black/50 border-dashed '>
                        <AiOutlinePlus className='opacity-50 text-2xl' />
                      </div>
                    </div>
                  </div>

                  <div className='flex flex-col '>
                    <label className='text-sm font-medium' htmlFor="">Thông tin mô tả</label>
                    {/* <input  className='p-[10px] outline-none border rounded' placeholder='' type="text" /> */}
                    <textarea onChange={(e) => setProductDescription(e.target.value)} className='outline-none border' name="" id="" cols="1" rows="2"></textarea>
                  </div>

                  <div>
                    <button onClick={() => {createProductHandler(); setSelectCategory("")}}  className='bg-[#cbf1ff] shadow-lg rounded px-[20px] py-[10px]'>
                      Hoàn tất
                    </button>
                  </div>
                </div>
              ) : (
                // EDIT DAY NE
                // EDIT DAY NE
                // EDIT DAY NE
                // EDIT DAY NE
                // EDIT DAY NE
                // EDIT DAY NE
                // EDIT DAY NE
                // EDIT DAY NE
                <div className='flex flex-col  gap-[20px] '>
                  <div className='flex gap-[20px]'>

                    <div className='flex flex-col w-[50%]'>
                      <label className='text-sm font-medium' htmlFor="">Tên sản phẩm</label>
                      <input onChange={(e) => setEditProductName(e.target.value)} value={editproductName}  className='p-[10px] outline-none border rounded' placeholder='' type="text" />
                    </div>

                    <div className='flex flex-col w-[50%]'>
                      <label className='text-sm font-medium' htmlFor="">Thể loại</label>
                      <div className='relative'>

                        <div onClick={()=> setShowSelect(!showSelect)} className='cursor-pointer p-[10px] border rounded flex items-center justify-between'>
                          
                          {
                            selectCategoy !== "" ? (<p >{selectCategoy}</p>) : (<p >Lựa chọn</p>)
                          }
                          {
                            showSelect === false ? (<BsFillCaretDownFill className='-rotate-90'/>) : (<BsFillCaretDownFill/>)
                          }
                          
                        </div>
                        <div className={`absolute border w-full bg-gray-100 rounded z-10 ${showSelect === false ? "hidden" : ""} `}>
                          <ul className='flex flex-col gap-[5px]'>
                            {
                              categories.map((category) => (
                                <li onClick={()=> {setShowSelect(false);setEditProductCategory(category.title) ;setSelectCategory(category.title)}}  className='p-[10px] cursor-pointer hover:bg-[#cbf1ff]'>
                                  {category.title}
                                </li>
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                      
                    </div>
                  </div>


                  <div className='flex flex-col '>
                    <label className='text-sm font-medium' htmlFor="">Thuộc tính</label>
                    <div className='flex flex-wrap items-center gap-[5px]'>
                      {/* {subCategories.map((inputElement, index) => (
                        <div className='flex'>
                          {inputElement}
                        </div>
                      ))} */}
                      {
                        editproductSubCategories.map((subCategory, index) => {
                           return(
                            <input value={subCategory.label} onChange={(e)=> 
                            {
                              const updatedSubCategories = [...editproductSubCategories];
                              updatedSubCategories[index] = {"label" : e.target.value};
                              setEditProductSubCategories(updatedSubCategories);
                            }
                            } 
                            
                            className='p-[10px] w-[180px] outline-none border rounded' placeholder='' type="text" />

                           )
                        })
                      }
                      <BiPlusCircle onClick={() => {handleEditCreateSubCategories()}} className='text-xl'/>
                    </div>
                  </div>
                  <div className='flex gap-[20px]'>

                    <div className='flex flex-col w-[50%]'>
                      <label className='text-sm font-medium' htmlFor="">Giá</label>
                      <input onChange={(e) => setEditProductPrice(e.target.value)} value={editproductPrice}  className='p-[10px] outline-none border rounded' placeholder='' type="text" />
                    </div>

                    <div className='flex flex-col w-[50%]'>
                      <label className='text-sm font-medium' htmlFor="">Số lượng</label>
                      <input onChange={(e) => setEditProductQuantity(e.target.value)} value={editproductQuantity}  className='p-[10px] outline-none border rounded' placeholder='' type="text" />
                    </div>
                  </div>

                  <div className='flex flex-col '>
                    <label className='text-sm font-medium' htmlFor="">Ảnh</label>
                    <div className='flex gap-[20px]'>
                      <div className='h-[100px] w-[100px] flex justify-center items-center bg-gray-100 border border-black/50 border-dashed '>
                        <AiOutlinePlus className='opacity-50 text-2xl' />
                      </div>

                      <div className='h-[100px] w-[100px] flex justify-center items-center bg-gray-100 border border-black/50 border-dashed '>
                        <AiOutlinePlus className='opacity-50 text-2xl' />
                      </div>

                      <div className='h-[100px] w-[100px] flex justify-center items-center bg-gray-100 border border-black/50 border-dashed '>
                        <AiOutlinePlus className='opacity-50 text-2xl' />
                      </div>

                      <div className='h-[100px] w-[100px] flex justify-center items-center bg-gray-100 border border-black/50 border-dashed '>
                        <AiOutlinePlus className='opacity-50 text-2xl' />
                      </div>

                      <div className='h-[100px] w-[100px] flex justify-center items-center bg-gray-100 border border-black/50 border-dashed '>
                        <AiOutlinePlus className='opacity-50 text-2xl' />
                      </div>
                    </div>
                  </div>

                  <div className='flex flex-col '>
                    <label className='text-sm font-medium' htmlFor="">Thông tin mô tả</label>
                    {/* <input  className='p-[10px] outline-none border rounded' placeholder='' type="text" /> */}
                    <textarea onChange={(e) => setEditProductDescription(e.target.value)} value={editproductDescription} className='outline-none border' name="" id="" cols="1" rows="2"></textarea>
                  </div>

                  <div>
                    <button onClick={() => { editProductHandler(item)}}  className='bg-[#cbf1ff] shadow-lg rounded px-[20px] py-[10px]'>
                      Hoàn tất
                    </button>
                  </div>
                </div>
              )
            }
          </div>
        </div>
          )
        }
    </div>
  )
}

export default MyProducts;