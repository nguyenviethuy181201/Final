import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    userName: { type: String, required: true },
    userImage: { type: String },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now(),
    },
    images: { type: String },
  },
  {
    timestamps: true,
  }
);

const ProductSchema = mongoose.Schema(
  {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    sub_categories: [
      {
        _id: false,
        label: {
          type: String,
        },
      },
    ],
    description: {
      type: String,
      // maxLength: [255, 'Describe product not longer 255 character....'],
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    rate: {
      type: Number,
      require: true,
      default: 0,
    },
    images: [
      {
        type: String,
        /*  required: true, */
      },
    ],
    numberOfReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    comments: [reviewSchema],
  }
  /* {
    id: false,
    timestamps: true,
  } */
);

export default mongoose.model('Product', ProductSchema);
