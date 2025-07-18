"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  Star,
  Heart,
  ShoppingBag,
  Share2,
  Truck,
  Shield,
  Award,
  Leaf,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Eye,
  MessageCircle,
  Info,
  CheckCircle,
  Gift,
  Sparkles,
  Crown,
  Zap,
  ArrowLeft,
  Camera,
  Play,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomerReviews from "@/components/ui/customer-reviews";
import { KledjeNotifications } from "@/components/ui/notification-system";

// Sample product data - في التطبيق الحقيقي ستأتي من API
const productData = {
  id: "kledje-face-cream-01",
  name: "كريم مخمرية للوجه الطبيعي",
  shortDescription: "كريم طبيعي مخمر للوجه بتقنية متطورة",
  description:
    "كريم مخمرية للوجه من كليدج هو منتج طبيعي 100% مصمم خصيصاً للعناية بالبشرة العربية. يحتوي على مكونات مخمرة طبيعية تساعد على تجديد خلايا البشرة وترطيبها بعمق.",
  price: 150,
  originalPrice: 200,
  images: [
    "https://cdn.builder.io/api/v1/image/assets%2Fec4ae7314ee64f3081bd38c6ef00b7df%2F7a885a24c7e54403b735ab61519a4b3d?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2Fec4ae7314ee64f3081bd38c6ef00b7df%2Fa035da9c93824b8eb95dfaab87d9f08a?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2Fec4ae7314ee64f3081bd38c6ef00b7df%2F7b3b23bf7f46460b889ed51a6eb0283f?format=webp&width=800",
  ],
  rating: 4.8,
  reviewCount: 245,
  inStock: true,
  category: "العناية بالوجه",
  sku: "KLD-FC-001",
  ingredients: [
    "مستخلصات مخمرة طبيعية",
    "حمض الهيالورونيك",
    "فيتامين E",
    "زيت الأرجان المغربي",
    "مستخلص الألوة فيرا",
    "البيبتيدات الطبيعية",
  ],
  benefits: [
    "ترطيب عميق يدوم 24 ساعة",
    "تجديد خلايا البشرة",
    "تحسين ملمس البشرة ونعومتها",
    "تقليل ظهور الخطوط الدقيقة",
    "إشراق طبيعي للبشرة",
    "حماية من العوامل البيئية",
  ],
  skinTypes: ["جافة", "عادية", "مختلطة", "حساسة"],
  howToUse: [
    "نظفي وجهك بالمنظف المناسب",
    "ضعي كمية صغيرة من الكريم على أطراف أصابعك",
    "دلكي برفق على الوجه والرقبة بحركات دائرية",
    "استخدمي صباحاً ومساءً للحصول على أفضل النتائج",
    "تجنبي منطقة العينين",
  ],
  features: [
    {
      icon: Leaf,
      title: "100% طبيعي",
      description: "لا يحتوي على مواد كيميائية ضارة",
    },
    {
      icon: Shield,
      title: "مختبر طبياً",
      description: "آمن لجميع أنواع البشرة",
    },
    {
      icon: Award,
      title: "جودة مضمونة",
      description: "ضمان الاسترداد خلال 30 يوم",
    },
    {
      icon: Truck,
      title: "توصيل مجاني",
      description: "للطلبات أكثر من 300 ج.م",
    },
  ],
  relatedProducts: [
    {
      id: "2",
      name: "كريم مزيل العرق",
      price: 80,
      image:
        "https://cdn.builder.io/api/v1/image/assets%2Fec4ae7314ee64f3081bd38c6ef00b7df%2Fa035da9c93824b8eb95dfaab87d9f08a?format=webp&width=800",
      rating: 4.6,
    },
    {
      id: "3",
      name: "كريم الشعر بالجوجوبا",
      price: 120,
      image:
        "https://cdn.builder.io/api/v1/image/assets%2Fec4ae7314ee64f3081bd38c6ef00b7df%2F7b3b23bf7f46460b889ed51a6eb0283f?format=webp&width=800",
      rating: 4.9,
    },
  ],
};

