import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, transform: () => {} },
  Id: { type: String, required: true },
  Maker: { type: String, required: true },
  Image: { type: String, required: true },
  Url: { type: String, required: true },
  Title: { type: String, required: true },
  Description: { type: String, required: false },
  Ratings: { type: Array, required: false },
}, {
  collection: 'products',
  minimize: true,
});

const Product = mongoose.model('Product', productSchema);

export default Product;
