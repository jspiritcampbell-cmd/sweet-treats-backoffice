import React, { useState, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Search, Users, Package, ShoppingCart, TrendingUp, Briefcase, Building2, Gift, Settings, Home, AlertCircle, ChevronRight, DollarSign, Calendar, Star, Filter, Download, Plus, Edit, Trash2, Eye, Bell, Menu, X } from 'lucide-react';

// Mock Data Imports (in a real app, these would be API calls)
const CUSTOMERS_DATA = [{"customer_id":"c001","first_name":"Emma","last_name":"Rodriguez","email":"emma.rodriguez@email.com","phone":"(555) 234-5678","date_of_birth":"1992-06-15","address_street":"123 Maple Street","address_city":"Springfield","address_state":"IL","address_zip":"62701","loyalty_points":850,"loyalty_tier":"Gold","total_orders":34,"total_spent":425.50,"favorite_flavors":["Mint Chocolate Chip","Salted Caramel"],"dietary_restrictions":[],"marketing_opt_in":true,"created_at":"2024-03-15T10:30:00Z","last_visit":"2026-02-08T14:22:00Z","notes":"Regular customer, loves our seasonal flavors","status":"VIP"},{"customer_id":"c002","first_name":"Marcus","last_name":"Chen","email":"marcus.chen@email.com","phone":"(555) 345-6789","date_of_birth":"1988-11-22","address_street":"456 Oak Avenue","address_city":"Springfield","address_state":"IL","address_zip":"62702","loyalty_points":320,"loyalty_tier":"Silver","total_orders":16,"total_spent":192.75,"favorite_flavors":["Cookie Dough","Vanilla Bean"],"dietary_restrictions":["Nut-Free"],"marketing_opt_in":true,"created_at":"2024-07-22T16:45:00Z","last_visit":"2026-02-05T11:30:00Z","notes":"Allergic to tree nuts","status":"Active"},{"customer_id":"c003","first_name":"Sofia","last_name":"Patel","email":"sofia.patel@email.com","phone":"(555) 456-7890","date_of_birth":"1995-04-08","address_street":"789 Pine Road","address_city":"Springfield","address_state":"IL","address_zip":"62703","loyalty_points":1250,"loyalty_tier":"Platinum","total_orders":52,"total_spent":678.25,"favorite_flavors":["Mango Sorbet","Pistachio"],"dietary_restrictions":["Vegan"],"marketing_opt_in":true,"created_at":"2023-12-01T09:15:00Z","last_visit":"2026-02-09T19:00:00Z","notes":"Always requests vegan options","status":"VIP"},{"customer_id":"c020","first_name":"Daniel","last_name":"Young","email":"daniel.young@email.com","phone":"(555) 123-4568","date_of_birth":"1990-08-09","address_street":"537 Fir Road","address_city":"Springfield","address_state":"IL","address_zip":"62720","loyalty_points":1420,"loyalty_tier":"Platinum","total_orders":58,"total_spent":745.25,"favorite_flavors":["Mint Oreo","Chocolate Chip"],"dietary_restrictions":[],"marketing_opt_in":true,"created_at":"2023-10-08T09:00:00Z","last_visit":"2026-02-10T10:15:00Z","notes":"Most loyal customer","status":"VIP"}];

