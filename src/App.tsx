import React, { useState } from 'react';
import { Plus, Receipt, TrendingUp, DollarSign, Calendar, Search, Filter } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Sample data for the chart
const expenseData = [
  { month: 'Jan', amount: 450, receipts: 12 },
  { month: 'Feb', amount: 380, receipts: 8 },
  { month: 'Mar', amount: 620, receipts: 15 },
  { month: 'Apr', amount: 520, receipts: 11 },
  { month: 'May', amount: 720, receipts: 18 },
  { month: 'Jun', amount: 590, receipts: 14 },
];

const recentReceipts = [
  { id: 1, store: 'Whole Foods', amount: 87.42, date: '2024-06-15', category: 'Groceries' },
  { id: 2, store: 'Shell Gas Station', amount: 45.20, date: '2024-06-14', category: 'Transportation' },
  { id: 3, store: 'Amazon', amount: 129.99, date: '2024-06-13', category: 'Shopping' },
  { id: 4, store: 'Starbucks', amount: 6.75, date: '2024-06-12', category: 'Food & Drink' },
];

const StatCard = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {trend && (
          <p className="text-sm text-green-600 flex items-center mt-1">
            <TrendingUp className="h-4 w-4 mr-1" />
            {trend}
          </p>
        )}
      </div>
      <Icon className="h-8 w-8 text-blue-500" />
    </div>
  </div>
);

const ReceiptRow = ({ receipt }) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
    <div className="flex items-center space-x-4">
      <div className="bg-blue-100 rounded-full p-2">
        <Receipt className="h-4 w-4 text-blue-600" />
      </div>
      <div>
        <p className="font-medium text-gray-900">{receipt.store}</p>
        <p className="text-sm text-gray-500">{receipt.category}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="font-semibold text-gray-900">${receipt.amount}</p>
      <p className="text-sm text-gray-500">{receipt.date}</p>
    </div>
  </div>
);

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const totalAmount = expenseData.reduce((sum, item) => sum + item.amount, 0);
  const totalReceipts = expenseData.reduce((sum, item) => sum + item.receipts, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 rounded-lg p-2">
                <Receipt className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Receipt Tracker</h1>
                <p className="text-sm text-gray-500">Manage your expenses effortlessly</p>
              </div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
              <Plus className="h-4 w-4" />
              <span>Add Receipt</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Alert */}
        <Alert className="mb-8 bg-blue-50 border-blue-200">
          <TrendingUp className="h-4 w-4" />
          <AlertDescription className="text-blue-800">
            Welcome back! You've saved 23% more receipts this month compared to last month.
          </AlertDescription>
        </Alert>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Expenses"
            value={`$${totalAmount.toLocaleString()}`}
            icon={DollarSign}
            trend="+12% vs last month"
          />
          <StatCard
            title="Total Receipts"
            value={totalReceipts}
            icon={Receipt}
            trend="+5 this week"
          />
          <StatCard
            title="Average per Receipt"
            value={`$${(totalAmount / totalReceipts).toFixed(2)}`}
            icon={TrendingUp}
          />
          <StatCard
            title="This Month"
            value="18 receipts"
            icon={Calendar}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Area Chart */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Expenses</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={expenseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#2563eb"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Receipt Count Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={expenseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [value, 'Receipts']} />
                <Line
                  type="monotone"
                  dataKey="receipts"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Receipts Section */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Receipts</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>
            
            {/* Search and Filter */}
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search receipts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            {recentReceipts.map((receipt) => (
              <ReceiptRow key={receipt.id} receipt={receipt} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
