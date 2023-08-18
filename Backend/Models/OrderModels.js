import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  // shippingInfo: {
  //   address: { type: String, required: true },
  //   city: { type: String, required: true },
  //   state: { type: String, required: true },
  //   country: { type: String, required: true },
  //   pinCode: {
  //     type: Number,
  //     required: true,
  //   },
  //   phoneNo: {
  //     type: Number,
  //     required: true,
  //   },
  // },
  // orderItems: [
  //   {
  //     productId: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: 'Product',
  //       required: true,
  //     },
  //     userId: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: 'User',
  //       /* required: true, */
  //     },
  //     sellerId: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: 'User',
  //       /* required: true, */
  //     },
  //     name: {
  //       type: String,
  //       required: true,
  //     },
  //     price: {
  //       type: Number,
  //       required: true,
  //     },
  //     quantity: {
  //       type: Number,
  //       required: true,
  //     },
  //     image: {
  //       type: String,
  //       required: true,
  //     },
  //     /* product: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: 'Product',
  //       required: true,
  //     }, */
  //   },
  // ],
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  // },
  // paymentInfo: {
  //   id: {
  //     type: String,
  //     required: true,
  //   },
  //   status: {
  //     type: String,
  //     enum: ['Unpaid', 'Paid'],
  //     default: 'Unpaid',
  //   },
  //   paymentMethods: {
  //     type: String,
  //     enum: ['Thanh toán khi nhận hàng', 'Thanh toán qua ví điện tử'],
  //     required: true,
  //   },
  // },
  // paidAt: {
  //   type: String,
  //   required: true,
  // },
  // itemsPrice: {
  //   type: Number,
  //   default: 0,
  // },
  // taxPrice: {
  //   type: Number,
  //   default: 0,
  // },
  // shippingPrice: {
  //   type: Number,
  //   default: 0,
  // },
  // totalPrice: {
  //   type: Number,
  //   default: 0,
  // },
  // orderStatus: {
  //   type: String,
  //   required: true,
  //   enum: [
  //     'Chờ xác nhận',
  //     'Đã xác nhận',
  //     'Đang đóng gói',
  //     'Đang gửi hàng',
  //     'Hoàn thành đơn hàng',
  //     'Hủy đơn hàng',
  //     'Hoàn tiền',
  //   ],
  //   default: 'Chờ xác nhận',
  // },
  // deliveriedAt: Date,
  // createdAt: { type: Date, default: Date.now },
  orderItems: [
    {
      
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    },
  ],
  shippingAddress: {
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
  },
  paymentMethod: { type: String, required: true },
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
    email_address: String,
  },
  itemsPrice: { type: Number, required: true },
  shippingPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date },
  isDelivered: { type: Boolean, default: false },
  deliveredAt: { type: Date },
},
{
  timestamps: true,
}

);

export default mongoose.model('Order', orderSchema);
