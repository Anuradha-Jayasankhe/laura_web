import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://anuradha:anuradha@anuradha.av9fjk8.mongodb.net/laura_web?retryWrites=true&w=majority';

export const connectDB = async (retries = 5) => {
  for (let i = 0; i < retries; i++) {
    try {
      await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
      console.log('MongoDB Connected Successfully to Laura Premium database');
      await seedDatabase();
      return;
    } catch (error) {
      console.error(`MongoDB connection attempt ${i + 1} failed:`, error.message);
      if (i < retries - 1 && (error.message.includes('ENOTFOUND') || error.message.includes('EAI_AGAIN'))) {
        console.log('Transient DNS Lookup issue detected. Retrying in 2.5 seconds...');
        await new Promise(r => setTimeout(r, 2500));
        continue;
      }
      process.exit(1);
    }
  }
};

// 1. Schemas Definition
const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  rawPrice: { type: Number, required: true },
  image: { type: String, required: true },
  badge: { type: String, default: '' },
  category: { type: String, required: true }, // e.g. "DRESSES", "TOPS", "BOTTOMS", "OUTERWEAR", "ACCESSORIES"
  desc: { type: String, required: true },
  details: { type: String, default: '' },
  care: { type: String, default: '' },
  shipping: { type: String, default: '' },
  isFeatured: { type: Boolean, default: false },
  sizes: { type: [String], default: ['S', 'M', 'L', 'XL'] },
  createdAt: { type: Date, default: Date.now }
});


const customOrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  garmentType: { type: String, required: true },
  fabric: { type: String, required: true },
  bust: { type: Number, default: null },
  waist: { type: Number, default: null },
  hips: { type: Number, default: null },
  height: { type: Number, default: null },
  notes: { type: String, default: '' },
  status: { type: String, default: 'pending' }, // pending, in_progress, completed, cancelled
  createdAt: { type: Date, default: Date.now }
});

const contactInquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, default: '' },
  message: { type: String, required: true },
  status: { type: String, default: 'unread' }, // unread, read, replied
  createdAt: { type: Date, default: Date.now }
});

const settingSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: String, required: true }
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true }
});

const galleryItemSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true }, // e.g. Editorial, Collection, Tailoring, Detail, Bespoke
  image: { type: String, required: true },
  aspect: { type: String, default: 'portrait' }, // portrait, square
  createdAt: { type: Date, default: Date.now }
});

// 2. Models Exports
export const Product = mongoose.model('Product', productSchema);
export const CustomOrder = mongoose.model('CustomOrder', customOrderSchema);
export const ContactInquiry = mongoose.model('ContactInquiry', contactInquirySchema);
export const Setting = mongoose.model('Setting', settingSchema);
export const Category = mongoose.model('Category', categorySchema);
export const GalleryItem = mongoose.model('GalleryItem', galleryItemSchema);

// Helper to get next auto-increment product ID
export const getNextProductId = async () => {
  const lastProduct = await Product.findOne().sort({ id: -1 });
  return lastProduct ? lastProduct.id + 1 : 1;
};

// Helper to get next auto-increment gallery ID
export const getNextGalleryId = async () => {
  const lastItem = await GalleryItem.findOne().sort({ id: -1 });
  return lastItem ? lastItem.id + 1 : 1;
};

