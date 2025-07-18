"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Filter,
  Heart,
  User,
  Calendar,
  CheckCircle,
  Award,
  Sparkles,
  Camera,
  Play,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  helpful: number;
  notHelpful: number;
  images?: string[];
  videoUrl?: string;
  skinType?: string;
  productUsageDuration?: string;
  recommendation: boolean;
}

interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: { rating: number; count: number; percentage: number }[];
  verifiedPurchases: number;
}

interface CustomerReviewsProps {
  productId: string;
  reviews: Review[];
  stats: ReviewStats;
  onWriteReview?: () => void;
  onHelpfulVote?: (reviewId: string, helpful: boolean) => void;
}

const StarRating = ({
  rating,
  size = "sm",
  interactive = false,
  onRatingChange,
}: {
  rating: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const sizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          whileHover={interactive ? { scale: 1.2 } : {}}
          whileTap={interactive ? { scale: 0.9 } : {}}
          onClick={() => interactive && onRatingChange?.(star)}
          onMouseEnter={() => interactive && setHoverRating(star)}
          onMouseLeave={() => interactive && setHoverRating(0)}
          disabled={!interactive}
          className={`${interactive ? "cursor-pointer" : "cursor-default"} transition-colors`}
        >
          <Star
            className={`${sizes[size]} ${
              star <= (hoverRating || rating)
                ? "text-yellow-400 fill-current"
                : "text-gray-300"
            }`}
          />
        </motion.button>
      ))}
    </div>
  );
};

