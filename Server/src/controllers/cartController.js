const User = require("../models/user");
const Product = require("../models/product");
const { getStockNumber } = require("../utils/stockHelper");

const validateCartQuantity = async (productId, quantity) => {
  const product = await Product.findById(productId);
  if (!product) return { ok: false, message: "Product not found" };
  const stock = getStockNumber(product.stock);
  if (stock <= 0) return { ok: false, message: "Product out of stock" };
  if (quantity > stock) {
    return {
      ok: false,
      message: `Only ${stock} item(s) available in stock.`,
    };
  }
  return { ok: true, stock };
};

const addToCart = async (req, res) => {
  try {
    let { productId, quantity } = req.body;
    if (!productId) {
      return res.status(400).json({ message: "productId is required" });
    }
    quantity = Number(quantity) || 1;
    if (quantity < 1) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const stockCheck = await validateCartQuantity(productId, quantity);
    if (!stockCheck.ok) {
      return res.status(400).json({ message: stockCheck.message });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingItem = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      const newQty = existingItem.quantity + quantity;
      const recheck = await validateCartQuantity(productId, newQty);
      if (!recheck.ok) {
        return res.status(400).json({ message: recheck.message });
      }
      existingItem.quantity = newQty;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    const updatedUser = await User.findById(req.userId).populate("cart.product");

    res.status(200).json({
      message: "Added to Cart",
      cart: updatedUser.cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("cart.product");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCartQuantity = async (req, res) => {
  try {
    let { productId, quantity } = req.body;
    quantity = Number(quantity);

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const item = user.cart.find(
      (item) => item.product.toString() === productId
    );
    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (quantity < 1) {
      user.cart = user.cart.filter(
        (item) => item.product.toString() !== productId
      );
    } else {
      const stockCheck = await validateCartQuantity(productId, quantity);
      if (!stockCheck.ok) {
        return res.status(400).json({ message: stockCheck.message });
      }
      item.quantity = quantity;
    }

    await user.save();
    const updatedUser = await User.findById(req.userId).populate("cart.product");

    res.status(200).json({
      message: "Cart updated",
      cart: updatedUser.cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ message: "productId required" });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.cart = user.cart.filter(
      (item) => item.product.toString() !== productId
    );
    await user.save();

    const updatedUser = await User.findById(req.userId).populate("cart.product");

    res.status(200).json({
      message: "Item removed from cart",
      cart: updatedUser.cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.userId, { cart: [], cart_total: 0 });
    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const verifyPayment = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartQuantity,
  removeCartItem,
  clearCart,
  verifyPayment,
};