const INVENTORY_DATA = [{"inventory_id":"inv001","item_name":"Vanilla Bean Ice Cream","category":"Ice Cream","sku":"IC-VAN-001","description":"Premium Madagascar vanilla bean ice cream","current_stock":45.5,"unit_of_measure":"Gallons","reorder_point":20,"reorder_quantity":40,"supplier_id":"sup001","cost_per_unit":12.50,"selling_price":4.99,"storage_location":"Freezer A-1","expiration_date":"2026-05-15","allergens":["Milk"],"flavor_profile":"Classic, creamy, sweet vanilla","popularity_score":95,"last_restocked":"2026-02-01T08:00:00Z","created_at":"2024-01-10T10:00:00Z","status":"In Stock"},{"inventory_id":"inv002","item_name":"Chocolate Fudge Ice Cream","category":"Ice Cream","sku":"IC-CHO-002","description":"Rich dark chocolate with fudge ribbons","current_stock":38.2,"unit_of_measure":"Gallons","reorder_point":20,"reorder_quantity":40,"supplier_id":"sup001","cost_per_unit":13.25,"selling_price":5.49,"storage_location":"Freezer A-2","expiration_date":"2026-05-18","allergens":["Milk","Soy"],"flavor_profile":"Deep chocolate, slightly bitter with sweet fudge","popularity_score":92,"last_restocked":"2026-02-03T08:00:00Z","created_at":"2024-01-10T10:00:00Z","status":"In Stock"},{"inventory_id":"inv005","item_name":"Cookie Dough Ice Cream","category":"Ice Cream","sku":"IC-COO-005","description":"Vanilla ice cream loaded with cookie dough chunks","current_stock":15.3,"unit_of_measure":"Gallons","reorder_point":18,"reorder_quantity":35,"supplier_id":"sup001","cost_per_unit":15.50,"selling_price":5.99,"storage_location":"Freezer B-1","expiration_date":"2026-05-25","allergens":["Milk","Wheat","Eggs","Soy"],"flavor_profile":"Sweet vanilla with buttery dough pieces","popularity_score":94,"last_restocked":"2026-02-08T08:00:00Z","created_at":"2024-01-10T10:00:00Z","status":"Low Stock"},{"inventory_id":"inv010","item_name":"Rocky Road Ice Cream","category":"Ice Cream","sku":"IC-ROC-010","description":"Chocolate ice cream with marshmallows and almonds","current_stock":9.2,"unit_of_measure":"Gallons","reorder_point":12,"reorder_quantity":25,"supplier_id":"sup001","cost_per_unit":14.75,"selling_price":5.99,"storage_location":"Freezer C-2","expiration_date":"2026-05-17","allergens":["Milk","Tree Nuts","Soy"],"flavor_profile":"Chocolate, marshmallow, nutty","popularity_score":87,"last_restocked":"2026-01-25T08:00:00Z","created_at":"2024-01-10T10:00:00Z","status":"Low Stock"}];

const ORDERS_DATA = [{"order_id":"ord001","customer_id":"c001","order_number":"ST-20260210-001","order_date":"2026-02-10T10:30:00Z","order_type":"In-Store","items":[{"inventory_id":"inv001","item_name":"Vanilla Bean Ice Cream","quantity":2,"unit_price":4.99,"customizations":{"size":"Medium","container":"Waffle Cone","toppings":["Rainbow Sprinkles","Hot Fudge"]},"subtotal":9.98}],"subtotal":9.98,"tax_amount":0.80,"discount_amount":0.00,"total_amount":10.78,"payment_method":"Credit Card","payment_status":"Paid","order_status":"Completed","special_instructions":"","served_by":"emp001","delivery_address":null,"estimated_completion":"2026-02-10T10:35:00Z","actual_completion":"2026-02-10T10:34:00Z","loyalty_points_earned":10,"created_at":"2026-02-10T10:30:00Z","updated_at":"2026-02-10T10:34:00Z"},{"order_id":"ord002","customer_id":"c003","order_number":"ST-20260210-002","order_date":"2026-02-10T11:15:00Z","order_type":"In-Store","items":[{"inventory_id":"inv007","item_name":"Mango Sorbet (Vegan)","quantity":1,"unit_price":5.99,"customizations":{"size":"Large","container":"Cup","toppings":[]},"subtotal":5.99}],"subtotal":5.99,"tax_amount":0.48,"discount_amount":0.60,"total_amount":5.87,"payment_method":"Mobile Payment","payment_status":"Paid","order_status":"Completed","special_instructions":"Extra napkins please","served_by":"emp002","delivery_address":null,"estimated_completion":"2026-02-10T11:20:00Z","actual_completion":"2026-02-10T11:18:00Z","loyalty_points_earned":12,"created_at":"2026-02-10T11:15:00Z","updated_at":"2026-02-10T11:18:00Z"}];

