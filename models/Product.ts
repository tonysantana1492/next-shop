import mongoose,{ Model, Schema } from "mongoose";
import { IProduct } from "../interfaces";

const productSchema = new Schema({
  description: { type: String, required: true, default: '' },
  images: [{ type: String }],
  inStock: { type: Number, required: true, default: 0 },
  price: { type: Number, required: true, default: 0 },
  sizes: [
    {
      type: String,
      required: true,
      enum: {
        values: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
        message: "{VALUE} is not a valid size",
      },
    },
  ],
  slug: { type: String, required: true, unique: true },
  tags: [{ type: String }],
  title: { type: String, required: true, default: '' },
  type: {
    type: String,
    required: true,
    enum: {
      values: ["shirts", "pants", "hoodies", "hats"],
      message: "{VALUE} is not a valid type",
    },
    default: 'shirts'
  },
  gender: {
    type: String,
    required: true,
    enum: {
      values: ["men", "women", "kid", "unisex"],
      message: "{VALUE} is not a valid gender",
    },
    default: 'unisex'
  },
},{
    timestamps: true
});

productSchema.index({title: 'text', tags: 'text'});

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product; 
