const Product = require("../models/product");

const getStockNumber = (stock) => {
  const n = parseInt(stock, 10);
  return Number.isNaN(n) ? 0 : n;
};

const checkStockAvailability = async (items) => {
  const errors = [];
  for (const item of items) {
    const product = await Product.findById(item.product || item.productId);
    if (!product) {
      errors.push(`Product not found`);
      continue;
    }
    const available = getStockNumber(product.stock);
    const qty = item.quantity || 1;
    if (available < qty) {
      errors.push(
        `Only ${available} item(s) available in stock for ${product.text}.`
      );
    }
  }
  return errors;
};

const decrementStock = async (items) => {
  for (const item of items) {
    const product = await Product.findById(item.product);
    if (!product) continue;
    const current = getStockNumber(product.stock);
    const newStock = Math.max(0, current - item.quantity);
    product.stock = String(newStock);
    await product.save();
  }
};

const incrementStock = async (items) => {
  for (const item of items) {
    const product = await Product.findById(item.product);
    if (!product) continue;
    const current = getStockNumber(product.stock);
    product.stock = String(current + (item.quantity || 1));
    await product.save();
  }
};

module.exports = {
  getStockNumber,
  checkStockAvailability,
  decrementStock,
  incrementStock,
};
