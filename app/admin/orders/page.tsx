"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Search,
  Filter,
  Eye,
  Edit,
  Truck,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  MapPin,
  Phone,
  User,
  Calendar,
  DollarSign,
} from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Mock Orders Data
const mockOrders = [
  {
    id: "ORD-001",
    customerName: "سارة محمد أحمد",
    customerPhone: "+20 101 234 5678",
    customerAddress: "شارع النيل، المعادي، القاهرة",
    date: "2024-01-15",
    time: "14:30",
    status: "pending",
    paymentMethod: "COD",
    total: 1250,
    items: [
      { name: "كريم ترطيب الوجه", quantity: 2, price: 299 },
      { name: "سيروم فيتامين C", quantity: 1, price: 450 },
      { name: "غسول الوجه", quantity: 1, price: 189 },
    ],
    notes: "يرجى التوصيل في المساء بعد الساعة 6",
    shippingFee: 50,
  },
  {
    id: "ORD-002",
    customerName: "مريم علي حسن",
    customerPhone: "+20 106 789 1234",
    customerAddress: "مدينة نصر، القاهرة",
    date: "2024-01-15",
    time: "10:15",
    status: "processing",
    paymentMethod: "COD",
    total: 890,
    items: [
      { name: "كريم ترطيب الوجه", quantity: 1, price: 299 },
      { name: "غسول الوجه", quantity: 2, price: 189 },
    ],
    notes: "",
    shippingFee: 0,
  },
  {
    id: "ORD-003",
    customerName: "فاطمة أحمد علي",
    customerPhone: "+20 112 456 7890",
    customerAddress: "الزمالك، القاهرة",
    date: "2024-01-14",
    time: "16:45",
    status: "shipped",
    paymentMethod: "COD",
    total: 1890,
    items: [
      { name: "سيروم فيتامين C", quantity: 2, price: 450 },
      { name: "كر��م ترطيب الوجه", quantity: 3, price: 299 },
    ],
    notes: "العنوان قريب من مترو الأنفاق",
    shippingFee: 0,
  },
];

const orderStatuses = {
  pending: { label: "في الانتظار", color: "bg-yellow-100 text-yellow-700" },
  processing: { label: "قيد المعالجة", color: "bg-blue-100 text-blue-700" },
  shipped: { label: "تم الشحن", color: "bg-purple-100 text-purple-700" },
  delivered: { label: "تم التسليم", color: "bg-green-100 text-green-700" },
  cancelled: { label: "ملغي", color: "bg-red-100 text-red-700" },
};

// Order Card Component
const OrderCard = ({ order, onView, onUpdateStatus }) => {
  const status = orderStatuses[order.status];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-lg text-gray-900">#{order.id}</h3>
            <p className="text-sm text-gray-500">
              {order.date} - {order.time}
            </p>
          </div>
          <Badge className={status.color}>{status.label}</Badge>
        </div>

        {/* Customer Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-gray-400" />
            <span className="font-medium">{order.customerName}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="h-4 w-4 text-gray-400" />
            <span>{order.customerPhone}</span>
          </div>
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
            <span className="line-clamp-2">{order.customerAddress}</span>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <div className="space-y-2">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center text-sm"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span className="font-medium">
                  {(item.price * item.quantity).toFixed(0)} ج.م
                </span>
              </div>
            ))}
            {order.shippingFee > 0 && (
              <div className="flex justify-between items-center text-sm border-t border-gray-200 pt-2">
                <span>رسوم الشحن</span>
                <span className="font-medium">{order.shippingFee} ج.م</span>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center font-bold text-lg border-t border-gray-200 pt-2 mt-2">
            <span>المجموع</span>
            <span className="text-brand-600">{order.total} ج.م</span>
          </div>
        </div>

        {/* Notes */}
        {order.notes && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4">
            <p className="text-sm text-blue-800">
              <strong>ملاحظات:</strong> {order.notes}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView(order)}
            className="flex-1"
          >
            <Eye className="h-4 w-4 ml-1" />
            عرض التفاصيل
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdateStatus(order)}
            className="flex-1"
          >
            <Edit className="h-4 w-4 ml-1" />
            تحديث الحالة
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(mockOrders);
  const [filteredOrders, setFilteredOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const statusFilters = [
    { value: "all", label: "جميع الطلبات" },
    { value: "pending", label: "في الانتظار" },
    { value: "processing", label: "قيد المعالجة" },
    { value: "shipped", label: "تم الشحن" },
    { value: "delivered", label: "تم التسليم" },
    { value: "cancelled", label: "ملغي" },
  ];

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterOrders(term, selectedStatus);
  };

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    filterOrders(searchTerm, status);
  };

  const filterOrders = (term, status) => {
    let filtered = orders;

    if (term) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(term.toLowerCase()) ||
          order.customerName.toLowerCase().includes(term.toLowerCase()) ||
          order.customerPhone.includes(term),
      );
    }

    if (status !== "all") {
      filtered = filtered.filter((order) => order.status === status);
    }

    setFilteredOrders(filtered);
  };

  const handleViewOrder = (order) => {
    console.log("View order:", order);
  };

  const handleUpdateStatus = (order) => {
    console.log("Update status for order:", order);
  };

  // Calculate stats
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const shippedOrders = orders.filter((o) => o.status === "shipped").length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 mr-80">
        <AdminHeader
          title="إدارة الطلبات"
          subtitle="متابعة وإدارة جميع الطلبات"
        />

        <main className="p-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">إجمالي الطلبات</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalOrders}
                  </p>
                </div>
                <ShoppingCart className="h-8 w-8 text-brand-500" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">في الانتظار</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {pendingOrders}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">تم الشحن</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {shippedOrders}
                  </p>
                </div>
                <Truck className="h-8 w-8 text-purple-500" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">إجمالي المبيعات</p>
                  <p className="text-2xl font-bold text-green-600">
                    {totalRevenue.toLocaleString()} ج.م
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </motion.div>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="البحث برقم الطلب أو اسم العميل أو رقم الهاتف..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-4 pr-12 py-3 rounded-xl text-right"
                  dir="rtl"
                />
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto">
              {statusFilters.map((filter) => (
                <Button
                  key={filter.value}
                  variant={
                    selectedStatus === filter.value ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => handleStatusFilter(filter.value)}
                  className={`whitespace-nowrap ${
                    selectedStatus === filter.value
                      ? "bg-brand-600 hover:bg-brand-700"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Orders Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onView={handleViewOrder}
                  onUpdateStatus={handleUpdateStatus}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredOrders.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                لا توجد طلبات
              </h3>
              <p className="text-gray-600">
                لم يتم العثور على طلبات تطابق معايير البحث
              </p>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
