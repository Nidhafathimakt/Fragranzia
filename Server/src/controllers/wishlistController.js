const User = require("../models/user");

const addToWishlist = async (req, res) => {
    try {
        const { productId} = req.body;
    
        console.log(req.userId, "==req.userId");
    
        if (!productId) {
          return res.status(400).json({ message: "productId is required" });
        }
    
        const user = await User.findById(req.userId);
    
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        // Check if product already in wishlist
        // const existingItem = user.wishlist.find(
        //   (item) => item.product.toString() === productId,
        // );
    
        const exists = user.wishlist.includes(productId);
        if(exists) {
            return res.status(400).json({
                message: "Product already in wishlist"
            });
        }

        user.wishlist.push(productId);
        await user.save();
    
        res.status(200).json({
          message: "Product added to wishlist",
          wishlist: user.wishlist,
        });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }

}

const getWishlist = async (req, res) => {
     try {
        const user = await User.findById(req.userId).populate("wishlist");
    
        if (!user) {
          return res.status(404).json({
            message: "User not found",
          });
        }
    
        res.status(200).json({
          wishlist: user.wishlist,
        });
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
}

const removeWishlistItem = async (req, res) => {
    try {
        const { productId } = req.body;
    
        const user = await User.findById(req.userId);
    
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        // Remove wishlist item where product id matches
        user.wishlist = user.wishlist.filter(
          (item) => item.toString() !== productId,
        );
    
        await user.save();
    
        res.status(200).json({
          message: "Item removed from wishlist",
          wishlist: user.wishlist,
        });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

module.exports = {
  addToWishlist,
  getWishlist,
  removeWishlistItem,
};