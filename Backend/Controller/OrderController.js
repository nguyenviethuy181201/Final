import mongoose from 'mongoose';
import Order from '../Models/OrderModels.js';
import asyncHandler from 'express-async-handler';
import Product from '../Models/ProductModels.js';
import User from '../Models/UserModels.js';
import Notification from '../Models/NotificationModels.js';

// api user create order
const createOrder = asyncHandler(async (req, res) => {
  const {
    shippingAddress,
    orderItems,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body;



  // const user = await User.findById(req.user._id);
  // /*  console.log('user', user._id); */
  // // Lấy thông tin của sản phẩm và thêm sellerId vào orderItems
  // for (const item of orderItems) {
  //   const productId = item.productId;
  //   const product = await Product.findById(productId);
  //   if (product) {
  //     item.sellerId = product.sellerId; // Lưu thông tin người bán vào orderItems
  //   } else {
  //     // Xử lý trường hợp không tìm thấy sản phẩm
  //     item.sellerId = null;
  //   }
  // }
  // Tạo một đối tượng Order mới
  const order = new Order({
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
    orderItems : orderItems.map((x) => ({ ...x, product: x._id, image: x.images[0] })),
    user: req.user._id
    
  });
  

  /* for (const item of orderItems) {
    const productId = item.productId;
    item.sellerId = productId.sellerId; // Thêm thông tin người bán vào sản phẩm
    console.log('item.sellerId : ');
    console.log('productId:', item.productId);
  } */

  // Lưu đơn hàng vào cơ sở dữ liệu
  const createdOrder = await order.save();

  /* console.log("..user: " + user); */
  // Duyệt qua tất cả các sản phẩm (orderItems) để tạo thông báo cho từng sellerId
  // for (const item of orderItems) {
  //   const sellerId = item.sellerId;

  //   const notification = new Notification({
  //     sellerId: sellerId,
  //     message: `Bạn có đơn hàng mới từ khách hàng có id là ${user._id}, Họ và Tên là : ${user.fullName}`,
  //   });
  //   await notification.save();
  // }

  res.status(201).json(createdOrder);
});

// api get my order
const getMyOrder = asyncHandler(async (req, res) => {
  try {
    const myOrder = await Order.find({ user: req.user._id });

    if (!myOrder) {
      res.status(404).json({
        message:
          'Your order could not be found or you do not have an order yet ',
      });
    }
    res.status(200).json(myOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  // console.log(req);
});

// api get noftification unread

const getNotifiUnread = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    /* console.log('...id', req.user.id); */
    if (!user) {
      return res.status(404).json({ error: 'Không tìm thấy người dùng.' });
    }
    const notifications = await Notification.find({
      sellerId: user._id,
      isRead: false,
    }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi lấy danh sách thông báo.' });
  }
});

// api confirm seller read notifications

const sellerConfirmReadNotifi = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const notification = await Notification.findByIdAndUpdate(id, {
      isRead: true,
    });
    if (!notification) {
      return res.status(404).json({ error: 'Không tìm thấy thông báo.' });
    }
    res.json(notification);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi cập nhật trạng thái thông báo.' });
  }
});

const getOrderDetail = asyncHandler(async (req, res) => {
  try{
    const order = await Order.findById(req.params.id);
    if(order){
      res.send(order)
    }
  }catch(error){
    res.status(500).json({ message: error.message })
  }
})


const getOrderResult = asyncHandler(async (req, res) => {
  try{
    const order = await Order.findById(req.params.id);
    if(order){
      res.send(order)
    }
  }catch(error){
    res.status(500).json({ message: error.message })
  }
})



export { createOrder, getMyOrder, getNotifiUnread, sellerConfirmReadNotifi, getOrderDetail, getOrderResult };
