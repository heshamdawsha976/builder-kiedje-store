"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  ShoppingBag,
  Menu,
  X,
  Search,
  Heart,
  User,
  Sparkles,
  Flower,
  ChevronDown,
  Star,
  TrendingUp,
  Zap,
  Bell,
  Settings,
  LogOut,
  Package,
} from "lucide-react";
import { Button } from "./button";
import { Badge } from "./badge";
import { Input } from "./input";
import { useCartStore } from "@/lib/cart";
import { Cart } from "../Cart";
import { useLazyLoading } from "@/lib/hooks/use-lazy-loading";

interface NavItem {
  href: string;
  label: string;
  labelEn?: string;
  icon?: React.ReactNode;
  badge?: string;
  submenu?: {
    href: string;
    label: string;
    description?: string;
    icon?: React.ReactNode;
  }[];
}

interface User {
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

interface EnhancedHeaderProps {
  user?: User;
  onLogin?: () => void;
  onLogout?: () => void;
  searchPlaceholder?: string;
  showNotifications?: boolean;
  className?: string;
}

export function EnhancedHeader({
  user,
  onLogin,
  onLogout,
  searchPlaceholder = "ابحث عن منتجات العناية...",
  showNotifications = true,
  className = "",
}: EnhancedHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { toggleCart, getTotalItems, items } = useCartStore();
  const totalItems = getTotalItems();
  const totalValue = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Scroll effects
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.98]);
  const headerScale = useTransform(scrollY, [0, 100], [1, 0.995]);
  const logoScale = useSpring(useTransform(scrollY, [0, 100], [1, 0.9]));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close search on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const navItems: NavItem[] = [
    {
      href: "/",
      label: "الرئيسية",
      labelEn: "Home",
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      href: "/products",
      label: "المنتجات",
      labelEn: "Products",
      icon: <Flower className="w-4 h-4" />,
      submenu: [
        {
          href: "/products/serums",
          label: "سيرومات",
          description: "سيرومات متقدمة للعناية بالبشرة",
          icon: <Star className="w-4 h-4" />,
        },
        {
          href: "/products/moisturizers",
          label: "مرطبات",
          description: "كريمات ترطيب طبيعية",
          icon: <Heart className="w-4 h-4" />,
        },
        {
          href: "/products/cleansers",
          label: "منظفات",
          description: "منظفات لطيفة للبشرة",
          icon: <Sparkles className="w-4 h-4" />,
        },
        {
          href: "/products/new",
          label: "جديد",
          description: "أحدث المنتجات",
          icon: <TrendingUp className="w-4 h-4" />,
        },
      ],
    },
    {
      href: "/about",
      label: "من نحن",
      labelEn: "About",
      icon: <Heart className="w-4 h-4" />,
    },
    {
      href: "/contact",
      label: "تواصل معنا",
      labelEn: "Contact",
      icon: <User className="w-4 h-4" />,
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;\n      setIsSearchOpen(false);\n      setSearchQuery(\"\");\n    }\n  };\n\n  return (\n    <>\n      <motion.header\n        style={{ opacity: headerOpacity, scale: headerScale }}\n        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${\n          isScrolled\n            ? \"glass-strong shadow-2xl backdrop-blur-xl border-b border-white/10\"\n            : \"bg-transparent\"\n        } ${className}`}\n      >\n        <div className=\"container mx-auto px-4\">\n          <div className=\"flex items-center justify-between h-20\">\n            {/* Actions (Right side) */}\n            <div className=\"flex items-center gap-2\">\n              {/* Cart Button */}\n              <motion.div\n                whileHover={{ scale: 1.05 }}\n                whileTap={{ scale: 0.95 }}\n                className=\"relative\"\n              >\n                <Button\n                  variant=\"ghost\"\n                  size=\"sm\"\n                  className=\"relative h-12 w-12 rounded-2xl glass hover:bg-gradient-primary hover:text-white transition-all duration-300 group\"\n                  onClick={toggleCart}\n                >\n                  <motion.div\n                    animate={{\n                      rotate: totalItems > 0 ? [0, 10, -10, 0] : 0,\n                      scale: totalItems > 0 ? [1, 1.1, 1] : 1,\n                    }}\n                    transition={{ duration: 0.5 }}\n                  >\n                    <ShoppingBag className=\"h-6 w-6\" />\n                  </motion.div>\n                  \n                  <AnimatePresence>\n                    {totalItems > 0 && (\n                      <motion.div\n                        initial={{ scale: 0, opacity: 0 }}\n                        animate={{ scale: 1, opacity: 1 }}\n                        exit={{ scale: 0, opacity: 0 }}\n                        className=\"absolute -top-2 -left-2\"\n                      >\n                        <Badge className=\"bg-red-500 text-white px-2 py-1 text-xs font-bold animate-pulse\">\n                          {totalItems}\n                        </Badge>\n                      </motion.div>\n                    )}\n                  </AnimatePresence>\n                  \n                  {/* Hover tooltip */}\n                  <motion.div\n                    initial={{ opacity: 0, y: 10, scale: 0.9 }}\n                    whileHover={{ opacity: 1, y: 0, scale: 1 }}\n                    className=\"absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap pointer-events-none\"\n                  >\n                    {totalItems > 0 ? `${totalItems} منتج - ${totalValue.toFixed(2)} ج.م` : \"السلة فارغة\"}\n                    <div className=\"absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black rotate-45\" />\n                  </motion.div>\n                </Button>\n              </motion.div>\n\n              {/* Wishlist Button */}\n              <motion.div\n                whileHover={{ scale: 1.05 }}\n                whileTap={{ scale: 0.95 }}\n              >\n                <Button\n                  variant=\"ghost\"\n                  size=\"sm\"\n                  className=\"h-12 w-12 rounded-2xl glass hover:bg-gradient-secondary hover:text-white transition-all duration-300\"\n                  asChild\n                >\n                  <Link href=\"/wishlist\">\n                    <Heart className=\"h-6 w-6\" />\n                  </Link>\n                </Button>\n              </motion.div>\n\n              {/* Search Button */}\n              <motion.div\n                whileHover={{ scale: 1.05 }}\n                whileTap={{ scale: 0.95 }}\n              >\n                <Button\n                  variant=\"ghost\"\n                  size=\"sm\"\n                  className=\"h-12 w-12 rounded-2xl glass hover:bg-gradient-accent hover:text-white transition-all duration-300\"\n                  onClick={() => setIsSearchOpen(true)}\n                >\n                  <Search className=\"h-6 w-6\" />\n                </Button>\n              </motion.div>\n\n              {/* Notifications */}\n              {showNotifications && (\n                <motion.div\n                  whileHover={{ scale: 1.05 }}\n                  whileTap={{ scale: 0.95 }}\n                >\n                  <Button\n                    variant=\"ghost\"\n                    size=\"sm\"\n                    className=\"h-12 w-12 rounded-2xl glass hover:bg-gradient-primary hover:text-white transition-all duration-300 relative\"\n                  >\n                    <Bell className=\"h-6 w-6\" />\n                    <motion.div\n                      animate={{ scale: [1, 1.2, 1] }}\n                      transition={{ repeat: Infinity, duration: 2 }}\n                      className=\"absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full\"\n                    />\n                  </Button>\n                </motion.div>\n              )}\n            </div>\n\n            {/* Logo (Center) */}\n            <motion.div\n              style={{ scale: logoScale }}\n              className=\"absolute left-1/2 transform -translate-x-1/2\"\n            >\n              <Link href=\"/\" className=\"flex items-center gap-3 group\">\n                <motion.div\n                  whileHover={{ rotate: 360 }}\n                  transition={{ duration: 0.8 }}\n                  className=\"relative\"\n                >\n                  <div className=\"w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300\">\n                    <Flower className=\"h-7 w-7 text-white\" />\n                  </div>\n                  <motion.div\n                    animate={{ rotate: 360 }}\n                    transition={{ duration: 20, repeat: Infinity, ease: \"linear\" }}\n                    className=\"absolute inset-0 border-2 border-transparent border-t-brand-300 rounded-2xl\"\n                  />\n                </motion.div>\n                <div className=\"text-center\">\n                  <motion.h1\n                    whileHover={{ scale: 1.05 }}\n                    className=\"text-3xl font-display font-black text-gradient bg-gradient-primary bg-clip-text text-transparent\"\n                  >\n                    كليدج\n                  </motion.h1>\n                  <p className=\"text-xs text-gray-600 font-medium\">Natural Beauty</p>\n                </div>\n              </Link>\n            </motion.div>\n\n            {/* Navigation & User (Left side) */}\n            <div className=\"flex items-center gap-4\">\n              {/* Desktop Navigation */}\n              <nav className=\"hidden lg:flex items-center gap-1\">\n                {navItems.map((item, index) => (\n                  <div\n                    key={item.href}\n                    className=\"relative\"\n                    onMouseEnter={() => item.submenu && setActiveDropdown(item.href)}\n                    onMouseLeave={() => setActiveDropdown(null)}\n                  >\n                    <motion.div\n                      initial={{ opacity: 0, y: -10 }}\n                      animate={{ opacity: 1, y: 0 }}\n                      transition={{ delay: index * 0.1 }}\n                    >\n                      <Button\n                        variant=\"ghost\"\n                        size=\"sm\"\n                        className=\"h-12 px-4 rounded-2xl glass hover:bg-gradient-primary hover:text-white transition-all duration-300 group relative\"\n                        asChild={!item.submenu}\n                      >\n                        {item.submenu ? (\n                          <div className=\"flex items-center gap-2 cursor-pointer\">\n                            {item.icon}\n                            <span className=\"font-medium\">{item.label}</span>\n                            <ChevronDown className=\"h-4 w-4 transition-transform group-hover:rotate-180\" />\n                          </div>\n                        ) : (\n                          <Link href={item.href} className=\"flex items-center gap-2\">\n                            {item.icon}\n                            <span className=\"font-medium\">{item.label}</span>\n                            {item.badge && (\n                              <Badge className=\"bg-red-500 text-white px-2 py-1 text-xs\">\n                                {item.badge}\n                              </Badge>\n                            )}\n                          </Link>\n                        )}\n                      </Button>\n                    </motion.div>\n\n                    {/* Dropdown Menu */}\n                    <AnimatePresence>\n                      {item.submenu && activeDropdown === item.href && (\n                        <motion.div\n                          initial={{ opacity: 0, y: 10, scale: 0.95 }}\n                          animate={{ opacity: 1, y: 0, scale: 1 }}\n                          exit={{ opacity: 0, y: 10, scale: 0.95 }}\n                          transition={{ duration: 0.2 }}\n                          className=\"absolute top-full left-0 mt-2 w-64 glass-strong rounded-2xl shadow-2xl border border-white/10 overflow-hidden z-50\"\n                        >\n                          <div className=\"p-2\">\n                            {item.submenu.map((subItem, subIndex) => (\n                              <motion.div\n                                key={subItem.href}\n                                initial={{ opacity: 0, x: -10 }}\n                                animate={{ opacity: 1, x: 0 }}\n                                transition={{ delay: subIndex * 0.05 }}\n                              >\n                                <Link\n                                  href={subItem.href}\n                                  className=\"flex items-start gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors group\"\n                                  onClick={() => setActiveDropdown(null)}\n                                >\n                                  <div className=\"p-2 bg-gradient-primary rounded-lg text-white group-hover:scale-110 transition-transform\">\n                                    {subItem.icon}\n                                  </div>\n                                  <div>\n                                    <h4 className=\"font-medium text-gray-900 group-hover:text-brand-600\">\n                                      {subItem.label}\n                                    </h4>\n                                    {subItem.description && (\n                                      <p className=\"text-sm text-gray-600 mt-1\">\n                                        {subItem.description}\n                                      </p>\n                                    )}\n                                  </div>\n                                </Link>\n                              </motion.div>\n                            ))}\n                          </div>\n                        </motion.div>\n                      )}\n                    </AnimatePresence>\n                  </div>\n                ))}\n              </nav>\n\n              {/* User Menu */}\n              <div className=\"relative\">\n                {user ? (\n                  <motion.div\n                    whileHover={{ scale: 1.05 }}\n                    className=\"relative\"\n                    onMouseEnter={() => setActiveDropdown('user')}\n                    onMouseLeave={() => setActiveDropdown(null)}\n                  >\n                    <Button\n                      variant=\"ghost\"\n                      size=\"sm\"\n                      className=\"h-12 px-4 rounded-2xl glass hover:bg-gradient-primary hover:text-white transition-all duration-300 group\"\n                    >\n                      <div className=\"flex items-center gap-3\">\n                        <div className=\"w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold\">\n                          {user.avatar ? (\n                            <img src={user.avatar} alt={user.name} className=\"w-full h-full rounded-full object-cover\" />\n                          ) : (\n                            user.name.charAt(0)\n                          )}\n                        </div>\n                        <div className=\"hidden md:block text-right\">\n                          <p className=\"font-medium\">{user.name}</p>\n                          <p className=\"text-xs text-gray-600\">{user.role}</p>\n                        </div>\n                        <ChevronDown className=\"h-4 w-4 transition-transform group-hover:rotate-180\" />\n                      </div>\n                    </Button>\n\n                    {/* User Dropdown */}\n                    <AnimatePresence>\n                      {activeDropdown === 'user' && (\n                        <motion.div\n                          initial={{ opacity: 0, y: 10, scale: 0.95 }}\n                          animate={{ opacity: 1, y: 0, scale: 1 }}\n                          exit={{ opacity: 0, y: 10, scale: 0.95 }}\n                          className=\"absolute top-full left-0 mt-2 w-64 glass-strong rounded-2xl shadow-2xl border border-white/10 overflow-hidden z-50\"\n                        >\n                          <div className=\"p-2\">\n                            <div className=\"p-4 border-b border-white/10\">\n                              <h4 className=\"font-medium text-gray-900\">{user.name}</h4>\n                              <p className=\"text-sm text-gray-600\">{user.email}</p>\n                            </div>\n                            \n                            {[\n                              { href: '/profile', label: 'الملف الشخصي', icon: <User className=\"w-4 h-4\" /> },\n                              { href: '/orders', label: 'طلباتي', icon: <Package className=\"w-4 h-4\" /> },\n                              { href: '/settings', label: 'الإعدادات', icon: <Settings className=\"w-4 h-4\" /> },\n                            ].map((menuItem) => (\n                              <Link\n                                key={menuItem.href}\n                                href={menuItem.href}\n                                className=\"flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors group\"\n                                onClick={() => setActiveDropdown(null)}\n                              >\n                                <div className=\"text-gray-600 group-hover:text-brand-600\">\n                                  {menuItem.icon}\n                                </div>\n                                <span className=\"font-medium text-gray-900 group-hover:text-brand-600\">\n                                  {menuItem.label}\n                                </span>\n                              </Link>\n                            ))}\n                            \n                            <div className=\"border-t border-white/10 mt-2 pt-2\">\n                              <button\n                                onClick={() => {\n                                  onLogout?.();\n                                  setActiveDropdown(null);\n                                }}\n                                className=\"flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 transition-colors group w-full text-right\"\n                              >\n                                <LogOut className=\"w-4 h-4 text-red-600\" />\n                                <span className=\"font-medium text-red-600\">تسجيل الخروج</span>\n                              </button>\n                            </div>\n                          </div>\n                        </motion.div>\n                      )}\n                    </AnimatePresence>\n                  </motion.div>\n                ) : (\n                  <motion.div\n                    whileHover={{ scale: 1.05 }}\n                    whileTap={{ scale: 0.95 }}\n                  >\n                    <Button\n                      onClick={onLogin}\n                      className=\"h-12 px-6 bg-gradient-primary hover:shadow-xl text-white rounded-2xl transition-all duration-300 group\"\n                    >\n                      <User className=\"h-5 w-5 ml-2 group-hover:scale-110 transition-transform\" />\n                      تسجيل الدخول\n                      <Zap className=\"h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity\" />\n                    </Button>\n                  </motion.div>\n                )}\n              </div>\n\n              {/* Mobile Menu Button */}\n              <motion.div\n                whileHover={{ scale: 1.05 }}\n                whileTap={{ scale: 0.95 }}\n                className=\"lg:hidden\"\n              >\n                <Button\n                  variant=\"ghost\"\n                  size=\"sm\"\n                  className=\"h-12 w-12 rounded-2xl glass\"\n                  onClick={() => setIsMenuOpen(!isMenuOpen)}\n                >\n                  <AnimatePresence mode=\"wait\">\n                    {isMenuOpen ? (\n                      <motion.div\n                        key=\"close\"\n                        initial={{ rotate: -90, opacity: 0 }}\n                        animate={{ rotate: 0, opacity: 1 }}\n                        exit={{ rotate: 90, opacity: 0 }}\n                      >\n                        <X className=\"h-6 w-6\" />\n                      </motion.div>\n                    ) : (\n                      <motion.div\n                        key=\"menu\"\n                        initial={{ rotate: 90, opacity: 0 }}\n                        animate={{ rotate: 0, opacity: 1 }}\n                        exit={{ rotate: -90, opacity: 0 }}\n                      >\n                        <Menu className=\"h-6 w-6\" />\n                      </motion.div>\n                    )}\n                  </AnimatePresence>\n                </Button>\n              </motion.div>\n            </div>\n          </div>\n        </div>\n      </motion.header>\n\n      {/* Search Overlay */}\n      <AnimatePresence>\n        {isSearchOpen && (\n          <motion.div\n            initial={{ opacity: 0 }}\n            animate={{ opacity: 1 }}\n            exit={{ opacity: 0 }}\n            className=\"fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-32\"\n            onClick={() => setIsSearchOpen(false)}\n          >\n            <motion.div\n              initial={{ scale: 0.9, opacity: 0, y: -20 }}\n              animate={{ scale: 1, opacity: 1, y: 0 }}\n              exit={{ scale: 0.9, opacity: 0, y: -20 }}\n              className=\"w-full max-w-2xl mx-4\"\n              onClick={(e) => e.stopPropagation()}\n            >\n              <form onSubmit={handleSearch} className=\"relative\">\n                <Input\n                  ref={searchInputRef}\n                  type=\"text\"\n                  placeholder={searchPlaceholder}\n                  value={searchQuery}\n                  onChange={(e) => setSearchQuery(e.target.value)}\n                  className=\"w-full h-16 pl-16 pr-6 text-xl bg-white/95 backdrop-blur-sm border-0 rounded-3xl shadow-2xl focus:ring-4 focus:ring-brand-300\"\n                  dir=\"rtl\"\n                />\n                <Button\n                  type=\"submit\"\n                  size=\"sm\"\n                  className=\"absolute left-4 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 bg-gradient-primary hover:scale-110 transition-transform\"\n                >\n                  <Search className=\"h-4 w-4\" />\n                </Button>\n              </form>\n              \n              {/* Search suggestions */}\n              {searchQuery && (\n                <motion.div\n                  initial={{ opacity: 0, y: 10 }}\n                  animate={{ opacity: 1, y: 0 }}\n                  className=\"mt-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-4\"\n                >\n                  <h4 className=\"font-medium text-gray-900 mb-3\">اقتراحات البحث</h4>\n                  <div className=\"space-y-2\">\n                    {[\n                      \"سيروم فيتامين سي\",\n                      \"كريم ترطيب\",\n                      \"منظف الوجه\",\n                      \"ماسك الطين\"\n                    ].filter(suggestion => \n                      suggestion.toLowerCase().includes(searchQuery.toLowerCase())\n                    ).map((suggestion, index) => (\n                      <motion.button\n                        key={suggestion}\n                        initial={{ opacity: 0, x: -10 }}\n                        animate={{ opacity: 1, x: 0 }}\n                        transition={{ delay: index * 0.1 }}\n                        onClick={() => {\n                          setSearchQuery(suggestion);\n                          handleSearch(new Event('submit') as any);\n                        }}\n                        className=\"flex items-center gap-3 w-full p-3 rounded-xl hover:bg-gray-100 transition-colors group text-right\"\n                      >\n                        <Search className=\"h-4 w-4 text-gray-400 group-hover:text-brand-600\" />\n                        <span className=\"text-gray-700 group-hover:text-brand-600\">{suggestion}</span>\n                      </motion.button>\n                    ))}\n                  </div>\n                </motion.div>\n              )}\n            </motion.div>\n          </motion.div>\n        )}\n      </AnimatePresence>\n\n      {/* Mobile Menu */}\n      <AnimatePresence>\n        {isMenuOpen && (\n          <motion.div\n            initial={{ opacity: 0, x: \"100%\" }}\n            animate={{ opacity: 1, x: 0 }}\n            exit={{ opacity: 0, x: \"100%\" }}\n            transition={{ type: \"spring\", damping: 25, stiffness: 200 }}\n            className=\"fixed top-0 right-0 h-full w-80 bg-white/95 backdrop-blur-xl z-40 shadow-2xl lg:hidden\"\n          >\n            <div className=\"p-6 pt-24\">\n              <nav className=\"space-y-4\">\n                {navItems.map((item, index) => (\n                  <motion.div\n                    key={item.href}\n                    initial={{ opacity: 0, x: 20 }}\n                    animate={{ opacity: 1, x: 0 }}\n                    transition={{ delay: index * 0.1 }}\n                  >\n                    <Link\n                      href={item.href}\n                      className=\"flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-primary hover:text-white transition-all duration-300 group\"\n                      onClick={() => setIsMenuOpen(false)}\n                    >\n                      <div className=\"p-2 bg-gray-100 group-hover:bg-white/20 rounded-xl transition-colors\">\n                        {item.icon}\n                      </div>\n                      <div>\n                        <h4 className=\"font-medium\">{item.label}</h4>\n                        {item.labelEn && (\n                          <p className=\"text-sm opacity-70\">{item.labelEn}</p>\n                        )}\n                      </div>\n                      {item.badge && (\n                        <Badge className=\"bg-red-500 text-white px-2 py-1 text-xs ml-auto\">\n                          {item.badge}\n                        </Badge>\n                      )}\n                    </Link>\n                  </motion.div>\n                ))}\n              </nav>\n            </div>\n          </motion.div>\n        )}\n      </AnimatePresence>\n\n      {/* Mobile Menu Backdrop */}\n      <AnimatePresence>\n        {isMenuOpen && (\n          <motion.div\n            initial={{ opacity: 0 }}\n            animate={{ opacity: 1 }}\n            exit={{ opacity: 0 }}\n            className=\"fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden\"\n            onClick={() => setIsMenuOpen(false)}\n          />\n        )}\n      </AnimatePresence>\n\n      {/* Cart Component */}\n      <Cart />\n    </>\n  );\n}\n