import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { 
  connectDB, 
  Product, 
  CustomOrder, 
  ContactInquiry, 
  Setting, 
  Category,
  GalleryItem,
  getNextProductId,
  getNextGalleryId
} from './db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static admin files
app.use('/admin', express.static(path.join(__dirname, 'public/admin')));

// Redirect root to admin panel and handle admin index cleanly
app.get('/', (req, res) => {
  res.redirect('/admin/');
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/admin/index.html'));
});

// Connect Database
connectDB();

// Simple Admin Authentication Middleware
const authMiddleware = (req, res, next) => {
  const adminPassword = process.env.ADMIN_PASSWORD || 'anuradha';
  const token = req.headers['authorization'];
  
  if (token === adminPassword || token === `Bearer ${adminPassword}`) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized: Invalid Admin Password' });
  }
};

// ==========================================
// 1. Auth Endpoint
// ==========================================
app.post('/api/auth/login', (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || 'anuradha';
  
  if (password === adminPassword) {
    res.json({ success: true, token: adminPassword });
  } else {
    res.status(400).json({ success: false, error: 'Incorrect Admin Password' });
  }
});

// ==========================================
// 2. Settings Endpoints
// ==========================================
app.get('/api/settings', async (req, res) => {
  try {
    const dbSettings = await Setting.find({});
    const settings = {};
    dbSettings.forEach(s => {
      settings[s.key] = s.value;
    });
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve settings' });
  }
});

app.put('/api/settings', authMiddleware, async (req, res) => {
  try {
    const updates = req.body; // e.g. { whatsapp_number: '94768455271', store_announcement: '...' }
    for (const [key, value] of Object.entries(updates)) {
      await Setting.findOneAndUpdate(
        { key }, 
        { value }, 
        { upsert: true, new: true }
      );
    }
    res.json({ success: true, message: 'Settings updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

// ==========================================
// 2.5. Categories Endpoints
// ==========================================
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

app.post('/api/categories', authMiddleware, async (req, res) => {
  try {
    const { name, code } = req.body;
    if (!name || !code) {
      return res.status(400).json({ error: 'Name and Code are required' });
    }
    const cleanCode = code.trim().toUpperCase();
    const newCategory = new Category({ name: name.trim(), code: cleanCode });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: `Failed to create category: ${error.message}` });
  }
});

app.delete('/api/categories/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Category.findByIdAndDelete(id);
    if (deleted) {
      res.json({ success: true, message: 'Category deleted successfully' });
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

// ==========================================
// 3. Products Endpoints
// ==========================================
app.get('/api/products', async (req, res) => {
  try {
    const { category, featured } = req.query;
    const filter = {};
    
    if (category && category !== 'ALL') {
      filter.category = category.toUpperCase();
    }
    
    if (featured === 'true') {
      filter.isFeatured = true;
    }
    
    const products = await Product.find(filter).sort({ id: 1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ id: Number(id) });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product details' });
  }
});

app.post('/api/products', authMiddleware, async (req, res) => {
  try {
    const productData = req.body;
    productData.id = await getNextProductId();
    
    const newProduct = new Product(productData);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: `Failed to create product: ${error.message}` });
  }
});

app.put('/api/products/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const updatedProduct = await Product.findOneAndUpdate(
      { id: Number(id) }, 
      updateData, 
      { new: true }
    );
    
    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/api/products/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.findOneAndDelete({ id: Number(id) });
    
    if (result) {
      res.json({ success: true, message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// ==========================================
// 3.5. Lookbook Gallery Endpoints
// ==========================================
app.get('/api/gallery', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category && category !== 'ALL') {
      filter.category = category;
    }
    const items = await GalleryItem.find(filter).sort({ id: 1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lookbook gallery items' });
  }
});

app.get('/api/gallery/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await GalleryItem.findOne({ id: Number(id) });
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: 'Lookbook item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lookbook item details' });
  }
});

app.post('/api/gallery', authMiddleware, async (req, res) => {
  try {
    const galleryData = req.body;
    galleryData.id = await getNextGalleryId();
    
    const newItem = new GalleryItem(galleryData);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: `Failed to create lookbook item: ${error.message}` });
  }
});

app.put('/api/gallery/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const updatedItem = await GalleryItem.findOneAndUpdate(
      { id: Number(id) }, 
      updateData, 
      { new: true }
    );
    
    if (updatedItem) {
      res.json(updatedItem);
    } else {
      res.status(404).json({ error: 'Lookbook item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update lookbook item' });
  }
});

app.delete('/api/gallery/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await GalleryItem.findOneAndDelete({ id: Number(id) });
    
    if (result) {
      res.json({ success: true, message: 'Lookbook item deleted successfully' });
    } else {
      res.status(404).json({ error: 'Lookbook item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete lookbook item' });
  }
});

// ==========================================
// 4. Custom Orders Endpoints
// ==========================================
app.post('/api/custom-orders', async (req, res) => {
  try {
    const newOrder = new CustomOrder(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to log custom fitting order' });
  }
});

app.get('/api/custom-orders', authMiddleware, async (req, res) => {
  try {
    const orders = await CustomOrder.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch custom orders' });
  }
});

app.put('/api/custom-orders/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const updatedOrder = await CustomOrder.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    
    if (updatedOrder) {
      res.json(updatedOrder);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

// ==========================================
// 5. Contact Inquiries Endpoints
// ==========================================
app.post('/api/contact', async (req, res) => {
  try {
    const newInquiry = new ContactInquiry(req.body);
    await newInquiry.save();
    res.status(201).json(newInquiry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit contact message' });
  }
});

app.get('/api/contact', authMiddleware, async (req, res) => {
  try {
    const inquiries = await ContactInquiry.find({}).sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contact inquiries' });
  }
});

app.put('/api/contact/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const updatedInquiry = await ContactInquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    
    if (updatedInquiry) {
      res.json(updatedInquiry);
    } else {
      res.status(404).json({ error: 'Inquiry not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update inquiry status' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
  console.log(`Premium Admin Panel served at http://localhost:${PORT}/admin`);
});
