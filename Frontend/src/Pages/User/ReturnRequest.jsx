import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserService from "../../services/user-api-service/UserService";

const REASONS = [
  "Wrong Product",
  "Damaged Product",
  "Quality Issue",
  "Changed Mind",
  "Other",
];

function ReturnRequest() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state?.order;
  const { requestReturn } = UserService();

  const [form, setForm] = useState({
    returnReason: "",
    returnComments: "",
    returnImage: "",
  });

  if (!order) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">No order selected</p>
        <button
          onClick={() => navigate("/account/orders")}
          className="mt-4 text-[#00354B] underline"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.returnReason) {
      toast.error("Please select a reason");
      return;
    }
    try {
      const res = await requestReturn({
        orderId: order._id,
        ...form,
      });
      if (res.success) {
        toast.success("Return Request Submitted");
        navigate("/account/orders");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something Went Wrong");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 sm:p-6">
      <h2 className="text-xl font-semibold mb-4">Request Return</h2>
      <p className="text-sm text-gray-500 mb-4">Order ID: {order._id}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Reason for return *</label>
          <select
            required
            className="w-full border rounded-lg px-3 py-2"
            value={form.returnReason}
            onChange={(e) => setForm({ ...form, returnReason: e.target.value })}
          >
            <option value="">Select reason</option>
            {REASONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Additional comments</label>
          <textarea
            className="w-full border rounded-lg px-3 py-2"
            rows={4}
            value={form.returnComments}
            onChange={(e) => setForm({ ...form, returnComments: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Image URL (optional)
          </label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Paste image link"
            value={form.returnImage}
            onChange={(e) => setForm({ ...form, returnImage: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#00354B] text-white rounded-lg font-medium"
        >
          Submit Return Request
        </button>
      </form>
    </div>
  );
}

export default ReturnRequest;
