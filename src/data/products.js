export const FALLBACK_PRODUCT_IMAGE = '/images/products/dairy-fallback.jpg';

export const handleProductImageError = (e) => {
  if (e.currentTarget.dataset.fallbackApplied) return;
  e.currentTarget.dataset.fallbackApplied = 'true';
  e.currentTarget.src = FALLBACK_PRODUCT_IMAGE;
};

export const isCheeseProduct = (item) => {
  if (!item) return false;
  const name = (item.name || '').toLowerCase();
  const category = (item.category || '').toLowerCase();
  // Keep Paneer (cottage cheese) and remove all actual cheese products/categories
  if (name.includes('paneer') || category === 'paneer') return false;
  return name.includes('cheese') || category.includes('cheese');
};

export const parseValidPrice = (value) => {
  const num = Number(value);
  return Number.isFinite(num) && num > 0 ? num : null;
};

export const parseValidQuantity = (value, fallback = 1) => {
  const num = Math.floor(Number(value));
  return Number.isFinite(num) && num >= 1 ? num : fallback;
};

export const initialProducts = [
  {
    id: 'prod-1',
    name: 'Fresh Cow Milk',
    category: 'Fresh Milk',
    unit: '500 ml',
    price: 28,
    originalPrice: 32,
    discount: '12% OFF',
    rating: 4.8,
    reviewsCount: 120,
    inStock: true,
    stock: 248,
    badge: 'Bestseller',
    productType: 'Regular',
    image: '/images/products/fresh-cow-milk.jpg',
    description: 'Pure and fresh cow milk collected daily from our grass-fed cows in Coimbatore. No added preservatives, chemicals, or hormones. Rich in calcium and essential vitamins.',
    sizes: [
      { size: '500 ml', price: 28 },
      { size: '1 Litre', price: 54 },
      { size: '2 Litre', price: 104 }
    ],
    status: 'approved',
    featured: true
  },
  {
    id: 'prod-2',
    name: 'A2 Cow Milk',
    category: 'Fresh Milk',
    unit: '500 ml',
    price: 35,
    originalPrice: 40,
    discount: '12% OFF',
    rating: 4.7,
    reviewsCount: 96,
    inStock: true,
    stock: 120,
    badge: 'A2 Milk',
    productType: 'A2 Milk',
    image: '/images/products/a2-cow-milk.jpg',
    description: 'Indigenous native breed A2 beta-casein cow milk. Easier on the stomach, promotes gut health and overall vitality.',
    sizes: [
      { size: '500 ml', price: 35 },
      { size: '1 Litre', price: 68 }
    ],
    status: 'approved',
    featured: true
  },
  {
    id: 'prod-3',
    name: 'Fresh Buffalo Milk',
    category: 'Fresh Milk',
    unit: '500 ml',
    price: 32,
    originalPrice: 36,
    discount: '11% OFF',
    rating: 4.6,
    reviewsCount: 78,
    inStock: true,
    stock: 95,
    badge: 'Farm Fresh',
    productType: 'Regular',
    image: '/images/products/fresh-buffalo-milk.jpg',
    description: 'Thick, creamy and rich buffalo milk with high fat percentage. Perfect for homemade tea, thick curds, and authentic sweets.',
    sizes: [
      { size: '500 ml', price: 32 },
      { size: '1 Litre', price: 62 }
    ],
    status: 'approved',
    featured: false
  },
  {
    id: 'prod-4',
    name: 'Fresh Paneer',
    category: 'Paneer',
    unit: '200 g',
    price: 120,
    originalPrice: 140,
    discount: '14% OFF',
    rating: 4.9,
    reviewsCount: 80,
    inStock: true,
    stock: 86,
    badge: 'Fresh',
    productType: 'Regular',
    image: '/images/products/fresh-paneer.jpg',
    description: 'Velvety soft, melt-in-mouth cottage paneer crafted from fresh whole milk within 4 hours of milking. Zero cornstarch or additives.',
    sizes: [
      { size: '200 g', price: 120 },
      { size: '500 g', price: 280 }
    ],
    status: 'approved',
    featured: true
  },
  {
    id: 'prod-5',
    name: 'Fresh Curd',
    category: 'Curd',
    unit: '200 g',
    price: 40,
    originalPrice: 45,
    discount: '11% OFF',
    rating: 4.6,
    reviewsCount: 64,
    inStock: true,
    stock: 62,
    badge: 'Natural',
    productType: 'Regular',
    image: '/images/products/fresh-curd.jpg',
    description: 'Traditional set curd prepared with live active probiotic cultures. Creamy, mildly sour, and cooling for digestion.',
    sizes: [
      { size: '200 g', price: 40 },
      { size: '500 g', price: 75 }
    ],
    status: 'approved',
    featured: true
  },
  {
    id: 'prod-6',
    name: 'Pure Cow Ghee',
    category: 'Ghee',
    unit: '500 g',
    price: 480,
    originalPrice: 550,
    discount: '13% OFF',
    rating: 4.8,
    reviewsCount: 52,
    inStock: true,
    stock: 28,
    badge: 'Pure',
    productType: 'Organic',
    image: '/images/products/pure-cow-ghee.jpg',
    description: 'Golden, aromatic bilona-churned cow ghee made from cultured butter. Granular texture with divine traditional aroma.',
    sizes: [
      { size: '200 g', price: 210 },
      { size: '500 g', price: 480 },
      { size: '1 kg', price: 920 }
    ],
    status: 'approved',
    featured: true
  },
  {
    id: 'prod-7',
    name: 'Fresh Butter',
    category: 'Butter',
    unit: '500 g',
    price: 220,
    originalPrice: 250,
    discount: '12% OFF',
    rating: 4.6,
    reviewsCount: 38,
    inStock: true,
    stock: 45,
    badge: 'Creamy',
    productType: 'Regular',
    image: '/images/products/fresh-butter.jpg',
    description: 'Unsalted traditional farm butter churned from cultured fresh cream. Pale yellow, rich and deeply nourishing.',
    sizes: [
      { size: '200 g', price: 95 },
      { size: '500 g', price: 220 }
    ],
    status: 'approved',
    featured: true
  },
  {
    id: 'prod-8',
    name: 'Chocolate Milk',
    category: 'Flavored Milk',
    unit: '200 ml',
    price: 35,
    originalPrice: 40,
    discount: '12% OFF',
    rating: 4.5,
    reviewsCount: 72,
    inStock: true,
    stock: 60,
    badge: 'Popular',
    productType: 'Regular',
    image: '/images/products/chocolate-milk.jpg',
    description: 'Real cocoa blended with fresh double-toned farm milk. Lightly sweetened with unrefined cane sugar. Kids love it!',
    sizes: [
      { size: '200 ml', price: 35 }
    ],
    status: 'approved',
    featured: false
  },
  {
    id: 'prod-9',
    name: 'Strawberry Milk',
    category: 'Flavored Milk',
    unit: '200 ml',
    price: 35,
    originalPrice: 40,
    discount: '12% OFF',
    rating: 4.5,
    reviewsCount: 41,
    inStock: true,
    stock: 55,
    badge: 'New',
    productType: 'Regular',
    image: '/images/products/strawberry-milk.jpg',
    description: 'Sweet and fruity strawberry extract paired with wholesome fresh milk. A refreshing chilled treat.',
    sizes: [
      { size: '200 ml', price: 35 }
    ],
    status: 'approved',
    featured: false
  },
  {
    id: 'prod-10',
    name: 'Badam Milk',
    category: 'Flavored Milk',
    unit: '200 ml',
    price: 40,
    originalPrice: 45,
    discount: '11% OFF',
    rating: 4.7,
    reviewsCount: 33,
    inStock: true,
    stock: 40,
    badge: 'Bestseller',
    productType: 'Regular',
    image: '/images/products/badam-milk.jpg',
    description: 'Enriched with real California almond flakes, pure saffron strands, and green cardamom. Served chilled.',
    sizes: [
      { size: '200 ml', price: 40 }
    ],
    status: 'approved',
    featured: false
  },
  {
    id: 'prod-11',
    name: 'Organic Milk',
    category: 'Fresh Milk',
    unit: '1 L',
    price: 65,
    originalPrice: 75,
    discount: '13% OFF',
    rating: 4.9,
    reviewsCount: 110,
    inStock: true,
    stock: 80,
    badge: 'Organic',
    productType: 'Organic',
    image: '/images/products/organic-milk.jpg',
    description: 'Certified 100% organic farm milk from free-range pastured cows. Fed organic clover, lucerne and natural fodder.',
    sizes: [
      { size: '1 L', price: 65 },
      { size: '2 L', price: 125 }
    ],
    status: 'approved',
    featured: true
  },
  {
    id: 'prod-12',
    name: 'Fresh Buttermilk',
    category: 'Other Products',
    unit: '500 ml',
    price: 25,
    originalPrice: 30,
    discount: '17% OFF',
    rating: 4.7,
    reviewsCount: 56,
    inStock: true,
    stock: 76,
    badge: 'Refreshing',
    productType: 'Regular',
    image: '/images/products/fresh-buttermilk.jpg',
    description: 'Traditional spiced buttermilk tempered with fresh ginger, green chillies, curry leaves, and a pinch of asafoetida.',
    sizes: [
      { size: '500 ml', price: 25 },
      { size: '1 L', price: 45 }
    ],
    status: 'approved',
    featured: false
  },
  {
    id: 'prod-14',
    name: 'Milk Cream',
    category: 'Other Products',
    unit: '250 ml',
    price: 80,
    originalPrice: 95,
    discount: '16% OFF',
    rating: 4.6,
    reviewsCount: 29,
    inStock: true,
    stock: 42,
    badge: 'Rich',
    productType: 'Regular',
    image: '/images/products/milk-cream.jpg',
    description: 'Thick pasteurized malai / cream skimmed from morning whole milk. Great for gravies, coffees, and whipping desserts.',
    sizes: [
      { size: '250 ml', price: 80 }
    ],
    status: 'approved',
    featured: false
  },
  {
    id: 'prod-15',
    name: 'Dairy Combo Pack',
    category: 'Other Products',
    unit: '1 Pack',
    price: 299,
    originalPrice: 350,
    discount: '15% OFF',
    rating: 4.8,
    reviewsCount: 27,
    inStock: true,
    stock: 25,
    badge: 'Value Pack',
    productType: 'Regular',
    image: '/images/products/dairy-combo-pack.jpg',
    description: 'Ultimate family breakfast combo: 1L Fresh Cow Milk + 200g Fresh Paneer + 200g Set Curd + 100g Salted Butter.',
    sizes: [
      { size: '1 Pack', price: 299 }
    ],
    status: 'approved',
    featured: true
  }
];

export const productCategories = [
  { id: 'all', name: 'All Products', count: 14, icon: 'LayoutGrid' },
  { id: 'fresh-milk', name: 'Fresh Milk', count: 4, icon: 'Milk' },
  { id: 'paneer', name: 'Paneer', count: 1, icon: 'Box' },
  { id: 'curd', name: 'Curd', count: 1, icon: 'Soup' },
  { id: 'ghee', name: 'Ghee', count: 1, icon: 'Flame' },
  { id: 'butter', name: 'Butter', count: 1, icon: 'Square' },
  { id: 'flavored-milk', name: 'Flavored Milk', count: 3, icon: 'Coffee' },
  { id: 'other-products', name: 'Other Products', count: 3, icon: 'Sparkles' }
];