const EMPLOYEES_DATA = [{"employee_id":"emp001","first_name":"Courtnei","last_name":"Johnson","email":"courtnei@sweettreats.com","phone":"(555) 111-2222","role":"Manager","hire_date":"2024-01-01","hourly_rate":22.00,"status":"Active","schedule":{"Monday":"9:00 AM - 5:00 PM","Tuesday":"9:00 AM - 5:00 PM","Wednesday":"9:00 AM - 5:00 PM","Thursday":"9:00 AM - 5:00 PM","Friday":"9:00 AM - 5:00 PM","Saturday":"Off","Sunday":"Off"},"certifications":["Food Safety Manager","ServSafe Certified"],"performance_rating":5.0,"total_sales":45280.50,"created_at":"2024-01-01T09:00:00Z"},{"employee_id":"emp002","first_name":"Choyce","last_name":"Williams","email":"choyce@sweettreats.com","phone":"(555) 222-3333","role":"Manager","hire_date":"2024-01-01","hourly_rate":22.00,"status":"Active","schedule":{"Monday":"12:00 PM - 8:00 PM","Tuesday":"12:00 PM - 8:00 PM","Wednesday":"Off","Thursday":"12:00 PM - 8:00 PM","Friday":"12:00 PM - 8:00 PM","Saturday":"10:00 AM - 6:00 PM","Sunday":"Off"},"certifications":["Food Safety Manager","ServSafe Certified"],"performance_rating":5.0,"total_sales":42150.75,"created_at":"2024-01-01T09:00:00Z"},{"employee_id":"emp003","first_name":"Jamie","last_name":"Rodriguez","email":"jamie@sweettreats.com","phone":"(555) 333-4444","role":"Manager","hire_date":"2024-01-01","hourly_rate":22.00,"status":"Active","schedule":{"Monday":"Off","Tuesday":"Off","Wednesday":"10:00 AM - 6:00 PM","Thursday":"10:00 AM - 6:00 PM","Friday":"10:00 AM - 6:00 PM","Saturday":"10:00 AM - 6:00 PM","Sunday":"12:00 PM - 8:00 PM"},"certifications":["Food Safety Manager","ServSafe Certified"],"performance_rating":5.0,"total_sales":38925.25,"created_at":"2024-01-01T09:00:00Z"}];

// Main App Component
export default function SweetTreatsBackoffice() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'customers', name: 'Customers', icon: Users },
    { id: 'inventory', name: 'Inventory', icon: Package },
    { id: 'orders', name: 'Orders', icon: ShoppingCart },
    { id: 'employees', name: 'Employees', icon: Briefcase },
    { id: 'analytics', name: 'Analytics', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b-4 border-pink-300 sticky top-0 z-50 shadow-lg">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-pink-100 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg transform rotate-12">
                  <span className="text-2xl transform -rotate-12">🍦</span>
                </div>
                <div>
                  <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                    Sweet Treats
                  </h1>
                  <p className="text-xs text-gray-600 font-semibold tracking-wide">BACKOFFICE</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-80 bg-pink-50/50 border-2 border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                />
              </div>
              
              <button className="relative p-2 rounded-full hover:bg-pink-100 transition-colors">
                <Bell className="w-6 h-6 text-gray-700" />
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              
              <div className="flex items-center gap-3 pl-4 border-l-2 border-pink-200">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-gray-800">Admin User</p>
                  <p className="text-xs text-gray-500">Manager</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  A
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1920px] mx-auto">
        <div className="flex">
          {/* Sidebar */}
          <aside className={`${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:sticky top-20 left-0 w-72 h-[calc(100vh-5rem)] bg-white/60 backdrop-blur-md border-r-4 border-pink-200 p-6 transition-transform duration-300 ease-in-out z-40 shadow-xl`}>
            <nav className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all transform hover:scale-105 ${
                      isActive
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-pink-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                    {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                  </button>
                );
              })}
            </nav>

            <div className="mt-8 p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl border-2 border-pink-300">
              <div className="flex items-center gap-2 mb-2">
                <Gift className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-gray-800">Quick Tip</h3>
              </div>
              <p className="text-sm text-gray-600">
                Check inventory daily to avoid running out of popular flavors!
              </p>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {currentPage === 'dashboard' && <Dashboard />}
            {currentPage === 'customers' && <Customers data={CUSTOMERS_DATA} />}
            {currentPage === 'inventory' && <Inventory data={INVENTORY_DATA} />}
            {currentPage === 'orders' && <Orders data={ORDERS_DATA} />}
            {currentPage === 'employees' && <Employees data={EMPLOYEES_DATA} />}
            {currentPage === 'analytics' && <Analytics />}
          </main>
        </div>
      </div>
    </div>
  );
}

