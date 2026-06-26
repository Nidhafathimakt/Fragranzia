const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", 
        required: true 
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        //   required: true,
        },
        name: String,
        quantity: { type: Number, 
            // required: true 
        },
        price: { type: Number, 
            // required: true 
        },
      },
    ],

    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    //   required: true,
    },
   shippingAddress: {
  fullName: String,
  phone: String,
  addressLine1: String,
  addressLine2: String,
  city: String,
  state: String,
  postalCode: String,
  country: String,
},
    paymentMethod: { type: String, 
        // required: true 
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    paidAt: { type: Date, default: null },
    totalPrice: { type: Number, 
        // required: true 
    },
    balanceTotal: { type: Number, 
        // required: true 
    },
    // Delivery Statuses
    deliveryStatus: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Shipped",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
        "Returned",
        "Failed Delivery",
      ],
      default: "Pending",
    },
    deliveredAt: { type: Date },

    // Razorpay & Shiprocket Fields
    razorpay_order_id: { type: String },
    shipment_id: { type: String }, // Shiprocket Shipment ID
    awb_code: { type: String }, // Tracking Number
    courier_name: { type: String }, // Courier Partner
    courier_status: { type: String }, // Status from Shiprocket

    // Return Section
    isReturned: { type: Boolean, default: false },
    returnReason: {
      type: String,
      enum: [
        "Wrong Product",
        "Damaged Product",
        "Quality Issue",
        "Changed Mind",
        "Other",
      ],
    },
    returnComments: { type: String, default: "" },
    returnImage: { type: String, default: "" },
    adminRemarks: { type: String, default: "" },
    returnStatus: {
      type: String,
      enum: ["Requested", "Approved", "Rejected", "Completed"],
    },
    returnedAt: { type: Date },
  },
  { timestamps: true },
);


module.exports = mongoose.model("Order", orderSchema);