// Sample reviews data
const reviewsData = {
  stats: {
    averageRating: 4.8,
    totalReviews: 245,
    ratingDistribution: [
      { rating: 5, count: 180, percentage: 73 },
      { rating: 4, count: 45, percentage: 18 },
      { rating: 3, count: 15, percentage: 6 },
      { rating: 2, count: 3, percentage: 2 },
      { rating: 1, count: 2, percentage: 1 },
    ],
    verifiedPurchases: 210,
  },
  reviews: [
    {
      id: "1",
      userName: "سارة أحمد",
      userAvatar: "",
      rating: 5,
      title: "منتج رائع ونتائج مذهلة!",
      content:
        "استخدمت هذا الكريم لمدة شهر والنتائج كانت أكثر من رائعة. بشرتي أصبحت أكثر نعومة وإشراقاً. أنصح به كل امرأة تريد العناية الطبيعية.",
      date: "2024-01-15",
      verified: true,
      helpful: 45,
      notHelpful: 2,
      images: [
        "https://cdn.builder.io/api/v1/image/assets%2Fec4ae7314ee64f3081bd38c6ef00b7df%2F7a885a24c7e54403b735ab61519a4b3d?format=webp&width=400",
      ],
      skinType: "مختلطة",
      productUsageDuration: "شهر واحد",
      recommendation: true,
    },
    {
      id: "2",
      userName: "نور محمد",
      userAvatar: "",
      rating: 5,
      title: "أفضل كريم جربته!",
      content:
        "كريم ممتاز، ملمسه ناعم وغير دهني. يمتص بسرعة ولا يترك أي أثر لزج. رائحته جميلة وطبيعية.",
      date: "2024-01-10",
      verified: true,
      helpful: 32,
      notHelpful: 1,
      skinType: "جافة",
      productUsageDuration: "3 أسابيع",
      recommendation: true,
    },
  ],
};

