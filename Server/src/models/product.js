const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    text: {type: String, required:true},
    // category: {type: String, required: true},
    price: {type: String, required: true},
    // salePrice: {type: String, required: true},
//     price: { type: Number, required: true },
salePrice: { type: Number, required: true,default: 0  },
    stock: {type: String, required: true},
    image: {type: String, required: true},
    category: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Category",
  
}
    
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
