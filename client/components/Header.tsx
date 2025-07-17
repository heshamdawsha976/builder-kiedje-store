import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, Search, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useCartStore } from "../store/cart";
import { Cart } from "./Cart";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toggleCart, getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  const navItems = [
    { href: "/", label: "الرئيسية", labelEn: "Home" },
    { href: "/products", label: "المنتجات", labelEn: "Products" },
    { href: "/about", label: "من نحن", labelEn: "About" },
    { href: "/contact", label: "تواصل معنا", labelEn: "Contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Cart & Wishlist */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="relative"
                onClick={toggleCart}
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -left-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-brand-500 text-white text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="sm">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-gray-700 hover:text-brand-600 transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className="text-2xl font-bold text-gradient">كليديج</div>
              <div className="text-sm text-gray-500 mr-2">Klydij</div>
            </Link>

            {/* Search & Mobile Menu */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <Search className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100"
            >
              <nav className="container mx-auto px-4 py-4 space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="block text-gray-700 hover:text-brand-600 transition-colors font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-3 border-t border-gray-100">
                  <Button variant="ghost" className="w-full justify-start">
                    <Search className="h-5 w-5 ml-2" />
                    البحث
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <Cart />
    </>
  );
}
