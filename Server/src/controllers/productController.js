const { json } = require("express");
const Product = require("../models/product");

const getProduct = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json({ message: "Product fetched successfully", products });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

const getProductSingle = async (req, res) => {
  try {
    const { id } = req.params; // get the id from the URL
    const product = await Product.findById(id); // fetch single product by id

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Single Product fetched successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
};

const postProduct = async (req, res) => {
  try {
    // console.log("postProduct")
    const { text, category, price, salePrice, stock } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const product = new Product({
      text,
      category,
      price,
      salePrice,
      stock,
      image: req.file.filename
    });

    await product.save();
    
    res.status(201).json({
      success: true,
      message:"Product created successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({                 
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

const putProduct = async (req, res) => {
  try {
    const { text, category, price, salePrice, stock } = req.body;
    const updateData = { text, category, price, salePrice, stock };
    if (req.file) updateData.image = req.file.filename;

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
const deleteProduct = async (req, res) => {
  try{
      const product = await Product.findByIdAndDelete(req.params.id)
      res.json({ message: "Product deleted", product});
    }catch (error) {
      res.status(500).json({ message: error.message || "Internal server error"})
  }
};

module.exports = { getProduct, postProduct, putProduct, deleteProduct, getProductSingle,  };
