import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  recId: { type: String, required: true },
  productId: { type: String, required: true },
  maker: { type: String, required: true },
  image: { type: String, required: true },
  url: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: false },
  ratings: { type: Array, required: false },
}, {
  collection: 'products',
});

const Product = mongoose.model('Product', productSchema);

export default Product;
