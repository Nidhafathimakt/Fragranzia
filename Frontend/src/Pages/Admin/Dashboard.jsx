import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import AdminService from "../../services/admin-api-service/AdminService";

const COLORS = ["#00354B", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];

function Dashboard() {
  const { getDashboardStats } = AdminService();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getDashboardStats();
        if (res.success) setStats(res);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-6 animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/3" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    );
  }

  const s = stats?.stats || {};
  const cards = [
    { label: "Total Revenue", value: `₹${(s.totalRevenue || 0).toLocaleString()}` },
    { label: "Total Orders", value: s.totalOrders || 0 },
    { label: "Total Products", value: s.totalProducts || 0 },
    { label: "Total Users", value: s.totalUsers || 0 },
    { label: "Pending Orders", value: s.pendingOrders || 0 },
    { label: "Delivered Orders", value: s.deliveredOrders || 0 },
    { label: "Return Requests", value: s.returnRequests || 0 },
    { label: "Total Sales", value: `₹${(s.totalSales || 0).toLocaleString()}` },
  ];

  return (
    <div className="px-4 sm:px-6 py-6">
      <h2 className="text-2xl font-semibold text-[#00354B] mb-6">Admin Dashboard</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 hover:shadow-md transition"
          >
            <p className="text-sm text-gray-500">{card.label}</p>
            <p className="text-xl font-bold text-[#00354B] mt-1">{card.value}</p>
          </div>
        ))}
      </div>

      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold mb-4">Monthly Sales & Revenue</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={stats?.monthlySales || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="revenue" fill="#00354B" name="Revenue" radius={[4, 4, 0, 0]} />
              <Bar dataKey="orders" fill="#10b981" name="Orders" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div> */}

        {/* <div className="bg-white border rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold mb-4">Orders Analytics</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={stats?.statusBreakdown || []}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {(stats?.statusBreakdown || []).map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div> */}

        {/* <div className="bg-white border rounded-xl p-4 shadow-sm lg:col-span-2">
          <h3 className="font-semibold mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={stats?.monthlySales || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#00354B" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div> */}
      {/* </div> */}
    </div>
  );
}

export default Dashboard;
