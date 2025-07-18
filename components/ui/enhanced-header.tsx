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
  const totalValue = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

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
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <motion.header
        style={{ opacity: headerOpacity, scale: headerScale }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass-strong shadow-2xl backdrop-blur-xl border-b border-white/10"
            : "bg-transparent"
        } ${className}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Actions (Right side) */}
            <div className="flex items-center gap-2">
              {/* Cart Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative h-12 w-12 rounded-2xl glass hover:bg-gradient-primary hover:text-white transition-all duration-300"
                  onClick={toggleCart}
                >
                  <motion.div
                    animate={{
                      rotate: totalItems > 0 ? [0, 10, -10, 0] : 0,
                      scale: totalItems > 0 ? [1, 1.1, 1] : 1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <ShoppingBag className="h-6 w-6" />
                  </motion.div>

                  <AnimatePresence>
                    {totalItems > 0 && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute -top-2 -left-2"
                      >
                        <Badge className="bg-red-500 text-white px-2 py-1 text-xs font-bold animate-pulse">
                          {totalItems}
                        </Badge>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Hover tooltip */}
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{
                      opacity: 0,
                      y: 10,
                      scale: 0.9,
                    }}
                    whileHover={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap pointer-events-none"
                  >
                    {totalItems > 0
                      ? `${totalItems} منتج - ${totalValue.toFixed(2)} ج.م`
                      : "السلة فارغة"}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black rotate-45" />
                  </motion.div>
                </Button>
              </motion.div>

              {/* Wishlist Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-12 w-12 rounded-2xl glass hover:bg-gradient-secondary hover:text-white transition-all duration-300"
                  asChild
                >
                  <Link href="/wishlist">
                    <Heart className="h-6 w-6" />
                  </Link>
                </Button>
              </motion.div>

              {/* Search Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-12 w-12 rounded-2xl glass hover:bg-gradient-accent hover:text-white transition-all duration-300"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="h-6 w-6" />
                </Button>
              </motion.div>

              {/* Notifications */}
              {showNotifications && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-12 w-12 rounded-2xl glass hover:bg-gradient-primary hover:text-white transition-all duration-300 relative"
                  >
                    <Bell className="h-6 w-6" />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"
                    />
                  </Button>
                </motion.div>
              )}
            </div>

            {/* Logo (Center) */}
            <motion.div
              style={{ scale: logoScale }}
              className="absolute left-1/2 transform -translate-x-1/2"
            >
              <Link href="/" className="flex items-center gap-3 group">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="relative"
                >
                  <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <Flower className="h-7 w-7 text-white" />
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 border-2 border-transparent border-t-brand-300 rounded-2xl"
                  />
                </motion.div>
                <div className="text-center">
                  <motion.h1
                    whileHover={{ scale: 1.05 }}
                    className="text-3xl font-display font-black text-gradient bg-gradient-primary bg-clip-text text-transparent"
                  >
                    كليدج
                  </motion.h1>
                  <p className="text-xs text-gray-600 font-medium">
                    Natural Beauty
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* Navigation & User (Left side) */}
            <div className="flex items-center gap-4">
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-1">
                {navItems.map((item, index) => (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() =>
                      item.submenu && setActiveDropdown(item.href)
                    }
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-12 px-4 rounded-2xl glass hover:bg-gradient-primary hover:text-white transition-all duration-300 group relative"
                        asChild={!item.submenu}
                      >
                        {item.submenu ? (
                          <div className="flex items-center gap-2 cursor-pointer">
                            {item.icon}
                            <span className="font-medium">{item.label}</span>
                            <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            className="flex items-center gap-2"
                          >
                            {item.icon}
                            <span className="font-medium">{item.label}</span>
                            {item.badge && (
                              <Badge className="bg-red-500 text-white px-2 py-1 text-xs">
                                {item.badge}
                              </Badge>
                            )}
                          </Link>
                        )}
                      </Button>
                    </motion.div>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {item.submenu && activeDropdown === item.href && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-64 glass-strong rounded-2xl shadow-2xl border border-white/10 overflow-hidden z-50"
                        >
                          <div className="p-2">
                            {item.submenu.map((subItem, subIndex) => (
                              <motion.div
                                key={subItem.href}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: subIndex * 0.05 }}
                              >
                                <Link
                                  href={subItem.href}
                                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors group"
                                  onClick={() => setActiveDropdown(null)}
                                >
                                  <div className="p-2 bg-gradient-primary rounded-lg text-white group-hover:scale-110 transition-transform">
                                    {subItem.icon}
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-900 group-hover:text-brand-600">
                                      {subItem.label}
                                    </h4>
                                    {subItem.description && (
                                      <p className="text-sm text-gray-600 mt-1">
                                        {subItem.description}
                                      </p>
                                    )}
                                  </div>
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>

              {/* User Menu or Login */}
              {user ? (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown("user")}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-12 px-4 rounded-2xl glass hover:bg-gradient-primary hover:text-white transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          user.name.charAt(0)
                        )}
                      </div>
                      <div className="hidden md:block text-right">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-gray-600">{user.role}</p>
                      </div>
                      <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                    </div>
                  </Button>

                  {/* User Dropdown */}
                  <AnimatePresence>
                    {activeDropdown === "user" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full left-0 mt-2 w-64 glass-strong rounded-2xl shadow-2xl border border-white/10 overflow-hidden z-50"
                      >
                        <div className="p-2">
                          <div className="p-4 border-b border-white/10">
                            <h4 className="font-medium text-gray-900">
                              {user.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {user.email}
                            </p>
                          </div>

                          {[
                            {
                              href: "/profile",
                              label: "الملف الشخصي",
                              icon: <User className="w-4 h-4" />,
                            },
                            {
                              href: "/orders",
                              label: "طلباتي",
                              icon: <Package className="w-4 h-4" />,
                            },
                            {
                              href: "/settings",
                              label: "الإعدادات",
                              icon: <Settings className="w-4 h-4" />,
                            },
                          ].map((menuItem) => (
                            <Link
                              key={menuItem.href}
                              href={menuItem.href}
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors group"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <div className="text-gray-600 group-hover:text-brand-600">
                                {menuItem.icon}
                              </div>
                              <span className="font-medium text-gray-900 group-hover:text-brand-600">
                                {menuItem.label}
                              </span>
                            </Link>
                          ))}

                          <div className="border-t border-white/10 mt-2 pt-2">
                            <button
                              onClick={() => {
                                onLogout?.();
                                setActiveDropdown(null);
                              }}
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 transition-colors group w-full text-right"
                            >
                              <LogOut className="w-4 h-4 text-red-600" />
                              <span className="font-medium text-red-600">
                                تسجيل الخروج
                              </span>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={onLogin}
                    className="h-12 px-6 bg-gradient-primary hover:shadow-xl text-white rounded-2xl transition-all duration-300 group"
                  >
                    <User className="h-5 w-5 ml-2 group-hover:scale-110 transition-transform" />
                    تسجيل الدخول
                    <Zap className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </motion.div>
              )}

              {/* Mobile Menu Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="lg:hidden"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-12 w-12 rounded-2xl glass"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <AnimatePresence mode="wait">
                    {isMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                      >
                        <X className="h-6 w-6" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                      >
                        <Menu className="h-6 w-6" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-32"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: -20 }}
              className="w-full max-w-2xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSearch} className="relative">
                <Input
                  ref={searchInputRef}
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-16 pl-16 pr-6 text-xl bg-white/95 backdrop-blur-sm border-0 rounded-3xl shadow-2xl focus:ring-4 focus:ring-brand-300"
                  dir="rtl"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 bg-gradient-primary hover:scale-110 transition-transform"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </form>

              {/* Search suggestions */}
              {searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-4"
                >
                  <h4 className="font-medium text-gray-900 mb-3">
                    اقتراحات البحث
                  </h4>
                  <div className="space-y-2">
                    {[
                      "سيروم فيتامين سي",
                      "كريم ترطيب",
                      "منظف الوجه",
                      "ماسك الطين",
                    ]
                      .filter((suggestion) =>
                        suggestion
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()),
                      )
                      .map((suggestion, index) => (
                        <motion.button
                          key={suggestion}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => {
                            setSearchQuery(suggestion);
                            handleSearch(new Event("submit") as any);
                          }}
                          className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-gray-100 transition-colors group text-right"
                        >
                          <Search className="h-4 w-4 text-gray-400 group-hover:text-brand-600" />
                          <span className="text-gray-700 group-hover:text-brand-600">
                            {suggestion}
                          </span>
                        </motion.button>
                      ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 bg-white/95 backdrop-blur-xl z-40 shadow-2xl lg:hidden"
          >
            <div className="p-6 pt-24">
              <nav className="space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-primary hover:text-white transition-all duration-300 group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="p-2 bg-gray-100 group-hover:bg-white/20 rounded-xl transition-colors">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{item.label}</h4>
                        {item.labelEn && (
                          <p className="text-sm opacity-70">{item.labelEn}</p>
                        )}
                      </div>
                      {item.badge && (
                        <Badge className="bg-red-500 text-white px-2 py-1 text-xs ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Cart Component */}
      <Cart />
    </>
  );
}
