import { useState } from "react";
import { CreditCard, TrendingUp, Download, ArrowUpRight, Calendar, Search } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const revenueData = [
  { month: "Jan", revenue: 2400000 },
  { month: "Feb", revenue: 3100000 },
  { month: "Mar", revenue: 4200000 },
  { month: "Apr", revenue: 5800000 },
  { month: "May", revenue: 7200000 },
  { month: "Jun", revenue: 9100000 },
  { month: "Jul", revenue: 10800000 },
  { month: "Aug", revenue: 12400000 },
];

const subscriptionPlans = [
  { name: "Basic Agent", price: "₦5,000/month", subscribers: 2340, revenue: "₦11.7M" },
  { name: "Pro Agent", price: "₦15,000/month", subscribers: 856, revenue: "₦12.8M" },
  { name: "Premium Seller", price: "₦10,000/month", subscribers: 1200, revenue: "₦12M" },
  { name: "Featured Listing", price: "₦2,000/listing", subscribers: 4500, revenue: "₦9M" },
];

const recentTransactions = [
  { id: "TXN-001", user: "Adebayo Johnson", type: "Subscription", plan: "Pro Agent", amount: "₦15,000", status: "completed", date: "Today, 2:30 PM" },
  { id: "TXN-002", user: "Chioma Okafor", type: "Featured Listing", plan: "30-day boost", amount: "₦5,000", status: "completed", date: "Today, 1:15 PM" },
  { id: "TXN-003", user: "Emeka Store", type: "Subscription", plan: "Premium Seller", amount: "₦10,000", status: "pending", date: "Today, 12:00 PM" },
  { id: "TXN-004", user: "Ibrahim Musa", type: "Subscription", plan: "Basic Agent", amount: "₦5,000", status: "failed", date: "Today, 10:45 AM" },
  { id: "TXN-005", user: "Grace Adeola", type: "Featured Listing", plan: "7-day boost", amount: "₦2,000", status: "completed", date: "Yesterday, 4:30 PM" },
];

const AdminPayments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <span className="badge badge-success text-white">Completed</span>;
      case "pending":
        return <span className="badge badge-warning text-white">Pending</span>;
      case "failed":
        return <span className="badge badge-error text-white">Failed</span>;
      default:
        return <span className="badge badge-outline">{status}</span>;
    }
  };

  const filteredTransactions = recentTransactions.filter((txn) => {
    const matchesSearch =
      txn.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || txn.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Payments & Revenue</h1>
          <p className="text-sm text-gray-500">Track platform revenue, subscriptions, and transactions.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline border border-gray-300 btn-sm flex items-center gap-2">
            <Calendar className="h-4 w-4" /> This Month
          </button>
          <button className="btn btn-outline border border-gray-300 btn-sm flex items-center gap-2">
            <Download className="h-4 w-4" /> Export
          </button>
        </div>
      </div>

      {/* Revenue Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="card bg-base-100 shadow-md p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold">₦12.4M</p>
            </div>
            <div className="rounded-full bg-green-100 p-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-xs">
            <ArrowUpRight className="h-3 w-3 text-green-500" />
            <span className="text-green-500">+22.8%</span>
            <span className="text-gray-500">vs last month</span>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Active Subscriptions</p>
              <p className="text-2xl font-bold">4,396</p>
            </div>
            <div className="rounded-full bg-primary/10 p-2">
              <CreditCard className="h-4 w-4 text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-xs">
            <ArrowUpRight className="h-3 w-3 text-green-500" />
            <span className="text-green-500">+156</span>
            <span className="text-gray-500">this month</span>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md p-5">
          <p className="text-xs text-gray-500">Featured Listings Revenue</p>
          <p className="text-2xl font-bold">₦9M</p>
          <p className="text-xs text-gray-500 mt-2">4,500 listings boosted</p>
        </div>

        <div className="card bg-base-100 shadow-md p-5">
          <p className="text-xs text-gray-500">Avg. Transaction Value</p>
          <p className="text-2xl font-bold">₦8,450</p>
          <p className="text-xs text-gray-500 mt-2">Across all payment types</p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="card bg-base-100 shadow-md p-4">
        <h2 className="font-semibold text-base mb-1">Revenue Overview</h2>
        <p className="text-gray-500 text-sm mb-4">Monthly revenue growth over time</p>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#153351" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#153351" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(value) => `₦${(value / 1000000).toFixed(0)}M`} />
              <Tooltip formatter={(value) => `₦${(value / 1000000).toFixed(1)}M`} />
              <Area type="monotone" dataKey="revenue" stroke="#153351" fill="url(#colorRevenue)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Subscription Plans */}
        <div className="card bg-base-100 shadow-md p-4 lg:col-span-1">
          <h3 className="font-semibold mb-2">Subscription Plans</h3>
          <p className="text-gray-500 text-sm mb-4">Revenue breakdown by plan</p>
          <div className="space-y-2">
            {subscriptionPlans.map((plan, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-gray-100">
                <div>
                  <p className="text-sm font-medium">{plan.name}</p>
                  <p className="text-xs text-gray-500">{plan.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{plan.revenue}</p>
                  <p className="text-xs text-gray-500">{plan.subscribers.toLocaleString()} active</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="card bg-base-100 shadow-md p-4 lg:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <div>
              <h3 className="font-semibold text-base">Recent Transactions</h3>
              <p className="text-gray-500 text-sm">Latest payment activity</p>
            </div>
            <div className="flex gap-2 mt-2 sm:mt-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input input-bordered pl-9 w-44 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>
              <select
                className="select select-bordered w-32 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Transaction</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((txn) => (
                  <tr key={txn.id}>
                    <td>
                      <p className="font-medium">{txn.user}</p>
                      <p className="text-xs text-gray-500">{txn.id}</p>
                    </td>
                    <td>
                      <p>{txn.type}</p>
                      <p className="text-xs text-gray-500">{txn.plan}</p>
                    </td>
                    <td className="font-medium">{txn.amount}</td>
                    <td>{getStatusBadge(txn.status)}</td>
                    <td className="text-xs text-gray-500">{txn.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPayments;
