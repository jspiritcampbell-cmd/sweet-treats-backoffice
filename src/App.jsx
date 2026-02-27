import React, { useState, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Search, Users, Package, ShoppingCart, TrendingUp, Briefcase, Home, AlertCircle, ChevronRight, DollarSign, Calendar, Star, Download, Plus, Edit, Trash2, Eye, Bell, Menu, X, Save, Calculator, RefreshCw } from 'lucide-react';

// Initial Mock Data
const INITIAL_CUSTOMERS = [{"customer_id":"c001","first_name":"Emma","last_name":"Rodriguez","email":"emma.rodriguez@email.com","phone":"(555) 234-5678","loyalty_points":850,"loyalty_tier":"Gold","total_orders":34,"total_spent":425.50,"status":"VIP"},{"customer_id":"c002","first_name":"Marcus","last_name":"Chen","email":"marcus.chen@email.com","phone":"(555) 345-6789","loyalty_points":320,"loyalty_tier":"Silver","total_orders":16,"total_spent":192.75,"status":"Active"}];

const INITIAL_INVENTORY = [{"inventory_id":"inv001","item_name":"Vanilla Bean Ice Cream","category":"Ice Cream","sku":"IC-VAN-001","current_stock":45.5,"unit_of_measure":"Gallons","reorder_point":20,"cost_per_unit":12.50,"selling_price":4.99,"status":"In Stock"},{"inventory_id":"inv002","item_name":"Chocolate Fudge","category":"Ice Cream","sku":"IC-CHO-002","current_stock":38.2,"unit_of_measure":"Gallons","reorder_point":20,"cost_per_unit":13.25,"selling_price":5.49,"status":"In Stock"},{"inventory_id":"inv005","item_name":"Cookie Dough","category":"Ice Cream","sku":"IC-COO-005","current_stock":15.3,"unit_of_measure":"Gallons","reorder_point":18,"cost_per_unit":15.50,"selling_price":5.99,"status":"Low Stock"}];

const INITIAL_ORDERS = [{"order_id":"ord001","customer_id":"c001","order_number":"ST-001","order_date":new Date().toISOString(),"items":[{"item_name":"Vanilla Bean","quantity":2,"unit_price":4.99}],"total_amount":10.78,"status":"Completed"}];

// Main App Component
export default function SweetTreatsBackoffice() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // State management with React hooks
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [orders, setOrders] = useState(INITIAL_ORDERS);

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'customers', name: 'Customers', icon: Users },
    { id: 'inventory', name: 'Inventory', icon: Package },
    { id: 'orders', name: 'Orders', icon: ShoppingCart },
    { id: 'calculator', name: 'Calculator', icon: Calculator },
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
                  <p className="text-xs text-gray-600 font-semibold tracking-wide">BACKOFFICE INTERACTIVE</p>
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
          <aside className={`${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:sticky top-20 left-0 w-72 h-[calc(100vh-5rem)] bg-white/60 backdrop-blur-md border-r-4 border-pink-200 p-6 transition-transform duration-300 ease-in-out z-40 shadow-xl overflow-y-auto`}>
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
                <AlertCircle className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-gray-800">Interactive Mode</h3>
              </div>
              <p className="text-sm text-gray-600">
                Add, edit, and calculate in real-time! All changes are saved in your browser.
              </p>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {currentPage === 'dashboard' && <Dashboard customers={customers} inventory={inventory} orders={orders} />}
            {currentPage === 'customers' && <Customers customers={customers} setCustomers={setCustomers} />}
            {currentPage === 'inventory' && <Inventory inventory={inventory} setInventory={setInventory} />}
            {currentPage === 'orders' && <Orders orders={orders} setOrders={setOrders} customers={customers} inventory={inventory} />}
            {currentPage === 'calculator' && <Calculator inventory={inventory} />}
            {currentPage === 'analytics' && <Analytics customers={customers} inventory={inventory} orders={orders} />}
          </main>
        </div>
      </div>
    </div>
  );
}