const ReviewCard = ({
  review,
  onHelpfulVote,
}: {
  review: Review;
  onHelpfulVote?: (reviewId: string, helpful: boolean) => void;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullContent, setShowFullContent] = useState(false);
  const [userVote, setUserVote] = useState<"helpful" | "not-helpful" | null>(
    null,
  );

  const handleVote = (helpful: boolean) => {
    const newVote = helpful ? "helpful" : "not-helpful";
    setUserVote(userVote === newVote ? null : newVote);
    onHelpfulVote?.(review.id, helpful);
  };

  const nextImage = () => {
    if (review.images) {
      setCurrentImageIndex((prev) => (prev + 1) % review.images.length);
    }
  };

  const prevImage = () => {
    if (review.images) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + review.images.length) % review.images.length,
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12 ring-2 ring-kledje-100">
                <AvatarImage src={review.userAvatar} />
                <AvatarFallback className="bg-gradient-kledje text-white font-bold">
                  {review.userName.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-900">
                    {review.userName}
                  </span>
                  {review.verified && (
                    <Badge className="bg-green-100 text-green-700 text-xs px-2 py-0.5">
                      <CheckCircle className="w-3 h-3 ml-1" />
                      مشتري موثق
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{review.date}</span>
                  </div>
                  {review.skinType && (
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>بشرة {review.skinType}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <StarRating rating={review.rating} size="md" />
              {review.recommendation && (
                <Badge className="bg-kledje-100 text-kledje-700 text-xs">
                  <Award className="w-3 h-3 ml-1" />
                  يُنصح به
                </Badge>
              )}
            </div>
          </div>

          {/* Review Content */}
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-2 text-lg">
              {review.title}
            </h4>
            <div className="text-gray-700 leading-relaxed">
              {showFullContent ? (
                <p>{review.content}</p>
              ) : (
                <p>
                  {review.content.length > 200
                    ? `${review.content.substring(0, 200)}...`
                    : review.content}
                </p>
              )}
              {review.content.length > 200 && (
                <button
                  onClick={() => setShowFullContent(!showFullContent)}
                  className="text-kledje-600 hover:text-kledje-700 font-medium mt-2 inline-block"
                >
                  {showFullContent ? "عرض أقل" : "عرض المزيد"}
                </button>
              )}
            </div>

            {review.productUsageDuration && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">
                  مدة الاستخدام: {review.productUsageDuration}
                </span>
              </div>
            )}
          </div>

          {/* Media Content */}
          {(review.images || review.videoUrl) && (
            <div className="mb-4">
              {review.images && review.images.length > 0 && (
                <div className="relative">
                  <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden relative">
                    <img
                      src={review.images[currentImageIndex]}
                      alt={`Review image ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />

                    {review.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>

                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                          {review.images.map((_, index) => (
                            <div
                              key={index}
                              className={`w-2 h-2 rounded-full ${
                                index === currentImageIndex
                                  ? "bg-white"
                                  : "bg-white/50"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}

                    <Badge className="absolute top-2 right-2 bg-black/50 text-white border-0">
                      <Camera className="w-3 h-3 ml-1" />
                      {review.images.length} صور
                    </Badge>
                  </div>
                </div>
              )}

              {review.videoUrl && (
                <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden relative mt-4">
                  <video
                    src={review.videoUrl}
                    poster="/placeholder-video.jpg"
                    controls
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-black/50 text-white border-0">
                    <Play className="w-3 h-3 ml-1" />
                    فيديو
                  </Badge>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleVote(true)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  userVote === "helpful"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span className="text-sm">مفيد ({review.helpful})</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleVote(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  userVote === "not-helpful"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <ThumbsDown className="w-4 h-4" />
                <span className="text-sm">غير مفيد ({review.notHelpful})</span>
              </motion.button>
            </div>

            <Button variant="ghost" size="sm" className="text-gray-500">
              <MessageCircle className="w-4 h-4 ml-2" />
              رد
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ReviewStats = ({ stats }: { stats: ReviewStats }) => {
  return (
    <div className="grid md:grid-cols-2 gap-8 mb-8">
      {/* Overall Rating */}
      <Card className="text-center p-8 bg-gradient-to-br from-kledje-50 to-coral-50">
        <div className="mb-4">
          <div className="text-6xl font-bold text-kledje-600 mb-2">
            {stats.averageRating.toFixed(1)}
          </div>
          <StarRating rating={stats.averageRating} size="lg" />
          <p className="text-gray-600 mt-2">
            بناءً على {stats.totalReviews} تقييم
          </p>
          <Badge className="mt-3 bg-green-100 text-green-700">
            <CheckCircle className="w-4 h-4 ml-1" />
            {stats.verifiedPurchases} مشتري موثق
          </Badge>
        </div>
      </Card>

      {/* Rating Distribution */}
      <Card className="p-6">
        <h3 className="font-bold text-lg mb-4">توزيع التقييمات</h3>
        <div className="space-y-3">
          {stats.ratingDistribution.map((dist) => (
            <div key={dist.rating} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-16">
                <span className="text-sm font-medium">{dist.rating}</span>
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${dist.percentage}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full bg-gradient-kledje rounded-full"
                />
              </div>
              <span className="text-sm text-gray-600 w-12">{dist.count}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

const CustomerReviews = ({
  productId,
  reviews,
  stats,
  onWriteReview,
  onHelpfulVote,
}: CustomerReviewsProps) => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const filters = [
    { id: "all", label: "جميع التقييمات", count: reviews.length },
    {
      id: "5",
      label: "5 نجوم",
      count: reviews.filter((r) => r.rating === 5).length,
    },
    {
      id: "4",
      label: "4 نجوم",
      count: reviews.filter((r) => r.rating === 4).length,
    },
    {
      id: "with-images",
      label: "مع صور",
      count: reviews.filter((r) => r.images && r.images.length > 0).length,
    },
    {
      id: "verified",
      label: "مشتري موثق",
      count: reviews.filter((r) => r.verified).length,
    },
  ];

  const sortOptions = [
    { id: "newest", label: "الأحدث" },
    { id: "oldest", label: "الأقدم" },
    { id: "highest", label: "أعلى تقييم" },
    { id: "lowest", label: "أقل تقييم" },
    { id: "helpful", label: "الأكثر فائدة" },
  ];

  const filteredReviews = reviews.filter((review) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "5" || selectedFilter === "4") {
      return review.rating === parseInt(selectedFilter);
    }
    if (selectedFilter === "with-images") {
      return review.images && review.images.length > 0;
    }
    if (selectedFilter === "verified") {
      return review.verified;
    }
    return true;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      case "helpful":
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            تقييمات العملاء
          </h2>
          <p className="text-lg text-gray-600">
            اقرئي تجارب العملاء الحقيقية مع المنتج
          </p>
        </div>

        {onWriteReview && (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={onWriteReview}
              className="bg-gradient-kledje text-white px-8 py-3 text-lg rounded-xl shadow-lg"
            >
              <Sparkles className="w-5 h-5 ml-2" />
              اكتبي تقييمك
            </Button>
          </motion.div>
        )}
      </div>

      {/* Stats */}
      <ReviewStats stats={stats} />

      {/* Filters & Sort */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-6 bg-white rounded-2xl shadow-sm border">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-xl transition-all ${
                selectedFilter === filter.id
                  ? "bg-kledje-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-gray-300 rounded-xl px-4 py-2 text-gray-700 focus:ring-2 focus:ring-kledje-500 focus:border-transparent"
          >
            {sortOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-kledje-100 to-coral-100 rounded-full flex items-center justify-center">
              <MessageCircle className="h-12 w-12 text-kledje-400" />
            </div>
            <h3 className="text-2xl font-medium text-gray-900 mb-2">
              لا توجد تقييمات
            </h3>
            <p className="text-gray-500 mb-6">كوني أول من يقيم هذا المنتج</p>
            {onWriteReview && (
              <Button
                onClick={onWriteReview}
                className="bg-gradient-kledje text-white"
              >
                اكتبي تقييمك الآن
              </Button>
            )}
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {sortedReviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onHelpfulVote={onHelpfulVote}
              />
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Load More */}
      {sortedReviews.length > 0 && sortedReviews.length < reviews.length && (
        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="px-8 py-3 text-lg rounded-xl border-kledje-300 text-kledje-600 hover:bg-kledje-50"
          >
            عرض المزيد من التقييمات
          </Button>
        </div>
      )}
    </div>
  );
};

export default CustomerReviews;