// 3. Database Seeding Function
const seedDatabase = async () => {
  try {
    // Seed Settings first
    const settingsSeed = [
      { key: 'whatsapp_number', value: '94768455271' },
      { key: 'imgbb_api_key', value: 'f2ac2dc4433d0a5a6cdb4831b9a0d68c' },
      { key: 'imgbb_upload_url', value: 'https://api.imgbb.com/1/upload' },
      { key: 'store_announcement', value: 'FREE DELIVERY ISLANDWIDE | CASH ON DELIVERY AVAILABLE | NEW ARRIVALS EVERY WEEK' }
    ];

    for (const s of settingsSeed) {
      const exists = await Setting.findOne({ key: s.key });
      if (!exists) {
        await Setting.create(s);
        console.log(`Setting Seeded: ${s.key} -> ${s.value}`);
      }
    }

    // Seed Categories
    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      const initialCategories = [
        { name: 'Dresses', code: 'DRESSES' },
        { name: 'Tops', code: 'TOPS' },
        { name: 'Bottoms', code: 'BOTTOMS' },
        { name: 'Outerwear', code: 'OUTERWEAR' },
        { name: 'Accessories', code: 'ACCESSORIES' }
      ];
      await Category.insertMany(initialCategories);
      console.log('Seeded initial categories successfully');
    }

    // Seed Products if none exists
    const count = await Product.countDocuments();
    if (count === 0) {
      console.log('Seeding initial premium boutique products...');
      const initialProducts = [
        {
          id: 1,
          name: 'Lavender Dream Floral Dress',
          price: 'Rs. 8,900',
          rawPrice: 8900,
          image: '/images/categories/dresses.png',
          badge: 'BEST SELLER',
          category: 'DRESSES',
          isFeatured: true,
          desc: 'Indulge in pure feminine grace with our Lavender Dream Floral Dress. Meticulously handcrafted from premium flowing silk chiffon, this masterpiece features delicate floral print details, a graceful wrap silhouette, and comfortable tiered layers that flow beautifully with every step.',
          details: 'Made from 100% pure silk chiffon. Features an invisible back zipper, soft inner viscose lining, and elegant flared cuffs. Hand-tailored for a premium fit.',
          care: 'Dry clean only. Iron inside out on low heat. Do not bleach. Keep away from sharp jewelry.',
          shipping: 'Delivery within 2-3 business days islandwide. Cash on delivery available. Standard shipping is Rs. 350.'
        },
        {
          id: 2,
          name: 'Pastel Violet Silk Blouse',
          price: 'Rs. 6,500',
          rawPrice: 6500,
          image: '/images/categories/tops.png',
          badge: 'NEW ARRIVAL',
          category: 'TOPS',
          isFeatured: true,
          desc: 'Define sophistication with our signature Pastel Violet Silk Blouse. Crafted from ultra-breathable high-grade boutique silk, it boasts uniquely tailored statement cuffs, a versatile collar structure, and a smooth lustrous finish that elevates any evening or professional outfit.',
          details: 'Crafted from premium boutique Mulberry silk (90%) and elastane (10%) for a comfortable stretch. Hand-tailored statement double-buttons.',
          care: 'Hand wash cold with mild detergent. Hang dry in shade. Light steam iron. Do not tumble dry.',
          shipping: 'Delivery within 2-3 business days islandwide. Cash on delivery available. Standard shipping is Rs. 350.'
        },
        {
          id: 3,
          name: 'High-Waist Tailored Trousers',
          price: 'Rs. 7,800',
          rawPrice: 7800,
          image: '/images/categories/bottoms.png',
          badge: 'TRENDING',
          category: 'BOTTOMS',
          isFeatured: true,
          desc: 'Add structure to your daily look with the High-Waist Tailored Trousers. Cut in an elegant straight-leg style with fine front creases, these pants are tailored from high-quality linen blend fabrics, providing both structural perfection and all-day breathable comfort.',
          details: 'Structured blend of premium organic linen (60%) and soft cotton (40%). Features functional side pockets and clean belt loops.',
          care: 'Machine wash delicate cold. Lay flat to dry. Hot steam iron recommended. Wash dark colors separately.',
          shipping: 'Delivery within 2-3 business days islandwide. Cash on delivery available. Standard shipping is Rs. 350.'
        },
        {
          id: 4,
          name: 'Classic Lavender Blazer',
          price: 'Rs. 12,500',
          rawPrice: 12500,
          image: '/images/categories/outerwear.png',
          badge: 'HOT ITEM',
          category: 'OUTERWEAR',
          isFeatured: true,
          desc: 'The absolute pinnacle of luxury outerwear. Our Classic Lavender Blazer features double-breasted buttoning, sharp notch lapels, and a soft matching lining. Expertly structured to create a flattering silhouette while maintaining ultimate boutique comfort.',
          details: 'Made from 100% high-quality linen. Internal matching polyester satin lining. Dual functional front flap pockets and horn-style buttons.',
          care: 'Dry clean only. Steam iron only. Hang on wide-shouldered wooden hangers. Store in a breathable garment bag.',
          shipping: 'Delivery within 2-3 business days islandwide. Cash on delivery available. Standard shipping is Rs. 350.'
        },
        {
          id: 5,
          name: 'Lavender Garden Sundress',
          price: 'Rs. 9,200',
          rawPrice: 9200,
          image: '/images/categories/dresses.png',
          badge: 'NEW',
          category: 'DRESSES',
          isFeatured: false,
          desc: 'Bespoke high-end floral print dress, hand-tailored for warm boutique comfort.',
          details: 'Pure premium linen-chiffon blend, ideal for warm luxury settings.',
          care: 'Dry clean or delicate hand wash cold. Low heat iron.',
          shipping: 'Delivery within 2-3 business days islandwide.'
        },
        {
          id: 6,
          name: 'Amethyst Silk Wrap Top',
          price: 'Rs. 5,900',
          rawPrice: 5900,
          image: '/images/categories/tops.png',
          badge: 'TRENDING',
          category: 'TOPS',
          isFeatured: false,
          desc: 'Sleek premium wrap top featuring dynamic flared sleeves and tie details.',
          details: 'Premium stretch silk blend with handloom design styling.',
          care: 'Hand wash cold. Dry flat.',
          shipping: 'Delivery within 2-3 business days islandwide.'
        },
        {
          id: 7,
          name: 'Chic Orchid Linen Shorts',
          price: 'Rs. 4,800',
          rawPrice: 4800,
          image: '/images/categories/bottoms.png',
          badge: 'NEW',
          category: 'BOTTOMS',
          isFeatured: false,
          desc: 'Lightweight high-rise tailored linen shorts, ideal for casual e-commerce looks.',
          details: '100% organic lightweight breathable linen blend.',
          care: 'Machine wash delicate, tumble dry low.',
          shipping: 'Delivery within 2-3 business days islandwide.'
        },
        {
          id: 8,
          name: 'Elegant Lavender Leather Tote',
          price: 'Rs. 14,500',
          rawPrice: 14500,
          image: '/images/categories/accessories.png',
          badge: 'LUXURY',
          category: 'ACCESSORIES',
          isFeatured: false,
          desc: 'Genuine handcrafted leather tote bag with sleek gold-plated hardware.',
          details: 'Boutique premium Saffiano leather featuring internal lining and gold-accent zippers.',
          care: 'Clean with soft leather brush and protect with leather cream.',
          shipping: 'Delivery within 2-3 business days islandwide.'
        }
      ];

      await Product.insertMany(initialProducts);
      console.log('Seeded 8 boutique products into MongoDB successfully');
    } else {
      console.log(`Database already seeded. Found ${count} products.`);
    }

    // Seed Gallery Items if none exist
    const galleryCount = await GalleryItem.countDocuments();
    if (galleryCount === 0) {
      console.log('Seeding initial lookbook gallery items...');
      const initialGallery = [
        {
          id: 1,
          title: 'Lavender Archway Shoot',
          category: 'Editorial',
          image: '/images/categories/dresses.png',
          aspect: 'portrait'
        },
        {
          id: 2,
          title: 'Spring Boutique Silk Blouses',
          category: 'Collection',
          image: '/images/categories/tops.png',
          aspect: 'square'
        },
        {
          id: 3,
          title: 'Minimalist Trousers Study',
          category: 'Tailoring',
          image: '/images/categories/bottoms.png',
          aspect: 'portrait'
        },
        {
          id: 4,
          title: 'Pastel Linen Blazer Showcase',
          category: 'Editorial',
          image: '/images/categories/outerwear.png',
          aspect: 'square'
        },
        {
          id: 5,
          title: 'Handcrafted Accessories Selection',
          category: 'Detail',
          image: '/images/categories/accessories.png',
          aspect: 'portrait'
        },
        {
          id: 6,
          title: 'Dream Lavender Sundress Concept',
          category: 'Bespoke',
          image: '/images/categories/dresses.png',
          aspect: 'square'
        }
      ];
      await GalleryItem.insertMany(initialGallery);
      console.log('Seeded 6 boutique lookbook gallery items successfully');
    } else {
      console.log(`Gallery already seeded. Found ${galleryCount} lookbook items.`);
    }
  } catch (error) {
    console.error('Seeding database failed:', error.message);
  }
};
