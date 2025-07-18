import { Product } from "../store/cart";

// منتجات كليج الجديدة مع الصور المرفقة
export const products: Product[] = [
  {
    id: "1",
    name: "كريم مخمرية للوجه",
    nameAr: "كريم مخمرية للوجه",
    description:
      "كريم طبيعي مخمر للوجه يحتوي على البيسوولك والماكنيز والسيرامايد لترطيب عميق وتجديد البشرة",
    descriptionAr:
      "كريم طبيعي مخمر للوجه يحتوي على البيسوولك والماكنيز والسيرامايد لترطيب عميق وتجديد البشرة",
    price: 150,
    originalPrice: 200,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fec4ae7314ee64f3081bd38c6ef00b7df%2F7a885a24c7e54403b735ab61519a4b3d?format=webp&width=800",
    category: "face-care",
    inStock: true,
    featured: true,
    ingredients: ["البيسوولك", "الماكنيز", "السيرامايد", "مستخلصات طبيعية"],
    benefits: [
      "ترطيب عميق",
      "تجديد البشرة",
      "مكافحة علامات التقدم",
      "تنعيم البشرة",
    ],
    skinType: ["جافة", "عادية", "مختلطة"],
    rating: 4.8,
    reviewCount: 245,
    tags: ["طبيعي", "مضاد للأكسدة", "مرطب"],
  },
  {
    id: "2",
    name: "كريم مزيل العرق",
    nameAr: "كريم مزيل العرق",
    description:
      "كريم طبيعي مزيل للعرق آمن وفعال لحماية طويلة الأمد مع رائحة منعشة",
    descriptionAr:
      "كريم طبيعي مزيل للعرق آمن وفعال لحماية طويلة الأمد مع رائحة منعشة",
    price: 80,
    originalPrice: 100,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fec4ae7314ee64f3081bd38c6ef00b7df%2Fa035da9c93824b8eb95dfaab87d9f08a?format=webp&width=800",
    category: "body-care",
    inStock: true,
    featured: true,
    ingredients: ["مستخلصات طبيعية", "زيوت عطرية", "مكونات مضادة للبكتيريا"],
    benefits: [
      "حماية 24 ساعة",
      "آمن على البشرة",
      "رائحة منعشة",
      "لا يسبب تهيج",
    ],
    skinType: ["جميع أنواع البشرة"],
    rating: 4.6,
    reviewCount: 189,
    tags: ["طبيعي", "آمن", "مضاد للبكتيريا"],
  },
  {
    id: "3",
    name: "كريم الشعر بزيت الجوجوبا",
    nameAr: "كريم الشعر بزيت الجوجوبا",
    description:
      "كريم مغذي للشعر بزيت الجوجوبا الطبيعي لترطيب وتقوية الشعر وإضافة لمعان طبيعي",
    descriptionAr:
      "كريم مغذي للشعر بزيت الجوجوبا الطبيعي لترطيب وتقوية الشعر وإضافة لمعان طبيعي",
    price: 120,
    originalPrice: 160,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fec4ae7314ee64f3081bd38c6ef00b7df%2F7b3b23bf7f46460b889ed51a6eb0283f?format=webp&width=800",
    category: "hair-care",
    inStock: true,
    featured: true,
    ingredients: [
      "زيت الجوجوبا",
      "بروتينات طبيعية",
      "فيتامين E",
      "مستخلصات نباتية",
    ],
    benefits: ["ترطيب عميق", "تقوية الشعر", "لمعان طبيعي", "حماية من التكسر"],
    skinType: ["جميع أنواع الشعر"],
    rating: 4.9,
    reviewCount: 312,
    tags: ["طبيعي", "مغذي", "مرطب"],
  },
  {
    id: "4",
    name: "كريم القدمين المغذي",
    nameAr: "كريم القدمين المغذي",
    description:
      "كريم متخصص لتنعيم وترطيب القدمين مع مكونات طبيعية لإصلاح التشققات",
    descriptionAr:
      "كريم متخصص لتنعيم وترطيب القدمين مع مكونات طبيعية لإصلاح التشققات",
    price: 90,
    originalPrice: 120,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fec4ae7314ee64f3081bd38c6ef00b7df%2F2fe8f9804b17463b9e6cd19fb18c2e4b?format=webp&width=800",
    category: "foot-care",
    inStock: true,
    featured: false,
    ingredients: ["زبدة الشيا", "زيت الأرجان", "اليوريا", "مستخلصات مهدئة"],
    benefits: ["إصلاح التشققات", "ترطيب مكثف", "تنعيم فوري", "حماية دائمة"],
    skinType: ["جميع أنواع البشرة"],
    rating: 4.7,
    reviewCount: 156,
    tags: ["مرطب", "مصلح", "مهدئ"],
  },
  {
    id: "5",
    name: "كريم ما بعد الحلاقة",
    nameAr: "كريم ما بعد الحلاقة",
    description: "كريم مهدئ وملطف للبشرة بعد الحلاقة يمنع التهيج ويرطب البشرة",
    descriptionAr:
      "كريم مهدئ وملطف للبشرة بعد الحلاقة يمنع التهيج ويرطب البشرة",
    price: 85,
    originalPrice: 110,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fec4ae7314ee64f3081bd38c6ef00b7df%2Ff5314579ca1a49a7b0e9a56cc6047a94?format=webp&width=800",
    category: "face-care",
    inStock: true,
    featured: false,
    ingredients: ["الألوة فيرا", "البابونج", "زيت جوز الهند", "فيتامين B5"],
    benefits: ["تهدئة فورية", "منع التهيج", "ترطيب مكثف", "تبريد البشرة"],
    skinType: ["حساسة", "عادية", "جافة"],
    rating: 4.5,
    reviewCount: 98,
    tags: ["مهدئ", "مرطب", "مضاد للالتهاب"],
  },
];

