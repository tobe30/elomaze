import { 
  Users, 
  UserPlus, 
  Building2, 
  Clock, 
  Flag, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  FileText,
  UserCheck,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, ResponsiveContainer, Tooltip } from "recharts";

const stats = [
  { label: "Total Users", value: "24,582", change: "+12.5%", trend: "up", icon: Users, description: "18,420 Students • 4,162 Agents • 2,000 Sellers" },
  { label: "New Signups Today", value: "142", change: "+8.2%", trend: "up", icon: UserPlus, description: "vs 131 yesterday" },
  { label: "Active Listings", value: "8,456", change: "+5.4%", trend: "up", icon: Building2, description: "6,234 Properties • 2,222 Products" },
  { label: "Pending Approvals", value: "38", change: "-15%", trend: "down", icon: Clock, description: "12 agents • 26 listings" },
  { label: "Reported Items", value: "15", change: "+3", trend: "up", icon: Flag, description: "Requires immediate attention" },
  { label: "Total Revenue", value: "₦12.4M", change: "+22.8%", trend: "up", icon: TrendingUp, description: "This month" },
];

const userGrowthData = [
  { month: "Jan", users: 12000 }, { month: "Feb", users: 14500 },
  { month: "Mar", users: 16200 }, { month: "Apr", users: 17800 },
  { month: "May", users: 19500 }, { month: "Jun", users: 21200 },
  { month: "Jul", users: 22800 }, { month: "Aug", users: 24582 },
];

const listingsByLocation = [
  { location: "Lagos", listings: 3245 }, { location: "Abuja", listings: 1876 },
  { location: "Ibadan", listings: 1234 }, { location: "Port Harcourt", listings: 987 },
  { location: "Kano", listings: 654 }, { location: "Others", listings: 460 },
];

const pendingApprovals = [
  { id: 1, type: "agent", name: "Adebayo Johnson", email: "adebayo.j@email.com", submitted: "2 hours ago", avatar: null },
  { id: 2, type: "listing", name: "3 Bedroom Flat - Lekki", email: "₦2.5M/year", submitted: "4 hours ago", avatar: null },
  { id: 3, type: "agent", name: "Chioma Okafor", email: "chioma.o@email.com", submitted: "5 hours ago", avatar: null },
];

const recentReports = [
  { id: 1, type: "Fraudulent Listing", target: "Luxury Apartment - VI", reporter: "Anonymous", time: "30 mins ago", severity: "high" },
  { id: 2, type: "Spam Account", target: "user_fake123", reporter: "System Auto-detect", time: "1 hour ago", severity: "medium" },
  { id: 3, type: "Inappropriate Content", target: "Service Listing #4521", reporter: "John D.", time: "2 hours ago", severity: "low" },
];

const Dashboard = () => {
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-lg p-2 rounded text-xs border border-gray-200">
        {/* Show axis label (month or location) */}
        <p className="font-semibold text-gray-700 mb-1">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <span 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: entry.color }} 
            />
            <span className="truncate">{entry.name}</span>
            <span className="font-medium">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Welcome back! Here's what's happening on Elomaze today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
  {stats.map((stat) => {
    const Icon = stat.icon;
    return (
      <div key={stat.label} className="bg-white shadow-lg rounded-lg p-6 relative">
        <div className="flex justify-between items-center mb-3">
          <p className="text-sm font-medium text-gray-500">{stat.label}</p>
          <div className="rounded-md bg-primary/10 p-2">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
        <div className="text-2xl font-bold">{stat.value}</div>
        <div className="flex items-center gap-2 mt-2">
          {stat.trend === "up" ? (
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          )}
          <span className={`text-sm font-medium ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
            {stat.change}
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-2 truncate">{stat.description}</p>
      </div>
    );
  })}
</div>


      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* User Growth Chart */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-base font-medium mb-1">User Growth</h2>
          <p className="text-sm text-gray-500 mb-4">Monthly user registrations over time</p>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="users" stroke="#153351" strokeWidth={2} dot={{ r: 3, strokeWidth: 2, fill: "#153351" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Listings by Location */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-base font-medium mb-1">Listings by Location</h2>
          <p className="text-sm text-gray-500 mb-4">Distribution of active listings across cities</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={listingsByLocation} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} axisLine={false} />
              <YAxis type="category" dataKey="location" tick={{ fontSize: 11 }} axisLine={false} width={80} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="listings" fill="#153351" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-3">
  
        <div className="bg-white shadow rounded-lg p-4 space-y-2">
          <h2 className="text-base font-medium">Quick Actions</h2>
          <p className="text-sm text-gray-500">Common administrative tasks</p>
          <button className="w-full flex items-center justify-between p-2 border border-gray-200 rounded hover:bg-gray-50">
            <div className="flex items-center gap-2"><UserCheck className="h-4 w-4" /> Approve Pending Agents</div>
            <span className="bg-blue-500 text-white text-xs px-2 rounded">12</span>
          </button>
          <button className="w-full flex items-center justify-between p-2 border border-gray-200 rounded hover:bg-gray-50">
            <div className="flex items-center gap-2"><Eye className="h-4 w-4" /> Review Listings</div>
            <span className="bg-blue-500 text-white text-xs px-2 rounded">26</span>
          </button>
          <button className="w-full flex items-center justify-between p-2 border border-gray-200 rounded hover:bg-gray-50">
            <div className="flex items-center gap-2"><Flag className="h-4 w-4" /> View Reports</div>
            <span className="bg-red-500 text-white text-xs px-2 rounded">15</span>
          </button>
          <button className="w-full flex items-center p-2 border border-gray-200 rounded hover:bg-gray-50">
            <div className="flex items-center gap-2"><FileText className="h-4 w-4" /> Generate Reports</div>
          </button>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white shadow rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h2 className="text-base font-medium">Pending Approvals</h2>
              <p className="text-sm text-gray-500">Agents and listings awaiting review</p>
            </div>
            <button className="text-xs text-gray-500">View all</button>
          </div>
          {pendingApprovals.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                {item.type === "agent" ? item.name.split(" ").map(n => n[0]).join("") : "🏠"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.name}</p>
                <p className="text-xs text-gray-400">{item.email}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={`text-[10px] px-2 py-0.5 rounded ${item.type === "agent" ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-800"}`}>
                  {item.type}
                </span>
                <span className="text-[10px] text-gray-400">{item.submitted}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Reports */}
        <div className="bg-white shadow rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h2 className="text-base font-medium">Recent Reports</h2>
              <p className="text-sm text-gray-500">Items flagged by users</p>
            </div>
            <button className="text-xs text-gray-500">View all</button>
          </div>
          {recentReports.map((report) => (
            <div key={report.id} className="flex items-start gap-3">
              <div className={`rounded-full p-1.5 ${report.severity === "high" ? "bg-red-100" : report.severity === "medium" ? "bg-yellow-100" : "bg-gray-200"}`}>
                <Flag className={`h-3 w-3 ${report.severity === "high" ? "text-red-600" : report.severity === "medium" ? "text-yellow-500" : "text-gray-400"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{report.type}</p>
                <p className="text-xs text-gray-400 truncate">{report.target}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">by {report.reporter} • {report.time}</p>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded ${report.severity === "high" ? "bg-red-500 text-white" : "bg-blue-500 text-white"}`}>
                {report.severity}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>

          
      
  );
};

export default Dashboard;