// Dashboard Component
function Dashboard() {
  const stats = [
    { label: 'Today\'s Sales', value: '$1,247', change: '+12%', icon: DollarSign, color: 'from-green-400 to-emerald-500' },
    { label: 'Total Customers', value: '50', change: '+3', icon: Users, color: 'from-blue-400 to-cyan-500' },
    { label: 'Orders Today', value: '28', change: '+8%', icon: ShoppingCart, color: 'from-purple-400 to-pink-500' },
    { label: 'Low Stock Items', value: '4', change: 'Alert', icon: AlertCircle, color: 'from-orange-400 to-red-500' },
  ];

  const salesData = [
    { name: 'Mon', sales: 420 },
    { name: 'Tue', sales: 580 },
    { name: 'Wed', sales: 650 },
    { name: 'Thu', sales: 720 },
    { name: 'Fri', sales: 890 },
    { name: 'Sat', sales: 1200 },
    { name: 'Sun', sales: 950 },
  ];

  const topFlavors = [
    { name: 'Cookie Dough', value: 28, color: '#F59E0B' },
    { name: 'Vanilla', value: 25, color: '#F0E68C' },
    { name: 'Chocolate', value: 22, color: '#8B4513' },
    { name: 'Mint Chip', value: 15, color: '#98D8C8' },
    { name: 'Others', value: 10, color: '#EC4899' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-gray-800 mb-1">Dashboard</h2>
          <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full hover:shadow-xl transition-all transform hover:scale-105">
          <Plus className="w-5 h-5 inline mr-2" />
          New Order
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-200 shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                  stat.change.includes('+') ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-gray-600 text-sm font-semibold mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-gray-800">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-200 shadow-lg">
          <h3 className="text-xl font-black text-gray-800 mb-4">Weekly Sales</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#FFB6C1" />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '2px solid #FFB6C1' }} />
              <Line type="monotone" dataKey="sales" stroke="#EC4899" strokeWidth={3} dot={{ fill: '#EC4899', r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Flavors */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-200 shadow-lg">
          <h3 className="text-xl font-black text-gray-800 mb-4">Top Flavors</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={topFlavors} cx="50%" cy="50%" outerRadius={90} fill="#8884d8" dataKey="value" label>
                {topFlavors.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {topFlavors.map((flavor, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: flavor.color }}></div>
                  <span className="text-sm font-semibold text-gray-700">{flavor.name}</span>
                </div>
                <span className="text-sm font-bold text-gray-800">{flavor.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-200 shadow-lg">
        <h3 className="text-xl font-black text-gray-800 mb-4">Recent Orders</h3>
        <div className="space-y-3">
          {ORDERS_DATA.slice(0, 5).map((order) => (
            <div key={order.order_id} className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                  {order.order_number.slice(-2)}
                </div>
                <div>
                  <p className="font-bold text-gray-800">{order.order_number}</p>
                  <p className="text-sm text-gray-600">{order.order_type} • {new Date(order.order_date).toLocaleTimeString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-gray-800">${order.total_amount.toFixed(2)}</p>
                <span className="text-xs font-semibold px-3 py-1 bg-green-100 text-green-700 rounded-full">
                  {order.order_status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Customers Component
function Customers({ data }) {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = useMemo(() => {
    return data.filter(customer => {
      const matchesFilter = filter === 'all' || customer.loyalty_tier.toLowerCase() === filter;
      const matchesSearch = customer.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           customer.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           customer.email.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [data, filter, searchTerm]);

  const tierColors = {
    'Bronze': 'from-orange-400 to-amber-600',
    'Silver': 'from-gray-400 to-gray-600',
    'Gold': 'from-yellow-400 to-yellow-600',
    'Platinum': 'from-purple-400 to-purple-600'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-800 mb-1">Customers</h2>
          <p className="text-gray-600">{data.length} total customers</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-white border-2 border-pink-300 text-gray-700 font-bold rounded-full hover:bg-pink-50 transition-all">
            <Download className="w-5 h-5 inline mr-2" />
            Export
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full hover:shadow-xl transition-all transform hover:scale-105">
            <Plus className="w-5 h-5 inline mr-2" />
            Add Customer
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-200 shadow-lg">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-pink-50/50 border-2 border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
          </div>
          <div className="flex gap-2">
            {['all', 'platinum', 'gold', 'silver', 'bronze'].map((tier) => (
              <button
                key={tier}
                onClick={() => setFilter(tier)}
                className={`px-6 py-3 font-bold rounded-full transition-all ${
                  filter === tier
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                    : 'bg-white border-2 border-pink-200 text-gray-700 hover:bg-pink-50'
                }`}
              >
                {tier.charAt(0).toUpperCase() + tier.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Customer List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCustomers.map((customer) => (
          <div key={customer.customer_id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-200 shadow-lg hover:shadow-2xl transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${tierColors[customer.loyalty_tier]} rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg`}>
                  {customer.first_name[0]}{customer.last_name[0]}
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-800">
                    {customer.first_name} {customer.last_name}
                  </h3>
                  <p className="text-sm text-gray-600">{customer.email}</p>
                  <p className="text-sm text-gray-600">{customer.phone}</p>
                </div>
              </div>
              <span className={`px-4 py-2 bg-gradient-to-r ${tierColors[customer.loyalty_tier]} text-white font-bold rounded-full text-sm shadow-lg`}>
                {customer.loyalty_tier}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                <p className="text-2xl font-black text-gray-800">{customer.total_orders}</p>
                <p className="text-xs text-gray-600 font-semibold">Orders</p>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                <p className="text-2xl font-black text-gray-800">${customer.total_spent}</p>
                <p className="text-xs text-gray-600 font-semibold">Spent</p>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
                <p className="text-2xl font-black text-gray-800">{customer.loyalty_points}</p>
                <p className="text-xs text-gray-600 font-semibold">Points</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full hover:shadow-lg transition-all">
                <Eye className="w-4 h-4 inline mr-2" />
                View
              </button>
              <button className="flex-1 px-4 py-2 bg-white border-2 border-pink-300 text-gray-700 font-bold rounded-full hover:bg-pink-50 transition-all">
                <Edit className="w-4 h-4 inline mr-2" />
                Edit
              </button>
            </div>

            {customer.notes && (
              <div className="mt-4 p-3 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
                <p className="text-sm text-gray-700">{customer.notes}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Inventory Component
function Inventory({ data }) {
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = ['all', ...new Set(data.map(item => item.category))];
  const lowStockItems = data.filter(item => item.status === 'Low Stock');

  const filteredInventory = categoryFilter === 'all' 
    ? data 
    : data.filter(item => item.category === categoryFilter);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-800 mb-1">Inventory</h2>
          <p className="text-gray-600">{data.length} items • {lowStockItems.length} low stock alerts</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full hover:shadow-xl transition-all transform hover:scale-105">
          <Plus className="w-5 h-5 inline mr-2" />
          Add Item
        </button>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div className="bg-gradient-to-r from-orange-100 to-red-100 border-2 border-orange-300 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle className="w-6 h-6 text-orange-600" />
            <h3 className="text-xl font-black text-gray-800">Low Stock Alert</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {lowStockItems.map((item) => (
              <div key={item.inventory_id} className="p-4 bg-white rounded-xl">
                <p className="font-bold text-gray-800">{item.item_name}</p>
                <p className="text-sm text-gray-600">Stock: {item.current_stock} {item.unit_of_measure}</p>
                <p className="text-xs text-red-600 font-semibold">Reorder: {item.reorder_point} {item.unit_of_measure}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setCategoryFilter(category)}
            className={`px-6 py-3 font-bold rounded-full whitespace-nowrap transition-all ${
              categoryFilter === category
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                : 'bg-white border-2 border-pink-200 text-gray-700 hover:bg-pink-50'
            }`}
          >
            {category === 'all' ? 'All Items' : category}
          </button>
        ))}
      </div>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInventory.map((item) => (
          <div key={item.inventory_id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-200 shadow-lg hover:shadow-2xl transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
                  {item.category}
                </span>
                <h3 className="text-lg font-black text-gray-800 mt-2">{item.item_name}</h3>
                <p className="text-sm text-gray-600">{item.sku}</p>
              </div>
              <span className={`px-3 py-1 ${
                item.status === 'Low Stock' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
              } text-xs font-bold rounded-full`}>
                {item.status}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-4">{item.description}</p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 bg-blue-50 rounded-xl">
                <p className="text-xs text-gray-600 font-semibold mb-1">Current Stock</p>
                <p className="text-xl font-black text-gray-800">{item.current_stock}</p>
                <p className="text-xs text-gray-500">{item.unit_of_measure}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <p className="text-xs text-gray-600 font-semibold mb-1">Price</p>
                <p className="text-xl font-black text-gray-800">${item.selling_price}</p>
                <p className="text-xs text-gray-500">per unit</p>
              </div>
            </div>

            {item.popularity_score && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-gray-600">Popularity</span>
                  <span className="text-xs font-bold text-gray-800">{item.popularity_score}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"
                    style={{ width: `${item.popularity_score}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full hover:shadow-lg transition-all text-sm">
                Update Stock
              </button>
              <button className="px-4 py-2 bg-white border-2 border-pink-300 text-gray-700 font-bold rounded-full hover:bg-pink-50 transition-all">
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Orders Component
function Orders({ data }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-gray-800 mb-1">Orders</h2>
          <p className="text-gray-600">{data.length} orders today</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full hover:shadow-xl transition-all transform hover:scale-105">
          <Plus className="w-5 h-5 inline mr-2" />
          New Order
        </button>
      </div>

      <div className="space-y-4">
        {data.map((order) => (
          <div key={order.order_id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-200 shadow-lg hover:shadow-2xl transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-black text-gray-800">{order.order_number}</h3>
                <p className="text-sm text-gray-600">
                  {new Date(order.order_date).toLocaleString()} • {order.order_type}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-gray-800">${order.total_amount.toFixed(2)}</p>
                <span className={`px-4 py-1 ${
                  order.order_status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                } text-sm font-bold rounded-full`}>
                  {order.order_status}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">{item.item_name}</p>
                    <p className="text-sm text-gray-600">
                      {item.customizations.size} • {item.customizations.container}
                      {item.customizations.toppings && item.customizations.toppings.length > 0 && 
                        ` • ${item.customizations.toppings.join(', ')}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">Qty: {item.quantity}</p>
                    <p className="text-sm text-gray-600">${item.subtotal.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {order.special_instructions && (
              <div className="mt-4 p-3 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
                <p className="text-sm font-semibold text-gray-700">
                  📝 {order.special_instructions}
                </p>
              </div>
            )}

            <div className="mt-4 flex gap-2">
              <button className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full hover:shadow-lg transition-all">
                View Details
              </button>
              <button className="px-4 py-2 bg-white border-2 border-pink-300 text-gray-700 font-bold rounded-full hover:bg-pink-50 transition-all">
                Print Receipt
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Employees Component
function Employees({ data }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-gray-800 mb-1">Team Members</h2>
          <p className="text-gray-600">{data.length} active employees</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full hover:shadow-xl transition-all transform hover:scale-105">
          <Plus className="w-5 h-5 inline mr-2" />
          Add Employee
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {data.map((employee) => (
          <div key={employee.employee_id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-200 shadow-lg hover:shadow-2xl transition-all">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg">
                {employee.first_name[0]}{employee.last_name[0]}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-black text-gray-800">
                  {employee.first_name} {employee.last_name}
                </h3>
                <p className="text-sm text-gray-600">{employee.email}</p>
                <p className="text-sm text-gray-600">{employee.phone}</p>
                <span className="inline-block mt-2 px-4 py-1 bg-gradient-to-r from-blue-400 to-purple-400 text-white text-sm font-bold rounded-full">
                  {employee.role}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="text-lg font-black text-gray-800">{employee.performance_rating}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-3 bg-green-50 rounded-xl">
                <p className="text-xs text-gray-600 font-semibold mb-1">Total Sales</p>
                <p className="text-xl font-black text-gray-800">${employee.total_sales.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <p className="text-xs text-gray-600 font-semibold mb-1">Hourly Rate</p>
                <p className="text-xl font-black text-gray-800">${employee.hourly_rate}/hr</p>
              </div>
            </div>

            {employee.certifications && employee.certifications.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-600 mb-2">Certifications</p>
                <div className="flex flex-wrap gap-2">
                  {employee.certifications.map((cert, index) => (
                    <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
                      ✓ {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full hover:shadow-lg transition-all">
                <Calendar className="w-4 h-4 inline mr-2" />
                Schedule
              </button>
              <button className="px-4 py-2 bg-white border-2 border-pink-300 text-gray-700 font-bold rounded-full hover:bg-pink-50 transition-all">
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Analytics Component
function Analytics() {
  const monthlyRevenue = [
    { month: 'Jan', revenue: 8420 },
    { month: 'Feb', revenue: 9150 },
    { month: 'Mar', revenue: 12300 },
    { month: 'Apr', revenue: 15800 },
    { month: 'May', revenue: 18900 },
    { month: 'Jun', revenue: 22400 },
  ];

  const categoryData = [
    { name: 'Ice Cream', value: 60, color: '#F59E0B' },
    { name: 'Toppings', value: 20, color: '#EC4899' },
    { name: 'Cones', value: 15, color: '#8B5CF6' },
    { name: 'Other', value: 5, color: '#10B981' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-black text-gray-800 mb-1">Analytics</h2>
        <p className="text-gray-600">Business performance insights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-200 shadow-lg">
          <h3 className="text-xl font-black text-gray-800 mb-4">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#FFB6C1" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '2px solid #FFB6C1' }} />
              <Bar dataKey="revenue" fill="url(#colorGradient)" radius={[10, 10, 0, 0]} />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EC4899" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-200 shadow-lg">
          <h3 className="text-xl font-black text-gray-800 mb-4">Revenue by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label>
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl p-6 text-white shadow-lg">
          <DollarSign className="w-10 h-10 mb-3" />
          <p className="text-white/80 text-sm font-semibold mb-1">Average Order Value</p>
          <p className="text-4xl font-black">$12.47</p>
          <p className="text-white/90 text-sm mt-2">+8% from last month</p>
        </div>

        <div className="bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl p-6 text-white shadow-lg">
          <Users className="w-10 h-10 mb-3" />
          <p className="text-white/80 text-sm font-semibold mb-1">Customer Retention</p>
          <p className="text-4xl font-black">87%</p>
          <p className="text-white/90 text-sm mt-2">+3% from last month</p>
        </div>

        <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
          <TrendingUp className="w-10 h-10 mb-3" />
          <p className="text-white/80 text-sm font-semibold mb-1">Growth Rate</p>
          <p className="text-4xl font-black">+23%</p>
          <p className="text-white/90 text-sm mt-2">Year over year</p>
        </div>
      </div>
    </div>
  );
}