// بوكس العرو��ة - مجموعة منتجات مختارة
export const brideBox = {
  id: "bride-box",
  name: "بوكس العروسة من كليج",
  nameAr: "بوكس العروسة من كليج",
  description:
    "مجموعة متكاملة من منتجات العناية للعروس تحتوي على كريمات متنوعة لجميع احتياجات البشرة",
  descriptionAr:
    "مجموعة متكاملة من منتجات العناية للعروس تحتوي على كريمات متنوعة لجميع احتياجات البشرة",
  price: 450,
  originalPrice: 600,
  image:
    "https://cdn.builder.io/api/v1/image/assets%2Fec4ae7314ee64f3081bd38c6ef00b7df%2Fb7629eece34d4448a031ef76199bc3f1?format=webp&width=800",
  category: "gift-sets",
  inStock: true,
  featured: true,
  contents: [
    "زبدة الليمون الطبيعية والإصلاح الملكي",
    "مخمرية وكريم معطر للشعر بالباثتنول والجلاجوبا",
    "كريم تعطير الأماكن الحساسة",
    "الهنف شيخا مع زبدة السعد",
    "البكنيكا لباتر البرتقالي العلاجي والتجميلي",
    "مخمرية بروائح مميزة نائمة",
    "كريم مزيل العرق وملطف الثدر آرم",
    "كريم التقريد للقدمين وأي مكان خلية تدريج",
    "زدي سبيادش شيخري وجليلة واسدة علي حسب اختياتك",
  ],
  benefits: [
    "حزمة شاملة للعناية",
    "منتجات طبيعية 100%",
    "مناسبة للعروس",
    "وفر 25% عن الشراء المنفصل",
    "تغليف هدايا فاخر",
  ],
  rating: 4.9,
  reviewCount: 67,
  tags: ["هدية", "مجموعة", "عروسة", "طبيعي"],
};

export const categories = [
  { id: "all", name: "All Products", nameAr: "جميع المنتجات" },
  { id: "face-care", name: "Face Care", nameAr: "العناية بالوجه" },
  { id: "body-care", name: "Body Care", nameAr: "العناية بالجسم" },
  { id: "hair-care", name: "Hair Care", nameAr: "العناية بالشعر" },
  { id: "foot-care", name: "Foot Care", nameAr: "العناية بالقدمين" },
  { id: "gift-sets", name: "Gift Sets", nameAr: "مجموعات الهدايا" },
];

// المكونات الطبيعية المميزة
export const featuredIngredients = [
  {
    id: "jojoba",
    name: "زيت الجوجوبا",
    nameEn: "Jojoba Oil",
    description: "زيت طبيعي مغذي ��مرطب للشعر والبشرة",
    benefits: ["ترطيب عميق", "تقوية الشعر", "مضاد للأكسدة"],
    image: "/ingredients/jojoba.jpg",
  },
  {
    id: "shea-butter",
    name: "زبدة الشيا",
    nameEn: "Shea Butter",
    description: "زبدة طبيعية فائقة الترطيب للبشرة الجافة",
    benefits: ["ترطيب مكثف", "تهدئة البشرة", "مضاد للالتهاب"],
    image: "/ingredients/shea.jpg",
  },
  {
    id: "argan",
    name: "زيت الأرجان",
    nameEn: "Argan Oil",
    description: "زيت مغربي فاخر للعناية بالبشرة والشعر",
    benefits: ["تجديد البشرة", "لمعان طبيعي", "مضاد الشيخوخة"],
    image: "/ingredients/argan.jpg",
  },
];

// نصائح العناية
export const skincareTips = [
  {
    id: "morning-routine",
    title: "روتين الصباح",
    description: "تنظيف لطيف، ترطيب، حماية من الشمس",
    steps: ["تنظيف", "تونر", "مرطب", "واقي شمس"],
  },
  {
    id: "evening-routine",
    title: "روتين المساء",
    description: "تنظيف عميق، تجديد، ترطيب مكثف",
    steps: ["إز��لة المكياج", "تنظيف", "سيروم", "مرطب ليلي"],
  },
  {
    id: "weekly-care",
    title: "العناية الأسبوعية",
    description: "تقشير لطيف وماسكات مغذية",
    steps: ["تقشير", "ماسك", "ترطيب عميق", "تدليك"],
  },
];
