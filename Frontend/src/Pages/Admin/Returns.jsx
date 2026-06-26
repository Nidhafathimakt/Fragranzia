import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminService from "../../services/admin-api-service/AdminService";

function Returns() {
  const { getAllReturns, updateReturnStatus } = AdminService();
  const [returns, setReturns] = useState([]);
  const [remarks, setRemarks] = useState({});

  const load = async () => {
    try {
      const res = await getAllReturns();
      if (res.success) setReturns(res.returns);
    } catch {
      toast.error("Failed to load returns");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAction = async (orderId, returnStatus) => {
    try {
      await updateReturnStatus(orderId, {
        returnStatus,
        adminRemarks: remarks[orderId] || "",
      });
      toast.success(`Return ${returnStatus.toLowerCase()}`);
      load();
    } catch {
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div className="px-4 sm:px-6 py-6">
      <h2 className="text-2xl font-semibold mb-6">Return Requests</h2>

      {returns.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No return requests</p>
      ) : (
        returns.map((order) => (
          <div key={order._id} className="border rounded-lg p-4 mb-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
              <div>
                <p className="font-medium">{order.user?.name} — {order.user?.email}</p>
                <p className="text-sm text-gray-500">Order: {order._id}</p>
                <p className="text-sm">
                  Reason: <strong>{order.returnReason}</strong>
                </p>
                {order.returnComments && (
                  <p className="text-sm text-gray-600 mt-1">{order.returnComments}</p>
                )}
                <span
                  className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
                    order.returnStatus === "Approved"
                      ? "bg-green-100 text-green-700"
                      : order.returnStatus === "Rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.returnStatus}
                </span>
              </div>
            </div>

            {order.returnStatus === "Requested" && (
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Admin remarks (optional)"
                  className="border rounded px-3 py-2 flex-1 text-sm"
                  value={remarks[order._id] || ""}
                  onChange={(e) =>
                    setRemarks({ ...remarks, [order._id]: e.target.value })
                  }
                />
                <button
                  onClick={() => handleAction(order._id, "Approved")}
                  className="px-4 py-2 bg-green-600 text-white rounded text-sm"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleAction(order._id, "Rejected")}
                  className="px-4 py-2 bg-red-600 text-white rounded text-sm"
                >
                  Reject
                </button>
              </div>
            )}

            {order.returnStatus === "Approved" && (
              <button
                onClick={() => handleAction(order._id, "Completed")}
                className="mt-3 px-4 py-2 bg-[#00354B] text-white rounded text-sm"
              >
                Mark Completed
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Returns;
