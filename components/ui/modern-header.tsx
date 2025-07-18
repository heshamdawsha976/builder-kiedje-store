"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  Star,
  Sparkles,
  Crown,
  Gift,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

// Navigation Items
const navItems = [
  { name: "الرئيسية", href: "/", active: true },
  { name: "المنتجات", href: "/products" },
  { name: "بوكس العروسة", href: "/bride-box", special: true },
  { name: "العروض", href: "/offers" },
  { name: "من نحن", href: "/about" },
  { name: "تواصل معنا", href: "/contact" },
];

// Search Overlay Component
const SearchOverlay = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-4 mb-6">
            <Search className="h-6 w-6 text-kledje-500" />
            <Input
              placeholder="ابحثي عن منتجات العناية..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xl border-0 focus:ring-0 px-0"
              dir="rtl"
              autoFocus
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="text-sm text-gray-500 font-medium">
              البحث الشائع
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "كريم مرطب",
                "منتجات طبيعية",
                "العناية بالوجه",
                "بوكس العروسة",
                "زيوت طبيعية",
              ].map((term) => (
                <Button
                  key={term}
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => setSearchQuery(term)}
                >
                  {term}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Mobile Menu Component
const MobileMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-[90] overflow-y-auto"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="text-2xl font-display text-gradient-kledje">
            كليدج
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <nav className="space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block py-3 px-4 rounded-xl transition-colors ${
                item.active
                  ? "bg-kledje-50 text-kledje-600 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              } ${item.special ? "bg-gradient-coral text-white" : ""}`}
              onClick={onClose}
            >
              <div className="flex items-center justify-between">
                {item.name}
                {item.special && <Crown className="h-4 w-4" />}
              </div>
            </Link>
          ))}
        </nav>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-600">
              <Phone className="h-4 w-4" />
              <span>+20 100 123 4567</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Mail className="h-4 w-4" />
              <span>info@kledje.com</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>القاهرة، مصر</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main Header Component
export const ModernHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const [wishlistCount, setWishlistCount] = useState(5);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(true)}
                className="glass rounded-xl"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div whileHover={{ scale: 1.05 }} className="relative">
                <div className="w-12 h-12 bg-gradient-kledje rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">ك</span>
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-coral rounded-full opacity-80"
                />
              </motion.div>
              <div className="hidden sm:block">
                <div className="text-3xl font-display text-gradient-kledje group-hover:scale-105 transition-transform">
                  كليدج
                </div>
                <div className="text-xs text-gray-500 -mt-1">
                  منتجات طبيعية 100%
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-xl transition-all relative group ${
                    item.active
                      ? "text-kledje-600 font-medium"
                      : "text-gray-700 hover:text-kledje-600"
                  }`}
                >
                  {item.name}
                  {item.special && (
                    <Badge className="absolute -top-2 -right-2 bg-gradient-coral text-white text-xs px-2 py-0.5 rounded-full">
                      جديد
                    </Badge>
                  )}
                  {item.active && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-kledje rounded-full"
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Search Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSearchOpen(true)}
                  className="glass rounded-xl relative group"
                >
                  <Search className="h-5 w-5" />
                  <div className="absolute inset-0 bg-gradient-kledje opacity-0 group-hover:opacity-10 rounded-xl transition-opacity" />
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
                  className="glass rounded-xl relative group"
                >
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-coral text-white text-xs rounded-full flex items-center justify-center font-bold"
                    >
                      {wishlistCount}
                    </motion.div>
                  )}
                  <div className="absolute inset-0 bg-gradient-coral opacity-0 group-hover:opacity-10 rounded-xl transition-opacity" />
                </Button>
              </motion.div>

              {/* Cart Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="glass rounded-xl relative group"
                >
                  <ShoppingBag className="h-5 w-5" />
                  {cartCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-teal text-white text-xs rounded-full flex items-center justify-center font-bold"
                    >
                      {cartCount}
                    </motion.div>
                  )}
                  <div className="absolute inset-0 bg-gradient-teal opacity-0 group-hover:opacity-10 rounded-xl transition-opacity" />
                </Button>
              </motion.div>

              {/* User Account */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="glass rounded-xl relative group hidden sm:flex"
                >
                  <User className="h-5 w-5" />
                  <div className="absolute inset-0 bg-gradient-kledje opacity-0 group-hover:opacity-10 rounded-xl transition-opacity" />
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Special Offer Banner */}
          {!isScrolled && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="py-2 text-center"
            >
              <div className="inline-flex items-center gap-2 bg-gradient-coral text-white px-4 py-1.5 rounded-full text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                خصم 25% على بوكس العروسة + توصيل مجاني
                <Gift className="h-4 w-4" />
              </div>
            </motion.div>
          )}
        </div>
      </motion.header>

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[80] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default ModernHeader;