// Dashboard Component
function Dashboard({ customers, inventory, orders }) {
  const totalSales = orders.reduce((sum, order) => sum + order.total_amount, 0);
  const lowStockCount = inventory.filter(item => item.status === 'Low Stock' || item.status === 'Out of Stock').length;
  const totalInventoryValue = inventory.reduce((sum, item) => sum + (item.current_stock * item.cost_per_unit), 0);
  const avgOrderValue = orders.length > 0 ? totalSales / orders.length : 0;

  // Customer tier distribution for pie chart
  const tierData = [
    { name: 'Bronze', value: customers.filter(c => c.loyalty_tier === 'Bronze').length, color: '#F59E0B' },
    { name: 'Silver', value: customers.filter(c => c.loyalty_tier === 'Silver').length, color: '#9CA3AF' },
    { name: 'Gold', value: customers.filter(c => c.loyalty_tier === 'Gold').length, color: '#FBBF24' },
    { name: 'Platinum', value: customers.filter(c => c.loyalty_tier === 'Platinum').length, color: '#8B5CF6' },
  ].filter(tier => tier.value > 0);

  // Top spending customers
  const topCustomers = [...customers]
    .sort((a, b) => b.total_spent - a.total_spent)
    .slice(0, 5);

  // Inventory status for chart
  const inventoryStatusData = [
    { name: 'In Stock', value: inventory.filter(i => i.status === 'In Stock').length, color: '#10B981' },
    { name: 'Low Stock', value: inventory.filter(i => i.status === 'Low Stock').length, color: '#F59E0B' },
    { name: 'Out of Stock', value: inventory.filter(i => i.status === 'Out of Stock').length, color: '#EF4444' },
  ].filter(status => status.value > 0);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-gray-800 mb-1">Dashboard</h2>
          <p className="text-gray-600">Welcome back! Here's your live business overview.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Total Sales" 
          value={`$${totalSales.toFixed(2)}`} 
          change={orders.length > 0 ? `${orders.length} orders` : 'No orders yet'} 
          color="from-green-400 to-emerald-500" 
          icon={DollarSign} 
        />
        <StatCard 
          label="Total Customers" 
          value={customers.length} 
          change={customers.length > 0 ? `${customers.filter(c => c.status === 'VIP').length} VIP` : 'Add customers'} 
          color="from-blue-400 to-cyan-500" 
          icon={Users} 
        />
        <StatCard 
          label="Avg Order Value" 
          value={`$${avgOrderValue.toFixed(2)}`} 
          change={orders.length > 0 ? `${orders.length} total` : 'No orders'} 
          color="from-purple-400 to-pink-500" 
          icon={ShoppingCart} 
        />
        <StatCard 
          label="Inventory Alerts" 
          value={lowStockCount} 
          change={lowStockCount > 0 ? 'Restock needed' : 'All good'} 
          color={lowStockCount > 0 ? 'from-orange-400 to-red-500' : 'from-green-400 to-emerald-500'} 
          icon={AlertCircle} 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Distribution */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-200 shadow-lg">
          <h3 className="text-xl font-black text-gray-800 mb-4">Customer Loyalty Tiers</h3>
          {tierData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={tierData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
                    {tierData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {tierData.map((tier, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tier.color }}></div>
                    <span className="text-sm font-semibold text-gray-700">{tier.name}: {tier.value}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No customers yet. Add customers to see distribution!</p>
            </div>
          )}
        </div>

        {/* Inventory Status */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-200 shadow-lg">
          <h3 className="text-xl font-black text-gray-800 mb-4">Inventory Status</h3>
          {inventoryStatusData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={inventoryStatusData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
                    {inventoryStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {inventoryStatusData.map((status, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }}></div>
                      <span className="text-sm font-semibold text-gray-700">{status.name}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-800">{status.value} items</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No inventory yet. Add items to track stock!</p>
            </div>
          )}
        </div>
      </div>

      {/* Top Customers */}
      {topCustomers.length > 0 && (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-200 shadow-lg">
          <h3 className="text-xl font-black text-gray-800 mb-4">Top Customers</h3>
          <div className="space-y-3">
            {topCustomers.map((customer, index) => (
              <div key={customer.customer_id} className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white font-black">
                    #{index + 1}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{customer.first_name} {customer.last_name}</p>
                    <p className="text-sm text-gray-600">{customer.loyalty_tier} • {customer.total_orders} orders</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-gray-800">${customer.total_spent.toFixed(2)}</p>
                  <p className="text-xs text-gray-600">{customer.loyalty_points} points</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Orders */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-200 shadow-lg">
        <h3 className="text-xl font-black text-gray-800 mb-4">Recent Orders ({orders.length})</h3>
        {orders.length > 0 ? (
          <div className="space-y-3">
            {orders.slice(0, 5).map((order) => {
              const customer = customers.find(c => c.customer_id === order.customer_id);
              return (
                <div key={order.order_id} className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl hover:shadow-md transition-all">
                  <div>
                    <p className="font-bold text-gray-800">{order.order_number}</p>
                    <p className="text-sm text-gray-600">{new Date(order.order_date).toLocaleString()}</p>
                    {customer && <p className="text-xs text-gray-500">{customer.first_name} {customer.last_name}</p>}
                  </div>
                  <div className="text-right">
                    <p className="font-black text-gray-800">${order.total_amount.toFixed(2)}</p>
                    <span className="text-xs font-semibold px-3 py-1 bg-green-100 text-green-700 rounded-full">
                      {order.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="mb-2">No orders yet</p>
            <p className="text-sm">Create your first order in the Orders section!</p>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-6">
          <h4 className="text-sm font-bold text-gray-600 mb-2">Total Inventory Value</h4>
          <p className="text-3xl font-black text-gray-800">${totalInventoryValue.toFixed(2)}</p>
          <p className="text-xs text-gray-600 mt-1">{inventory.length} items in stock</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6">
          <h4 className="text-sm font-bold text-gray-600 mb-2">Loyalty Points Issued</h4>
          <p className="text-3xl font-black text-gray-800">
            {customers.reduce((sum, c) => sum + c.loyalty_points, 0).toLocaleString()}
          </p>
          <p className="text-xs text-gray-600 mt-1">Across {customers.length} customers</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
          <h4 className="text-sm font-bold text-gray-600 mb-2">Active Products</h4>
          <p className="text-3xl font-black text-gray-800">
            {inventory.filter(i => i.status === 'In Stock').length}
          </p>
          <p className="text-xs text-gray-600 mt-1">Ready to sell</p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, change, color, icon: Icon }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-200 shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <span className={`text-sm font-bold px-3 py-1 rounded-full ${
          change.includes('+') ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
        }`}>
          {change}
        </span>
      </div>
      <p className="text-gray-600 text-sm font-semibold mb-1">{label}</p>
      <p className="text-3xl font-black text-gray-800">{value}</p>
    </div>
  );
}

// Interactive Customers Component
function Customers({ customers, setCustomers }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '', last_name: '', email: '', phone: '', loyalty_points: 0, loyalty_tier: 'Bronze', total_orders: 0, total_spent: 0, status: 'Active'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setCustomers(customers.map(c => c.customer_id === editingId ? { ...formData, customer_id: editingId } : c));
    } else {
      const newCustomer = { ...formData, customer_id: `c${Date.now()}` };
      setCustomers([...customers, newCustomer]);
    }
    setShowForm(false);
    setEditingId(null);
    setFormData({ first_name: '', last_name: '', email: '', phone: '', loyalty_points: 0, loyalty_tier: 'Bronze', total_orders: 0, total_spent: 0, status: 'Active' });
  };

  const handleEdit = (customer) => {
    setFormData(customer);
    setEditingId(customer.customer_id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(c => c.customer_id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-gray-800 mb-1">Customers</h2>
          <p className="text-gray-600">{customers.length} total customers</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full hover:shadow-xl transition-all transform hover:scale-105">
          <Plus className="w-5 h-5 inline mr-2" />
          {showForm ? 'Cancel' : 'Add Customer'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-200 shadow-lg">
          <h3 className="text-xl font-black text-gray-800 mb-4">{editingId ? 'Edit Customer' : 'Add New Customer'}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="First Name" value={formData.first_name} onChange={(e) => setFormData({...formData, first_name: e.target.value})} required className="px-4 py-3 bg-pink-50 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400" />
            <input type="text" placeholder="Last Name" value={formData.last_name} onChange={(e) => setFormData({...formData, last_name: e.target.value})} required className="px-4 py-3 bg-pink-50 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400" />
            <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required className="px-4 py-3 bg-pink-50 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400" />
            <input type="tel" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="px-4 py-3 bg-pink-50 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400" />
            <input type="number" placeholder="Loyalty Points" value={formData.loyalty_points} onChange={(e) => setFormData({...formData, loyalty_points: parseInt(e.target.value) || 0})} className="px-4 py-3 bg-pink-50 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400" />
            <select value={formData.loyalty_tier} onChange={(e) => setFormData({...formData, loyalty_tier: e.target.value})} className="px-4 py-3 bg-pink-50 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400">
              <option>Bronze</option><option>Silver</option><option>Gold</option><option>Platinum</option>
            </select>
            <input type="number" step="0.01" placeholder="Total Spent" value={formData.total_spent} onChange={(e) => setFormData({...formData, total_spent: parseFloat(e.target.value) || 0})} className="px-4 py-3 bg-pink-50 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400" />
            <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="px-4 py-3 bg-pink-50 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400">
              <option>Active</option><option>VIP</option><option>Inactive</option>
            </select>
            <button type="submit" className="md:col-span-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full hover:shadow-xl transition-all">
              <Save className="w-5 h-5 inline mr-2" />
              {editingId ? 'Update Customer' : 'Add Customer'}
            </button>
          </form>
        </div>
      )}

      {/* Customer List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {customers.map((customer) => (
          <div key={customer.customer_id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-200 shadow-lg hover:shadow-2xl transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-black text-gray-800">{customer.first_name} {customer.last_name}</h3>
                <p className="text-sm text-gray-600">{customer.email}</p>
                <p className="text-sm text-gray-600">{customer.phone}</p>
              </div>
              <span className="px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold rounded-full text-sm shadow-lg">
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
              <button onClick={() => handleEdit(customer)} className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-full hover:shadow-lg transition-all">
                <Edit className="w-4 h-4 inline mr-2" />Edit
              </button>
              <button onClick={() => handleDelete(customer.customer_id)} className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-full hover:shadow-lg transition-all">
                <Trash2 className="w-4 h-4 inline mr-2" />Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Interactive Inventory Component
function Inventory({ inventory, setInventory }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    item_name: '', category: 'Ice Cream', sku: '', current_stock: 0, unit_of_measure: 'Gallons', reorder_point: 0, cost_per_unit: 0, selling_price: 0, status: 'In Stock'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setInventory(inventory.map(i => i.inventory_id === editingId ? { ...formData, inventory_id: editingId } : i));
    } else {
      const newItem = { ...formData, inventory_id: `inv${Date.now()}` };
      setInventory([...inventory, newItem]);
    }
    setShowForm(false);
    setEditingId(null);
    setFormData({ item_name: '', category: 'Ice Cream', sku: '', current_stock: 0, unit_of_measure: 'Gallons', reorder_point: 0, cost_per_unit: 0, selling_price: 0, status: 'In Stock' });
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item.inventory_id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setInventory(inventory.filter(i => i.inventory_id !== id));
    }
  };

  const handleStockUpdate = (id, amount) => {
    setInventory(inventory.map(item => {
      if (item.inventory_id === id) {
        const newStock = item.current_stock + amount;
        const newStatus = newStock <= item.reorder_point ? 'Low Stock' : newStock === 0 ? 'Out of Stock' : 'In Stock';
        return { ...item, current_stock: Math.max(0, newStock), status: newStatus };
      }
      return item;
    }));
  };

  const lowStockItems = inventory.filter(item => item.status === 'Low Stock' || item.status === 'Out of Stock');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-gray-800 mb-1">Inventory</h2>
          <p className="text-gray-600">{inventory.length} items • {lowStockItems.length} low stock alerts</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full hover:shadow-xl transition-all transform hover:scale-105">
          <Plus className="w-5 h-5 inline mr-2" />
          {showForm ? 'Cancel' : 'Add Item'}
        </button>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div className="bg-gradient-to-r from-orange-100 to-red-100 border-2 border-orange-300 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle className="w-6 h-6 text-orange-600" />
            <h3 className="text-xl font-black text-gray-800">Low Stock Alert - Restock Needed!</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {lowStockItems.map((item) => (
              <div key={item.inventory_id} className="p-4 bg-white rounded-xl">
                <p className="font-bold text-gray-800">{item.item_name}</p>
                <p className="text-sm text-gray-600">Stock: {item.current_stock} {item.unit_of_measure}</p>
                <p className="text-xs text-red-600 font-semibold">Reorder at: {item.reorder_point}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-200 shadow-lg">
          <h3 className="text-xl font-black text-gray-800 mb-4">{editingId ? 'Edit Item' : 'Add New Item'}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Item Name" value={formData.item_name} onChange={(e) => setFormData({...formData, item_name: e.target.value})} required className="px-4 py-3 bg-pink-50 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400" />
            <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="px-4 py-3 bg-pink-50 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400">
              <option>Ice Cream</option><option>Toppings</option><option>Cones/Cups</option><option>Syrups</option><option>Supplies</option>
            </select>
            <input type="text" placeholder="SKU" value={formData.sku} onChange={(e) => setFormData({...formData, sku: e.target.value})} required className="px-4 py-3 bg-pink-50 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400" />
            <input type="number" step="0.1" placeholder="Current Stock" value={formData.current_stock} onChange={(e) => setFormData({...formData, current_stock: parseFloat(e.target.value) || 0})} className="px-4 py-3 bg-pink-50 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400" />
            <select value={formData.unit_of_measure} onChange={(e) => setFormData({...formData, unit_of_measure: e.target.value})} className="px-4 py-3 bg-pink-50 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400">
              <option>Gallons</option><option>Pounds</option><option>Units</option><option>Ounces</option>
            </select>
            <input type="number" step="0.1" placeholder="Reorder Point" value={formData.reorder_point} onChange={(e) => setFormData({...formData, reorder_point: parseFloat(e.target.value) || 0})} className="px-4 py-3 bg-pink-50 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400" />
            <input type="number" step="0.01" placeholder="Cost Per Unit" value={formData.cost_per_unit} onChange={(e) => setFormData({...formData, cost_per_unit: parseFloat(e.target.value) || 0})} className="px-4 py-3 bg-pink-50 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400" />
            <input type="number" step="0.01" placeholder="Selling Price" value={formData.selling_price} onChange={(e) => setFormData({...formData, selling_price: parseFloat(e.target.value) || 0})} className="px-4 py-3 bg-pink-50 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400" />
            <button type="submit" className="md:col-span-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full hover:shadow-xl transition-all">
              <Save className="w-5 h-5 inline mr-2" />
              {editingId ? 'Update Item' : 'Add Item'}
            </button>
          </form>
        </div>
      )}

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inventory.map((item) => (
          <div key={item.inventory_id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-200 shadow-lg hover:shadow-2xl transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">{item.category}</span>
                <h3 className="text-lg font-black text-gray-800 mt-2">{item.item_name}</h3>
                <p className="text-sm text-gray-600">{item.sku}</p>
              </div>
              <span className={`px-3 py-1 ${item.status === 'Low Stock' || item.status === 'Out of Stock' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'} text-xs font-bold rounded-full`}>
                {item.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 bg-blue-50 rounded-xl">
                <p className="text-xs text-gray-600 font-semibold mb-1">Stock</p>
                <p className="text-xl font-black text-gray-800">{item.current_stock}</p>
                <p className="text-xs text-gray-500">{item.unit_of_measure}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <p className="text-xs text-gray-600 font-semibold mb-1">Price</p>
                <p className="text-xl font-black text-gray-800">${item.selling_price}</p>
                <p className="text-xs text-gray-500">per unit</p>
              </div>
            </div>

            {/* Stock Adjustment */}
            <div className="mb-4 p-3 bg-gray-50 rounded-xl">
              <p className="text-xs font-semibold text-gray-600 mb-2">Quick Stock Adjustment</p>
              <div className="flex gap-2">
                <button onClick={() => handleStockUpdate(item.inventory_id, -5)} className="flex-1 px-3 py-2 bg-red-100 text-red-700 font-bold rounded-lg hover:bg-red-200 transition-all">-5</button>
                <button onClick={() => handleStockUpdate(item.inventory_id, -1)} className="flex-1 px-3 py-2 bg-red-100 text-red-700 font-bold rounded-lg hover:bg-red-200 transition-all">-1</button>
                <button onClick={() => handleStockUpdate(item.inventory_id, 1)} className="flex-1 px-3 py-2 bg-green-100 text-green-700 font-bold rounded-lg hover:bg-green-200 transition-all">+1</button>
                <button onClick={() => handleStockUpdate(item.inventory_id, 5)} className="flex-1 px-3 py-2 bg-green-100 text-green-700 font-bold rounded-lg hover:bg-green-200 transition-all">+5</button>
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => handleEdit(item)} className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-full hover:shadow-lg transition-all text-sm">
                <Edit className="w-4 h-4 inline mr-1" />Edit
              </button>
              <button onClick={() => handleDelete(item.inventory_id)} className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-full hover:shadow-lg transition-all text-sm">
                <Trash2 className="w-4 h-4 inline mr-1" />Delete
              </button>
            </div>

            <div className="mt-3 text-xs text-gray-600">
              <p>Cost: ${item.cost_per_unit} • Profit: ${(item.selling_price - item.cost_per_unit).toFixed(2)}</p>
              <p>Reorder at: {item.reorder_point} {item.unit_of_measure}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Interactive Orders Component
function Orders({ orders, setOrders, customers, inventory }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    customer_id: '', item_name: '', quantity: 1, unit_price: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const total = formData.quantity * formData.unit_price;
    const newOrder = {
      order_id: `ord${Date.now()}`,
      order_number: `ST-${orders.length + 1}`,
      order_date: new Date().toISOString(),
      customer_id: formData.customer_id,
      items: [{ item_name: formData.item_name, quantity: formData.quantity, unit_price: formData.unit_price }],
      total_amount: total,
      status: 'Completed'
    };
    setOrders([...orders, newOrder]);
    setShowForm(false);
    setFormData({ customer_id: '', item_name: '', quantity: 1, unit_price: 0 });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      setOrders(orders.filter(o => o.order_id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-gray-800 mb-1">Orders</h2>
          <p className="text-gray-600">{orders.length} total orders</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full hover:shadow-xl transition-all transform hover:scale-105">
          <Plus className="w-5 h-5 inline mr-2" />
          {showForm ? 'Cancel' : 'New Order'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-200 shadow-lg">
          <h3 className="text-xl font-black text-gray-800 mb-4">Create New Order</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select value={formData.customer_id} onChange={(e) => setFormData({...formData, customer_id: e.target.value})} required className="px-4 py-3 bg-pink-50 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400">
              <option value="">Select Customer</option>
              {customers.map(c => <option key={c.customer_id} value={c.customer_id}>{c.first_name} {c.last_name}</option>)}
            </select>
            <select value={formData.item_name} onChange={(e) => {
              const item = inventory.find(i => i.item_name === e.target.value);
              setFormData({...formData, item_name: e.target.value, unit_price: item?.selling_price || 0});
            }} required className="px-4 py-3 bg-pink-50 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400">
              <option value="">Select Item</option>
              {inventory.map(i => <option key={i.inventory_id} value={i.item_name}>{i.item_name} (${i.selling_price})</option>)}
            </select>
            <input type="number" min="1" placeholder="Quantity" value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value) || 1})} required className="px-4 py-3 bg-pink-50 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400" />
            <div className="px-4 py-3 bg-green-50 border-2 border-green-200 rounded-xl flex items-center justify-between">
              <span className="text-gray-600 font-semibold">Total:</span>
              <span className="text-2xl font-black text-gray-800">${(formData.quantity * formData.unit_price).toFixed(2)}</span>
            </div>
            <button type="submit" className="md:col-span-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full hover:shadow-xl transition-all">
              <Save className="w-5 h-5 inline mr-2" />
              Create Order
            </button>
          </form>
        </div>
      )}

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => {
          const customer = customers.find(c => c.customer_id === order.customer_id);
          return (
            <div key={order.order_id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-200 shadow-lg hover:shadow-2xl transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-black text-gray-800">{order.order_number}</h3>
                  <p className="text-sm text-gray-600">{new Date(order.order_date).toLocaleString()}</p>
                  {customer && <p className="text-sm text-gray-600">Customer: {customer.first_name} {customer.last_name}</p>}
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-gray-800">${order.total_amount.toFixed(2)}</p>
                  <span className="px-4 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full">{order.status}</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
                    <div>
                      <p className="font-bold text-gray-800">{item.item_name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity} × ${item.unit_price}</p>
                    </div>
                    <p className="font-bold text-gray-800">${(item.quantity * item.unit_price).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <button onClick={() => handleDelete(order.order_id)} className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-full hover:shadow-lg transition-all">
                <Trash2 className="w-4 h-4 inline mr-2" />
                Delete Order
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Calculator Component
function Calculator({ inventory }) {
  const [orderItems, setOrderItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [taxRate, setTaxRate] = useState(8.5);
  const [discount, setDiscount] = useState(0);

  const addItem = () => {
    const item = inventory.find(i => i.item_name === selectedItem);
    if (item) {
      setOrderItems([...orderItems, { ...item, quantity }]);
      setSelectedItem('');
      setQuantity(1);
    }
  };

  const removeItem = (index) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const subtotal = orderItems.reduce((sum, item) => sum + (item.selling_price * item.quantity), 0);
  const discountAmount = subtotal * (discount / 100);
  const subtotalAfterDiscount = subtotal - discountAmount;
  const taxAmount = subtotalAfterDiscount * (taxRate / 100);
  const total = subtotalAfterDiscount + taxAmount;
  const profit = orderItems.reduce((sum, item) => sum + ((item.selling_price - item.cost_per_unit) * item.quantity), 0) - discountAmount;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-black text-gray-800 mb-1">Order Calculator</h2>
        <p className="text-gray-600">Calculate order totals, taxes, and profit margins</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-200 shadow-lg">
          <h3 className="text-xl font-black text-gray-800 mb-4">Add Items to Order</h3>
          
          <div className="space-y-4 mb-6">
            <select value={selectedItem} onChange={(e) => setSelectedItem(e.target.value)} className="w-full px-4 py-3 bg-pink-50 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400">
              <option value="">Select Item</option>
              {inventory.map(item => (
                <option key={item.inventory_id} value={item.item_name}>
                  {item.item_name} - ${item.selling_price} (Stock: {item.current_stock})
                </option>
              ))}
            </select>

            <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} placeholder="Quantity" className="w-full px-4 py-3 bg-pink-50 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400" />

            <button onClick={addItem} disabled={!selectedItem} className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              <Plus className="w-5 h-5 inline mr-2" />
              Add to Order
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tax Rate (%)</label>
              <input type="number" step="0.1" value={taxRate} onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)} className="w-full px-4 py-3 bg-pink-50 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Discount (%)</label>
              <input type="number" step="0.1" value={discount} onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)} className="w-full px-4 py-3 bg-pink-50 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400" />
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Order Items */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-200 shadow-lg">
            <h3 className="text-xl font-black text-gray-800 mb-4">Order Items ({orderItems.length})</h3>
            {orderItems.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No items added yet</p>
            ) : (
              <div className="space-y-2">
                {orderItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
                    <div className="flex-1">
                      <p className="font-bold text-gray-800">{item.item_name}</p>
                      <p className="text-sm text-gray-600">{item.quantity} × ${item.selling_price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="font-black text-gray-800">${(item.quantity * item.selling_price).toFixed(2)}</p>
                      <button onClick={() => removeItem(index)} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Calculations */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-black text-gray-800 mb-4 flex items-center gap-2">
              <Calculator className="w-6 h-6" />
              Order Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-green-200">
                <span className="text-gray-700 font-semibold">Subtotal:</span>
                <span className="text-xl font-bold text-gray-800">${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between items-center py-2 border-b border-green-200">
                  <span className="text-gray-700 font-semibold">Discount ({discount}%):</span>
                  <span className="text-xl font-bold text-red-600">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-center py-2 border-b border-green-200">
                <span className="text-gray-700 font-semibold">Tax ({taxRate}%):</span>
                <span className="text-xl font-bold text-gray-800">${taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-3 bg-green-100 rounded-xl px-3">
                <span className="text-gray-800 font-black text-lg">TOTAL:</span>
                <span className="text-3xl font-black text-green-700">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-3 bg-blue-100 rounded-xl px-3">
                <span className="text-gray-800 font-black">Profit Margin:</span>
                <span className="text-2xl font-black text-blue-700">${profit.toFixed(2)}</span>
              </div>
            </div>

            <button onClick={() => setOrderItems([])} className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-full hover:shadow-xl transition-all">
              <RefreshCw className="w-5 h-5 inline mr-2" />
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Analytics Component
function Analytics({ customers, inventory, orders }) {
  const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);
  const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
  const totalCustomers = customers.length;
  const vipCustomers = customers.filter(c => c.status === 'VIP').length;

  const categoryData = {};
  inventory.forEach(item => {
    if (!categoryData[item.category]) {
      categoryData[item.category] = 0;
    }
    categoryData[item.category] += item.current_stock * item.cost_per_unit;
  });

  const pieData = Object.entries(categoryData).map(([name, value], index) => ({
    name,
    value,
    color: ['#F59E0B', '#EC4899', '#8B5CF6', '#10B981', '#3B82F6'][index % 5]
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-black text-gray-800 mb-1">Analytics</h2>
        <p className="text-gray-600">Business insights and performance metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl p-6 text-white shadow-lg">
          <DollarSign className="w-10 h-10 mb-3" />
          <p className="text-white/80 text-sm font-semibold mb-1">Total Revenue</p>
          <p className="text-4xl font-black">${totalRevenue.toFixed(2)}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl p-6 text-white shadow-lg">
          <ShoppingCart className="w-10 h-10 mb-3" />
          <p className="text-white/80 text-sm font-semibold mb-1">Avg Order Value</p>
          <p className="text-4xl font-black">${avgOrderValue.toFixed(2)}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
          <Users className="w-10 h-10 mb-3" />
          <p className="text-white/80 text-sm font-semibold mb-1">Total Customers</p>
          <p className="text-4xl font-black">{totalCustomers}</p>
        </div>

        <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-6 text-white shadow-lg">
          <Star className="w-10 h-10 mb-3" />
          <p className="text-white/80 text-sm font-semibold mb-1">VIP Customers</p>
          <p className="text-4xl font-black">{vipCustomers}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-200 shadow-lg">
          <h3 className="text-xl font-black text-gray-800 mb-4">Inventory Value by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-200 shadow-lg">
          <h3 className="text-xl font-black text-gray-800 mb-4">Customer Loyalty Distribution</h3>
          <div className="space-y-4">
            {['Bronze', 'Silver', 'Gold', 'Platinum'].map((tier) => {
              const count = customers.filter(c => c.loyalty_tier === tier).length;
              const percentage = totalCustomers > 0 ? (count / totalCustomers) * 100 : 0;
              return (
                <div key={tier}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-gray-700">{tier}</span>
                    <span className="text-sm font-semibold text-gray-600">{count} ({percentage.toFixed(0)}%)</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-pink-400 to-purple-500 rounded-full transition-all" style={{ width: `${percentage}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