const ProductImageGallery = ({
  images,
  productName,
}: {
  images: string[];
  productName: string;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gradient-to-br from-kledje-50 to-coral-50 rounded-3xl overflow-hidden shadow-2xl">
        <motion.img
          key={currentImageIndex}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: isZoomed ? 1.5 : 1 }}
          transition={{ duration: 0.5 }}
          src={images[currentImageIndex]}
          alt={productName}
          className="w-full h-full object-cover cursor-zoom-in"
          onClick={() => setIsZoomed(!isZoomed)}
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white"
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white"
            >
              <ChevronRight className="h-6 w-6" />
            </motion.button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {currentImageIndex + 1} / {images.length}
        </div>

        {/* Zoom Indicator */}
        <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-gray-600">
          <Eye className="h-4 w-4 inline ml-1" />
          انقري للتكبير
        </div>
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentImageIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                index === currentImageIndex
                  ? "border-kledje-500 shadow-lg"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <img
                src={image}
                alt={`${productName} - صورة ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
};

const ProductInfo = ({ product }: { product: typeof productData }) => {
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [selectedSize, setSelectedSize] = useState("50ml");

  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );

  const sizes = [
    { size: "30ml", price: product.price - 30, popular: false },
    { size: "50ml", price: product.price, popular: true },
    { size: "100ml", price: product.price + 50, popular: false },
  ];

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-kledje-600">
          الرئيسية
        </Link>
        <ChevronLeft className="h-4 w-4" />
        <Link href="/products" className="hover:text-kledje-600">
          المنتجات
        </Link>
        <ChevronLeft className="h-4 w-4" />
        <span className="text-kledje-600">{product.category}</span>
      </nav>

      {/* Product Title & Rating */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Badge className="bg-gradient-coral text-white">
            <Crown className="w-4 h-4 ml-1" />
            منتج مميز
          </Badge>
          <Badge className="bg-green-100 text-green-700">
            <Leaf className="w-4 h-4 ml-1" />
            طبيعي 100%
          </Badge>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {product.name}
        </h1>
        <p className="text-xl text-gray-600 mb-4">{product.shortDescription}</p>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.floor(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="font-medium text-lg">{product.rating}</span>
            <span className="text-gray-500">({product.reviewCount} تقييم)</span>
          </div>

          <Badge
            className={
              product.inStock
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }
          >
            {product.inStock ? "متوفر في المخزن" : "نفد المخزون"}
          </Badge>
        </div>
      </div>

      {/* Price */}
      <div className="p-6 bg-gradient-to-r from-kledje-50 to-coral-50 rounded-2xl">
        <div className="flex items-center gap-4 mb-2">
          <span className="text-4xl font-bold text-kledje-600">
            {selectedSize === "30ml"
              ? product.price - 30
              : selectedSize === "50ml"
                ? product.price
                : product.price + 50}{" "}
            ج.م
          </span>
          <span className="text-2xl text-gray-500 line-through">
            {product.originalPrice} ج.م
          </span>
          <Badge className="bg-gradient-coral text-white px-3 py-1">
            خصم {discountPercentage}%
          </Badge>
        </div>
        <p className="text-green-600 font-medium">
          وفر {product.originalPrice - product.price} ج.م • توصيل مجاني
        </p>
      </div>

      {/* Size Selection */}
      <div>
        <h3 className="font-bold text-lg mb-4">اختاري الحجم:</h3>
        <div className="grid grid-cols-3 gap-3">
          {sizes.map((sizeOption) => (
            <motion.button
              key={sizeOption.size}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedSize(sizeOption.size)}
              className={`relative p-4 rounded-xl border-2 transition-all ${
                selectedSize === sizeOption.size
                  ? "border-kledje-500 bg-kledje-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="text-lg font-bold">{sizeOption.size}</div>
              <div className="text-kledje-600 font-medium">
                {sizeOption.price} ج.م
              </div>
              {sizeOption.popular && (
                <Badge className="absolute -top-2 -right-2 bg-gradient-teal text-white text-xs">
                  الأشهر
                </Badge>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-4">
        <span className="font-medium text-lg">الكمية:</span>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
          >
            <Minus className="h-5 w-5" />
          </motion.button>

          <span className="w-16 text-center font-bold text-2xl">
            {quantity}
          </span>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setQuantity(quantity + 1)}
            disabled={!product.inStock}
            className="w-12 h-12 rounded-xl bg-kledje-100 flex items-center justify-center text-kledje-600 hover:bg-kledje-200 disabled:opacity-50"
          >
            <Plus className="h-5 w-5" />
          </motion.button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            disabled={!product.inStock}
            className="w-full bg-gradient-to-r from-kledje-500 to-kledje-600 text-white py-4 text-xl rounded-2xl shadow-lg relative overflow-hidden group"
          >
            <div className="flex items-center justify-center gap-3">
              <ShoppingBag className="h-6 w-6" />
              <span>
                إضافة للسلة -{" "}
                {(selectedSize === "30ml"
                  ? product.price - 30
                  : selectedSize === "50ml"
                    ? product.price
                    : product.price + 50) * quantity}{" "}
                ج.م
              </span>
              <Zap className="h-6 w-6" />
            </div>
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </Button>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={() => setIsInWishlist(!isInWishlist)}
              variant="outline"
              className={`w-full py-3 rounded-xl transition-all ${
                isInWishlist
                  ? "border-red-300 bg-red-50 text-red-600"
                  : "border-gray-300 text-gray-700 hover:border-red-300"
              }`}
            >
              <Heart
                className={`h-5 w-5 ml-2 ${isInWishlist ? "fill-current" : ""}`}
              />
              {isInWishlist ? "في المفضلة" : "إضافة للمفضلة"}
            </Button>
          </motion.div>

          <Button
            variant="outline"
            className="w-full py-3 rounded-xl border-kledje-300 text-kledje-600 hover:bg-kledje-50"
          >
            <Share2 className="h-5 w-5 ml-2" />
            مشاركة
          </Button>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 gap-4">
        {product.features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border"
          >
            <div className="w-10 h-10 bg-gradient-teal rounded-lg flex items-center justify-center">
              <feature.icon className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-medium text-gray-900">{feature.title}</div>
              <div className="text-sm text-gray-600">{feature.description}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Product Info */}
      <div className="p-6 bg-gray-50 rounded-2xl">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">رمز المنتج:</span>
            <span className="font-medium ml-2">{product.sku}</span>
          </div>
          <div>
            <span className="text-gray-600">الفئة:</span>
            <span className="font-medium ml-2">{product.category}</span>
          </div>
          <div>
            <span className="text-gray-600">مناسب لـ:</span>
            <span className="font-medium ml-2">
              {product.skinTypes.join(", ")}
            </span>
          </div>
          <div>
            <span className="text-gray-600">المخزن:</span>
            <span
              className={`font-medium ml-2 ${product.inStock ? "text-green-600" : "text-red-600"}`}
            >
              {product.inStock ? "متوفر" : "نفد المخزون"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ProductDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <div ref={scrollRef} className="min-h-screen pt-24">
      <KledjeNotifications />

      {/* Sticky Progress Header */}
      <motion.div
        style={{ opacity: headerOpacity }}
        className="fixed top-20 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-40"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={productData.images[0]}
                alt={productData.name}
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div>
                <h3 className="font-bold text-gray-900">{productData.name}</h3>
                <p className="text-sm text-gray-600">{productData.price} ج.م</p>
              </div>
            </div>
            <Button className="bg-gradient-kledje text-white">
              <ShoppingBag className="h-4 w-4 ml-2" />
              إضافة للسلة
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        {/* Main Product Section */}
        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ProductImageGallery
              images={productData.images}
              productName={productData.name}
            />
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ProductInfo product={productData} />
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-2xl">
              <TabsTrigger value="description" className="rounded-xl">
                الوصف
              </TabsTrigger>
              <TabsTrigger value="ingredients" className="rounded-xl">
                المكونات
              </TabsTrigger>
              <TabsTrigger value="benefits" className="rounded-xl">
                الفوائد
              </TabsTrigger>
              <TabsTrigger value="usage" className="rounded-xl">
                طريقة الاستخدام
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">وصف المنتج</h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    {productData.description}
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 bg-kledje-50 rounded-xl">
                      <h4 className="font-bold mb-3">مناسب لأنواع البشرة:</h4>
                      <div className="flex flex-wrap gap-2">
                        {productData.skinTypes.map((type) => (
                          <Badge
                            key={type}
                            className="bg-kledje-200 text-kledje-800"
                          >
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="p-6 bg-coral-50 rounded-xl">
                      <h4 className="font-bold mb-3">خصائص المنتج:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>لا يسبب انسداد المسام</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>مختبر من أطباء الجلدية</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>خالي من البارابين</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ingredients" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">المكونات الطبيعية</h3>
                  <div className="grid gap-4">
                    {productData.ingredients.map((ingredient, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-4 p-4 bg-green-50 rounded-xl"
                      >
                        <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                          <Leaf className="h-5 w-5 text-green-600" />
                        </div>
                        <span className="text-green-800 font-medium text-lg">
                          {ingredient}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="benefits" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">الفوائد والنتائج</h3>
                  <div className="grid gap-4">
                    {productData.benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl"
                      >
                        <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">
                          <Sparkles className="h-5 w-5 text-purple-600" />
                        </div>
                        <span className="text-purple-800 font-medium text-lg">
                          {benefit}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="usage" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">طريقة الاستخدام</h3>
                  <div className="space-y-4">
                    {productData.howToUse.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl"
                      >
                        <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-blue-600 font-bold text-sm">
                            {index + 1}
                          </span>
                        </div>
                        <span className="text-blue-800 font-medium text-lg">
                          {step}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 p-6 bg-yellow-50 rounded-xl border border-yellow-200">
                    <div className="flex items-start gap-3">
                      <Info className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-yellow-800 mb-2">
                          نصائح هامة:
                        </h4>
                        <ul className="text-yellow-700 space-y-1">
                          <li>• قومي بعمل اختبار حساسية قبل الاستخدام</li>
                          <li>• استخدمي واقي الشمس عند التعرض لأشعة الشمس</li>
                          <li>• احفظي المنتج في مكان بارد وجاف</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Customer Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <CustomerReviews
            productId={productData.id}
            reviews={reviewsData.reviews}
            stats={reviewsData.stats}
            onWriteReview={() => console.log("Write review")}
            onHelpfulVote={(reviewId, helpful) =>
              console.log("Vote", reviewId, helpful)
            }
          />
        </motion.div>

        {/* Related Products */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              منتجات مشابهة
            </h2>
            <p className="text-xl text-gray-600">قد تعجبك هذه المنتجات أيضاً</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {productData.relatedProducts.map((relatedProduct) => (
              <Card
                key={relatedProduct.id}
                className="overflow-hidden hover-lift"
              >
                <div className="aspect-square bg-gradient-to-br from-kledje-50 to-coral-50">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-2">
                    {relatedProduct.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= Math.floor(relatedProduct.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600">
                      ({relatedProduct.rating})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-kledje-600">
                      {relatedProduct.price} ج.م
                    </span>
                    <Button className="bg-gradient-kledje text-white">
                      <ShoppingBag className="h-4 w-4 ml-2" />
                      إضافة للسلة
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
