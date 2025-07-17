"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
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
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useCartStore } from "@/lib/cart";
import { Cart } from "./Cart";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { toggleCart, getTotalItems } = useCartStore();
  const totalItems = getTotalItems();
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.95]);
  const headerScale = useTransform(scrollY, [0, 100], [1, 0.98]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
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

  return (
    <>
      <motion.header
        style={{ opacity: headerOpacity, scale: headerScale }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass-strong shadow-2xl backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Cart & Actions */}
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative h-12 w-12 rounded-2xl glass hover:bg-gradient-primary hover:text-white transition-all duration-300 group"
                  onClick={toggleCart}
                >
                  <motion.div
                    animate={{ rotate: totalItems > 0 ? [0, 10, -10, 0] : 0 }}
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
                        <Badge className="h-6 w-6 rounded-full p-0 flex items-center justify-center bg-gradient-accent text-white text-sm font-bold border-2 border-white pulse-glow">
                          {totalItems}
                        </Badge>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-12 w-12 rounded-2xl glass hover:bg-gradient-secondary hover:text-white transition-all duration-300"
                >
                  <Heart className="h-6 w-6" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:block"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-12 w-12 rounded-2xl glass hover:bg-gradient-primary hover:text-white transition-all duration-300"
                >
                  <Search className="h-6 w-6" />
                </Button>
              </motion.div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl text-gray-700 hover:text-white hover:bg-gradient-primary transition-all duration-300 font-semibold text-lg glass-effect group"
                  >
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      className="group-hover:text-white"
                    >
                      {item.icon}
                    </motion.div>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              <Link href="/" className="flex items-center gap-3 group">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl font-display text-gradient group-hover:scale-110 transition-transform duration-300"
                >
                  كليدج
                </motion.div>
                <div className="hidden sm:block">
                  <div className="text-lg text-gray-500 group-hover:text-gray-700 transition-colors duration-300 font-modern">
                    Kledje
                  </div>
                  <div className="text-xs text-gray-400 text-center">
                    منتجات طبيعية
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="sm:hidden"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-12 w-12 rounded-2xl glass hover:bg-gradient-primary hover:text-white"
                >
                  <Search className="h-6 w-6" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-12 w-12 rounded-2xl glass hover:bg-gradient-primary hover:text-white transition-all duration-300"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <motion.div
                    animate={{ rotate: isMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isMenuOpen ? (
                      <X className="h-6 w-6" />
                    ) : (
                      <Menu className="h-6 w-6" />
                    )}
                  </motion.div>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="lg:hidden glass-strong border-t border-white/20 overflow-hidden"
            >
              <nav className="container mx-auto px-4 py-6">
                <div className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-4 p-4 rounded-2xl text-gray-700 hover:text-white hover:bg-gradient-primary transition-all duration-300 font-semibold text-lg group"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <motion.div
                          whileHover={{ rotate: 10, scale: 1.1 }}
                          className="group-hover:text-white"
                        >
                          {item.icon}
                        </motion.div>
                        <div>
                          <div>{item.label}</div>
                          <div className="text-sm text-gray-500 group-hover:text-white/70">
                            {item.labelEn}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile Search */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 pt-6 border-t border-white/20"
                >
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="ابحث عن منتج..."
                      className="flex-1 px-4 py-3 rounded-2xl bg-white/80 border-0 text-gray-900 text-right placeholder:text-gray-500"
                      dir="rtl"
                    />
                    <Button className="px-6 py-3 bg-gradient-primary text-white rounded-2xl hover:shadow-lg">
                      <Search className="h-5 w-5" />
                    </Button>
                  </div>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-primary origin-left"
          style={{
            scaleX: useTransform(scrollY, [0, 1000], [0, 1]),
          }}
        />
      </motion.header>

      <Cart />
    </>
  );
}
