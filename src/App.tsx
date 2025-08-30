import React, { useState, useEffect } from 'react';
import { Plus, Receipt, TrendingUp, DollarSign, Calendar, Search, Filter, Camera, Upload, Download, Settings, Bell, Archive, Tag, PieChart, BarChart3, CreditCard, MapPin, Clock, ChevronDown, X, Edit3, Trash2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart as RechartsPieChart, Cell, BarChart, Bar } from 'recharts';

// Expanded sample data
const expenseData = [
  { month: 'Jan', amount: 450, receipts: 12, budget: 600 },
  { month: 'Feb', amount: 380, receipts: 8, budget: 600 },
  { month: 'Mar', amount: 620, receipts: 15, budget: 600 },
  { month: 'Apr', amount: 520, receipts: 11, budget: 600 },
  { month: 'May', amount: 720, receipts: 18, budget: 600 },
  { month: 'Jun', amount: 590, receipts: 14, budget: 600 },
  { month: 'Jul', amount: 480, receipts: 13, budget: 600 },
];

const categoryData = [
  { name: 'Groceries', value: 1240, color: '#3b82f6' },
  { name: 'Transportation', value: 680, color: '#10b981' },
  { name: 'Food & Drink', value: 520, color: '#f59e0b' },
  { name: 'Shopping', value: 890, color: '#ef4444' },
  { name: 'Utilities', value: 340, color: '#8b5cf6' },
  { name: 'Entertainment', value: 280, color: '#06b6d4' },
];

const recentReceipts = [
  { id: 1, store: 'Whole Foods', amount: 87.42, date: '2024-06-15', category: 'Groceries', location: 'Downtown', tags: ['organic', 'weekly'], paymentMethod: 'Credit Card', notes: 'Weekly grocery shopping' },
  { id: 2, store: 'Shell Gas Station', amount: 45.20, date: '2024-06-14', category: 'Transportation', location: 'Highway 101', tags: ['fuel'], paymentMethod: 'Debit Card', notes: '' },
  { id: 3, store: 'Amazon', amount: 129.99, date: '2024-06-13', category: 'Shopping', location: 'Online', tags: ['electronics', 'work'], paymentMethod: 'Credit Card', notes: 'Wireless headphones for work' },
  { id: 4, store: 'Starbucks', amount: 6.75, date: '2024-06-12', category: 'Food & Drink', location: 'Main St', tags: ['coffee'], paymentMethod: 'Mobile Payment', notes: 'Morning coffee' },
  { id: 5, store: 'Target', amount: 234.56, date: '2024-06-11', category: 'Shopping', location: 'Westside Mall', tags: ['household'], paymentMethod: 'Credit Card', notes: 'Household essentials and decor' },
  { id: 6, store: 'Netflix', amount: 15.99, date: '2024-06-10', category: 'Entertainment', location: 'Online', tags: ['subscription'], paymentMethod: 'Auto-pay', notes: 'Monthly subscription' },
];

const StatCard = ({ title, value, icon: Icon, trend, color = 'blue' }) => (
  <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-lg transition-all duration-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {trend && (
          <p className={`text-sm flex items-center mt-1 ${trend.startsWith('+') ? 'text-green-600' : trend.startsWith('-') ? 'text-red-600' : 'text-gray-600'}`}>
            <TrendingUp className="h-4 w-4 mr-1" />
            {trend}
          </p>
        )}
      </div>
      <div className={`p-3 rounded-xl bg-${color}-100`}>
        <Icon className={`h-6 w-6 text-${color}-600`} />
      </div>
    </div>
  </div>
);

