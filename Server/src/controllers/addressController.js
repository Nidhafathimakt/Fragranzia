const Address = require("../models/address");

const getAddress = async (req, res) => {
  try {
    const addressInfo = await Address.find({
         user: req.userId,
    });
    res
      .status(200)
      .json({ message: "Address fetched successfully", addressInfo });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

const postAddress = async (req, res) => {
  try {
    // console.log("postProduct")
    const {
      fullName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
    } = req.body;
    
    
    console.log(req.body, "===req");
    const addressInfo = await Address.create({
      user: req.userId,
      fullName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
    });
    res.status(201).json({
      message: "Address added successfully",
      data: addressInfo,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
};


const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.json({ message: "Address deleted", address });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

const editAddress = async (req, res) => {
  try {
    const updated = await Address.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.json({
      message: "Address updated",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

module.exports = { getAddress, postAddress, deleteAddress, editAddress };
