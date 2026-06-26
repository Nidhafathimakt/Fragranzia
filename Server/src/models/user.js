const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    // name: {
    //     type: String,
    //     required: true,
    // },
    name: {
        type: String, 
        required: [true, "Name is required"],
        trim: true,
        minlength: [3, "Name must be at least 3 characters long"],
        maxlength: [50, "Name cannot exceed 50 characters"],
    },
    lastName: {
        type: String, 
        // required: [true, "Name is required"],
        trim: true,
        minlength: [3, "Name must be at least 3 characters long"],
        maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
        type: String, 
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password:{
        type: String, 
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"], 
    },
    phone: {
        type: String,
        // required: [true, "Phone number is required"],
        match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
    },
    image: { 
        type: String 
    },
    role: {
        type: String,
        enum:["admin", "user"],
        default: "user",
    },
    // address: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Address",
    // },
    address: {
    type: String,
    // required: true,
    },
    status: {
        type: Boolean,
        // required: [true, "Status is required"],
        default: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    
    cart: [
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // <-- must match your Product model name
    //   required: true
    },
    quantity: {
      type: Number,
      default: 1
    },
  },
],
    cart_total: {
        type: Number,
        default: 0
    },
    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Product",
        },
    ],  
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