const ReceiptRow = ({ receipt, onEdit, onDelete }) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-200 group">
    <div className="flex items-center space-x-4">
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-3">
        <Receipt className="h-5 w-5 text-blue-600" />
      </div>
      <div>
        <div className="flex items-center space-x-2">
          <p className="font-semibold text-gray-900">{receipt.store}</p>
          {receipt.tags.length > 0 && (
            <div className="flex space-x-1">
              {receipt.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span className="flex items-center">
            <Tag className="h-3 w-3 mr-1" />
            {receipt.category}
          </span>
          <span className="flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            {receipt.location}
          </span>
          <span className="flex items-center">
            <CreditCard className="h-3 w-3 mr-1" />
            {receipt.paymentMethod}
          </span>
        </div>
        {receipt.notes && (
          <p className="text-sm text-gray-600 mt-1 italic">{receipt.notes}</p>
        )}
      </div>
    </div>
    <div className="flex items-center space-x-4">
      <div className="text-right">
        <p className="font-bold text-xl text-gray-900">${receipt.amount}</p>
        <p className="text-sm text-gray-500 flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          {receipt.date}
        </p>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
        <button 
          onClick={() => onEdit(receipt)}
          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
        >
          <Edit3 className="h-4 w-4" />
        </button>
        <button 
          onClick={() => onDelete(receipt.id)}
          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
);

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

const AddReceiptForm = ({ onSubmit, onCancel, editingReceipt = null }) => {
  const [formData, setFormData] = useState({
    store: editingReceipt?.store || '',
    amount: editingReceipt?.amount || '',
    date: editingReceipt?.date || new Date().toISOString().split('T')[0],
    category: editingReceipt?.category || 'Groceries',
    location: editingReceipt?.location || '',
    paymentMethod: editingReceipt?.paymentMethod || 'Credit Card',
    tags: editingReceipt?.tags?.join(', ') || '',
    notes: editingReceipt?.notes || '',
  });

  const categories = ['Groceries', 'Transportation', 'Food & Drink', 'Shopping', 'Utilities', 'Entertainment', 'Healthcare', 'Travel'];
  const paymentMethods = ['Credit Card', 'Debit Card', 'Cash', 'Mobile Payment', 'Auto-pay', 'Check'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const tags = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
    onSubmit({
      ...formData,
      amount: parseFloat(formData.amount),
      tags,
      id: editingReceipt?.id || Date.now(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Store/Vendor</label>
          <input
            type="text"
            value={formData.store}
            onChange={(e) => setFormData({...formData, store: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
          <input
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="Store location or 'Online'"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
          <select
            value={formData.paymentMethod}
            onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            {paymentMethods.map(method => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
        <input
          type="text"
          value={formData.tags}
          onChange={(e) => setFormData({...formData, tags: e.target.value})}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          placeholder="e.g., organic, weekly, work"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({...formData, notes: e.target.value})}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          placeholder="Additional notes about this receipt..."
        />
      </div>
      
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {editingReceipt ? 'Update Receipt' : 'Add Receipt'}
        </button>
      </div>
    </form>
  );
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingReceipt, setEditingReceipt] = useState(null);
  const [receipts, setReceipts] = useState(recentReceipts);
  const [view, setView] = useState('overview'); // overview, analytics, receipts
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Budget alert: You\'ve spent 90% of your monthly grocery budget', type: 'warning' },
    { id: 2, message: 'Don\'t forget to scan your receipt from lunch today!', type: 'reminder' }
  ]);

  const totalAmount = expenseData.reduce((sum, item) => sum + item.amount, 0);
  const totalReceipts = expenseData.reduce((sum, item) => sum + item.receipts, 0);
  const currentMonthBudget = 600;
  const currentMonthSpent = expenseData[expenseData.length - 1]?.amount || 0;
  
  const filteredReceipts = receipts.filter(receipt => {
    const matchesSearch = receipt.store.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         receipt.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         receipt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'All' || receipt.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddReceipt = (receiptData) => {
    if (editingReceipt) {
      setReceipts(receipts.map(r => r.id === editingReceipt.id ? receiptData : r));
      setEditingReceipt(null);
    } else {
      setReceipts([receiptData, ...receipts]);
    }
    setShowAddModal(false);
  };

  const handleEditReceipt = (receipt) => {
    setEditingReceipt(receipt);
    setShowAddModal(true);
  };

  const handleDeleteReceipt = (receiptId) => {
    setReceipts(receipts.filter(r => r.id !== receiptId));
  };

  const categories = ['All', ...Array.from(new Set(receipts.map(r => r.category)))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Enhanced Header */}
      <header className="bg-white shadow-sm border-b backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-2">
                <Receipt className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Receipt Tracker Pro</h1>
                <p className="text-sm text-gray-500">Smart expense management</p>
              </div>
              
              {/* Navigation */}
              <nav className="hidden md:flex space-x-1 ml-8">
                {[
                  { id: 'overview', label: 'Overview', icon: TrendingUp },
                  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
                  { id: 'receipts', label: 'Receipts', icon: Receipt }
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setView(id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      view === id ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Notifications */}
              <div className="relative">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative">
                  <Bell className="h-5 w-5" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </button>
              </div>
              
              {/* Action Buttons */}
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Camera className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Upload className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Download className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Settings className="h-5 w-5" />
              </button>
              
              <button 
                onClick={() => setShowAddModal(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Plus className="h-4 w-4" />
                <span>Add Receipt</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Notifications */}
        {notifications.length > 0 && (
          <div className="space-y-3 mb-8">
            {notifications.map(notification => (
              <Alert key={notification.id} className={`${
                notification.type === 'warning' ? 'bg-yellow-50 border-yellow-200' : 'bg-blue-50 border-blue-200'
              }`}>
                <Bell className="h-4 w-4" />
                <AlertDescription className={
                  notification.type === 'warning' ? 'text-yellow-800' : 'text-blue-800'
                }>
                  {notification.message}
                </AlertDescription>
              </Alert>
            ))}
          </div>
        )}

        {view === 'overview' && (
