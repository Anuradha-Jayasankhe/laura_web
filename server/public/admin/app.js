// ==========================================================================
// LAURA PREMIUM BOUTIQUE - DYNAMIC ADMIN CONTROLLER CLIENT CODE
// ==========================================================================

const API_BASE = '/api';

// Global State
let adminToken = localStorage.getItem('admin_token') || '';
let storeSettings = {};

// Cache DOM Elements
const loginContainer = document.getElementById('login-container');
const dashboardContainer = document.getElementById('dashboard-container');
const loginForm = document.getElementById('login-form');
const adminPasswordInput = document.getElementById('admin-password');
const loginError = document.getElementById('login-error');

const logoutBtn = document.getElementById('logout-btn');
const tabTitle = document.getElementById('tab-title');
const menuItems = document.querySelectorAll('.menu-item');
const tabPanes = document.querySelectorAll('.tab-pane');

// Dashboard Quick Stats DOM
const statProductsCount = document.getElementById('stat-products-count');
const statOrdersCount = document.getElementById('stat-orders-count');
const statMessagesCount = document.getElementById('stat-messages-count');
const statWhatsapp = document.getElementById('stat-whatsapp');
const recentOrdersList = document.getElementById('recent-orders-list');
const recentMessagesList = document.getElementById('recent-messages-list');

// Products Tab DOM
const adminProductsList = document.getElementById('admin-products-list');
const productCategoryFilter = document.getElementById('product-category-filter');
const addProductBtn = document.getElementById('add-product-btn');

// Custom Orders Tab DOM
const adminOrdersList = document.getElementById('admin-orders-list');

// Messages Tab DOM
const adminMessagesList = document.getElementById('admin-messages-list');

// Categories Tab DOM
const adminCategoriesList = document.getElementById('admin-categories-list');
const categoryForm = document.getElementById('category-form');
const catName = document.getElementById('cat-name');
const catCode = document.getElementById('cat-code');

// Settings Tab DOM
const settingsForm = document.getElementById('settings-form');
const settingsWhatsapp = document.getElementById('settings-whatsapp');
const settingsAnnouncement = document.getElementById('settings-announcement');
const settingsImgbbKey = document.getElementById('settings-imgbb-key');
const settingsImgbbUrl = document.getElementById('settings-imgbb-url');
const settingsSuccess = document.getElementById('settings-success');

// Product Modal / Side Drawer DOM
const productModal = document.getElementById('product-modal');
const closeProductModalBtn = document.getElementById('close-product-modal-btn');
const cancelProductBtn = document.getElementById('cancel-product-btn');
const productForm = document.getElementById('product-form');
const formProductId = document.getElementById('form-product-id');
const formProductMode = document.getElementById('form-product-mode');
const modalProductTitle = document.getElementById('modal-product-title');

const prodName = document.getElementById('prod-name');
const prodPrice = document.getElementById('prod-price');
const prodRawPrice = document.getElementById('prod-raw-price');
const prodCategory = document.getElementById('prod-category');
const prodBadge = document.getElementById('prod-badge');
const prodDesc = document.getElementById('prod-desc');
const prodDetails = document.getElementById('prod-details');
const prodCare = document.getElementById('prod-care');
const prodShipping = document.getElementById('prod-shipping');
const prodFeatured = document.getElementById('prod-featured');

// Image upload DOM
const prodImageFile = document.getElementById('prod-image-file');
const triggerFileSelectBtn = document.getElementById('trigger-file-select-btn');
const imageUploadPreview = document.getElementById('image-upload-preview');
const prodImageUrl = document.getElementById('prod-image-url');
const uploadProgressContainer = document.getElementById('upload-progress-container');
const uploadProgressFill = document.getElementById('upload-progress-fill');
const uploadStatusText = document.getElementById('upload-status-text');

// Lookbook DOM elements
const statGalleryCount = document.getElementById('stat-gallery-count');
const adminGalleryList = document.getElementById('admin-gallery-list');
const galleryCategoryFilter = document.getElementById('gallery-category-filter');
const addGalleryItemBtn = document.getElementById('add-gallery-item-btn');
const galleryModal = document.getElementById('gallery-modal');
const closeGalleryModalBtn = document.getElementById('close-gallery-modal-btn');
const cancelGalleryBtn = document.getElementById('cancel-gallery-btn');
const galleryFormElem = document.getElementById('gallery-form-elem');
const formGalleryId = document.getElementById('form-gallery-id');
const formGalleryMode = document.getElementById('form-gallery-mode');
const modalGalleryTitle = document.getElementById('modal-gallery-title');

const galTitle = document.getElementById('gal-title');
const galCategory = document.getElementById('gal-category');
const galAspect = document.getElementById('gal-aspect');

const galImageFile = document.getElementById('gal-image-file');
const triggerGalFileBtn = document.getElementById('trigger-gal-file-btn');
const galleryImagePreview = document.getElementById('gallery-image-preview');
const galImageUrl = document.getElementById('gal-image-url');
const galUploadProgressContainer = document.getElementById('gal-upload-progress-container');
const galUploadProgressFill = document.getElementById('gal-upload-progress-fill');
const galUploadStatusText = document.getElementById('gal-upload-status-text');

// ==========================================
// 1. Initial Authentication Handler
// ==========================================
function checkAuth() {
  if (adminToken) {
    loginContainer.classList.add('hide');
    dashboardContainer.classList.remove('hide');
    loadDashboardHub();
    loadStoreSettings();
    loadCategoriesOnce();
  } else {
    loginContainer.classList.remove('hide');
    dashboardContainer.classList.add('hide');
  }
}

// Custom Fetch Wrapper with Authorization Headers
async function secureFetch(url, options = {}) {
  options.headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    'Authorization': adminToken
  };
  
  const response = await fetch(url, options);
  if (response.status === 401) {
    // Clear token if invalid credentials error occurs
    localStorage.removeItem('admin_token');
    adminToken = '';
    checkAuth();
    throw new Error('Unauthorized');
  }
  return response;
}

// Handle Login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const password = adminPasswordInput.value;
  
  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    
    const data = await response.json();
    if (data.success) {
      adminToken = data.token;
      localStorage.setItem('admin_token', data.token);
      loginError.classList.add('hide');
      adminPasswordInput.value = '';
      checkAuth();
    } else {
      loginError.classList.remove('hide');
      loginError.innerText = data.error || 'Login failed.';
    }
  } catch (err) {
    loginError.classList.remove('hide');
    loginError.innerText = 'Server unreachable. Make sure Express backend is running.';
  }
});

// Logout
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('admin_token');
  adminToken = '';
  checkAuth();
});

// ==========================================
// 2. Navigation Routing & Tab Panel Toggles
// ==========================================
menuItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const tabName = item.getAttribute('data-tab');
    switchTab(tabName);
  });
});

document.querySelectorAll('.view-all-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tabName = btn.getAttribute('data-tab');
    switchTab(tabName);
  });
});

function switchTab(tabName) {
  // Update sidebar menu items
  menuItems.forEach(mi => {
    if (mi.getAttribute('data-tab') === tabName) {
      mi.classList.add('active');
    } else {
      mi.classList.remove('active');
    }
  });

  // Update header title
  const titleMap = {
    home: 'Dashboard Hub',
    products: 'Manage Signature Catalog',
    orders: 'Bespoke Custom Fitting Requests',
    messages: 'Customer Inquiries Inbox',
    categories: 'Manage Boutique Categories',
    settings: 'Boutique Global Configurations',
    gallery: 'Manage Lookbook Gallery'
  };
  tabTitle.innerText = titleMap[tabName] || 'Boutique Admin Suite';

  // Toggle visible pane
  tabPanes.forEach(pane => {
    if (pane.id === `tab-${tabName}`) {
      pane.classList.add('active');
    } else {
      pane.classList.remove('active');
    }
  });

  // Trigger dynamic reload
  if (tabName === 'home') loadDashboardHub();
  else if (tabName === 'products') loadProductsList();
  else if (tabName === 'orders') loadCustomOrdersList();
  else if (tabName === 'messages') loadContactInquiriesList();
  else if (tabName === 'categories') loadCategoriesList();
  else if (tabName === 'settings') populateSettingsForm();
  else if (tabName === 'gallery') loadGalleryList();
}

// ==========================================
// 3. Dynamic API Data Fetchers
// ==========================================

// Global settings synchronizer
async function loadStoreSettings() {
  try {
    const res = await secureFetch(`${API_BASE}/settings`);
    storeSettings = await res.json();
    
    // Set WhatsApp numbers in text display widgets
    const number = storeSettings.whatsapp_number || '076 8455271';
    statWhatsapp.innerText = number.startsWith('94') 
      ? `0${number.slice(2, 5)} ${number.slice(5)}` 
      : number;
  } catch (err) {
    console.error('Settings fetch failed', err);
  }
}

// Dashboard Summary Counters Seeding
async function loadDashboardHub() {
  try {
    const [pRes, oRes, mRes, gRes] = await Promise.all([
      secureFetch(`${API_BASE}/products`),
      secureFetch(`${API_BASE}/custom-orders`),
      secureFetch(`${API_BASE}/contact`),
      secureFetch(`${API_BASE}/gallery`)
    ]);

    const products = await pRes.json();
    const orders = await oRes.json();
    const messages = await mRes.json();
    const gallery = await gRes.json();

    // 1. Set values in Quick-Box elements
    statProductsCount.innerText = products.length;
    statOrdersCount.innerText = orders.length;
    statGalleryCount.innerText = gallery.length;
    
    const unreadCount = messages.filter(m => m.status === 'unread').length;
    statMessagesCount.innerText = unreadCount;
    
    // Update sidebar badges
    const badgeOrders = document.getElementById('badge-orders');
    const pendingOrdersCount = orders.filter(o => o.status === 'pending').length;
    if (pendingOrdersCount > 0) {
      badgeOrders.innerText = pendingOrdersCount;
      badgeOrders.classList.remove('hide');
    } else {
      badgeOrders.classList.add('hide');
    }

    const badgeMessages = document.getElementById('badge-messages');
    if (unreadCount > 0) {
      badgeMessages.innerText = unreadCount;
      badgeMessages.classList.remove('hide');
    } else {
      badgeMessages.classList.add('hide');
    }

    // 2. Render recent custom orders
    recentOrdersList.innerHTML = '';
    orders.slice(0, 5).forEach(o => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-weight: 700; color: var(--text-white);">${o.name}</td>
        <td><span class="status-pill ${o.status}">${o.garmentType}</span></td>
        <td>Bust: ${o.bust || 'N/A'}" | Waist: ${o.waist || 'N/A'}" | Hips: ${o.hips || 'N/A'}"</td>
        <td>${new Date(o.createdAt).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}</td>
      `;
      recentOrdersList.appendChild(tr);
    });
    if (orders.length === 0) {
      recentOrdersList.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted);">No custom fitting requests received.</td></tr>`;
    }

    // 3. Render recent inquiries
    recentMessagesList.innerHTML = '';
    messages.slice(0, 4).forEach(m => {
      const div = document.createElement('div');
      div.className = 'inbox-item';
      div.innerHTML = `
        <div class="inbox-meta">
          <span class="inbox-sender">${m.name} <span class="status-pill ${m.status}" style="font-size: 8px; padding: 2px 6px;">${m.status}</span></span>
          <span class="inbox-date">${new Date(m.createdAt).toLocaleDateString()}</span>
        </div>
        <div class="inbox-msg-teaser">${m.subject ? `<strong>${m.subject}:</strong> ` : ''}${m.message}</div>
      `;
      div.addEventListener('click', () => switchTab('messages'));
      recentMessagesList.appendChild(div);
    });
    if (messages.length === 0) {
      recentMessagesList.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 20px 0;">Inbox is currently empty.</div>`;
    }

  } catch (err) {
    console.error('Dashboard load failed', err);
  }
}

// ==========================================
// 4. Products Catalog Controller
// ==========================================
async function loadProductsList() {
  try {
    const category = productCategoryFilter.value;
    const res = await secureFetch(`${API_BASE}/products?category=${category}`);
    const products = await res.json();
    
    adminProductsList.innerHTML = '';
    products.forEach(p => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <div class="avatar-thumbnail" style="background-image: url(${p.image})"></div>
        </td>
        <td style="font-weight: 700; color: var(--text-white);">#${p.id}</td>
        <td>
          <div style="font-weight: 600; color: var(--text-white); font-size: 14px;">${p.name}</div>
          <div style="font-size: 11px; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; max-width: 300px;">${p.desc}</div>
        </td>
        <td><span class="status-pill" style="background-color: rgba(112, 15, 92, 0.05); color: var(--color-primary);">${p.category}</span></td>
        <td style="font-weight: 700; color: var(--color-primary);">${p.price}</td>
        <td>${p.badge ? `<span class="status-pill pending" style="background-color: rgba(112, 15, 92, 0.1); color: var(--color-primary); border-color: rgba(112, 15, 92, 0.2);">${p.badge}</span>` : '<span style="color: var(--text-muted);">-</span>'}</td>
        <td style="text-align: center;">${p.isFeatured ? '<span style="color: var(--color-star);">★</span>' : '<span style="color: var(--text-muted);">☆</span>'}</td>
        <td style="text-align: right;">
          <div style="display: flex; gap: 8px; justify-content: flex-end;">
            <button class="btn-action-trigger edit-prod-btn" data-id="${p.id}">EDIT</button>
            <button class="btn-action-trigger delete-prod-btn" data-id="${p.id}" style="color: #dc2626;">DELETE</button>
          </div>
        </td>
      `;
      adminProductsList.appendChild(tr);
    });

    if (products.length === 0) {
      adminProductsList.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 40px 0;">No matching products found in catalog. Add some items to populate!</td></tr>`;
    }

    // Attach listeners
    document.querySelectorAll('.edit-prod-btn').forEach(btn => {
      btn.addEventListener('click', () => openProductModal('UPDATE', btn.getAttribute('data-id')));
    });

    document.querySelectorAll('.delete-prod-btn').forEach(btn => {
      btn.addEventListener('click', () => handleDeleteProduct(btn.getAttribute('data-id')));
    });

  } catch (err) {
    console.error('Load products list failed', err);
  }
}

productCategoryFilter.addEventListener('change', loadProductsList);

// ==========================================
// 5. Dynamic ImgBB Asynchronous Image Uploader
// ==========================================
triggerFileSelectBtn.addEventListener('click', () => {
  prodImageFile.click();
});

prodImageFile.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Retrieve keys from active settings
  const apiKey = storeSettings.imgbb_api_key || 'f2ac2dc4433d0a5a6cdb4831b9a0d68c';
  const uploadUrl = storeSettings.imgbb_upload_url || 'https://api.imgbb.com/1/upload';

  // Create form data for imgbb
  const formData = new FormData();
  formData.append('key', apiKey);
  formData.append('image', file);

  // Show progress meters
  uploadProgressContainer.classList.remove('hide');
  uploadProgressFill.style.width = '0%';
  uploadStatusText.innerText = 'Uploading to ImgBB (0%)...';
  triggerFileSelectBtn.disabled = true;

  try {
    // Perform dynamic request using XHR to support progress calculations
    const xhr = new XMLHttpRequest();
    xhr.open('POST', uploadUrl);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        uploadProgressFill.style.width = `${percent}%`;
        uploadStatusText.innerText = `Uploading to ImgBB (${percent}%)...`;
      }
    };

    xhr.onload = () => {
      triggerFileSelectBtn.disabled = false;
      if (xhr.status >= 200 && xhr.status < 300) {
        const res = JSON.parse(xhr.responseText);
        if (res.data && res.data.url) {
          const uploadedUrl = res.data.url;
          prodImageUrl.value = uploadedUrl;
          imageUploadPreview.style.backgroundImage = `url(${uploadedUrl})`;
          uploadStatusText.innerText = 'Uploaded Successfully!';
          uploadProgressFill.style.width = '100%';
          setTimeout(() => uploadProgressContainer.classList.add('hide'), 2000);
        } else {
          alert('Upload failed: Invalid API Key or format');
          uploadProgressContainer.classList.add('hide');
        }
      } else {
        alert('ImgBB upload returned status error. Check API key in Store Settings.');
        uploadProgressContainer.classList.add('hide');
      }
    };

    xhr.onerror = () => {
      triggerFileSelectBtn.disabled = false;
      alert('Network issue while communicating with ImgBB.');
      uploadProgressContainer.classList.add('hide');
    };

    xhr.send(formData);

  } catch (err) {
    triggerFileSelectBtn.disabled = false;
    alert('ImgBB upload request failed.');
    uploadProgressContainer.classList.add('hide');
  }
});

// Sync input value directly to image preview
prodImageUrl.addEventListener('input', () => {
  const url = prodImageUrl.value.trim();
  if (url) {
    imageUploadPreview.style.backgroundImage = `url(${url})`;
  } else {
    imageUploadPreview.style.backgroundImage = 'none';
  }
});

// ==========================================
// 6. Product Side Drawer Modal Form Submit
// ==========================================
addProductBtn.addEventListener('click', () => openProductModal('CREATE'));
closeProductModalBtn.addEventListener('click', closeProductModal);
cancelProductBtn.addEventListener('click', closeProductModal);

function openProductModal(mode, id = null) {
  productForm.reset();
  uploadProgressContainer.classList.add('hide');
  imageUploadPreview.style.backgroundImage = 'none';
  
  formProductMode.value = mode;
  
  if (mode === 'CREATE') {
    modalProductTitle.innerText = 'Add Signature Masterpiece';
    formProductId.value = '';
    productModal.classList.remove('hide');
  } else if (mode === 'UPDATE') {
    modalProductTitle.innerText = `Edit Signature Piece #${id}`;
    formProductId.value = id;
    
    // Fetch product details to populate
    secureFetch(`${API_BASE}/products/${id}`)
      .then(res => res.json())
      .then(p => {
        prodName.value = p.name;
        prodPrice.value = p.price;
        prodRawPrice.value = p.rawPrice;
        prodCategory.value = p.category;
        prodBadge.value = p.badge || '';
        prodDesc.value = p.desc;
        prodDetails.value = p.details || '';
        prodCare.value = p.care || '';
        prodShipping.value = p.shipping || '';
        prodFeatured.checked = p.isFeatured;
        prodImageUrl.value = p.image;
        imageUploadPreview.style.backgroundImage = `url(${p.image})`;
        
        productModal.classList.remove('hide');
      })
      .catch(err => alert('Failed to retrieve product details.'));
  }
}

function closeProductModal() {
  productModal.classList.add('hide');
}

productForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const mode = formProductMode.value;
  const id = formProductId.value;
  
  const payload = {
    name: prodName.value,
    price: prodPrice.value,
    rawPrice: Number(prodRawPrice.value),
    category: prodCategory.value,
    badge: prodBadge.value,
    desc: prodDesc.value,
    details: prodDetails.value,
    care: prodCare.value,
    shipping: prodShipping.value,
    isFeatured: prodFeatured.checked,
    image: prodImageUrl.value.trim()
  };

  if (!payload.image) {
    alert('Please select or upload a product image first.');
    return;
  }

  try {
    let url = `${API_BASE}/products`;
    let method = 'POST';

    if (mode === 'UPDATE') {
      url = `${API_BASE}/products/${id}`;
      method = 'PUT';
    }

    const res = await secureFetch(url, {
      method,
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      closeProductModal();
      loadProductsList();
    } else {
      const err = await res.json();
      alert(`Error saving product: ${err.error}`);
    }
  } catch (err) {
    alert('Failed to communicate with Express backend.');
  }
});

// Delete Product
async function handleDeleteProduct(id) {
  if (!confirm(`Are you absolutely sure you want to delete Signature Piece #${id} from the live catalog?`)) {
    return;
  }

  try {
    const res = await secureFetch(`${API_BASE}/products/${id}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      loadProductsList();
    } else {
      alert('Delete operation rejected.');
    }
  } catch (err) {
    alert('Failed to connect to delete endpoint.');
  }
}

// ==========================================
// 7. Custom Orders (Bespoke Metrics) Controller
// ==========================================
async function loadCustomOrdersList() {
  try {
    const res = await secureFetch(`${API_BASE}/custom-orders`);
    const orders = await res.json();
    
    adminOrdersList.innerHTML = '';
    orders.forEach(o => {
      const tr = document.createElement('tr');
      
      // Measurements String Formatting
      const metricsHtml = `
        <div style="font-size: 12px; line-height: 1.5;">
          <span>Bust: <strong>${o.bust || 'N/A'}"</strong></span> | 
          <span>Waist: <strong>${o.waist || 'N/A'}"</strong></span> | <br>
          <span>Hips: <strong>${o.hips || 'N/A'}"</strong></span> | 
          <span>Height: <strong>${o.height || 'N/A'}"</strong></span>
        </div>
      `;

      // Status selector drop widget
      const statusSelectHtml = `
        <select class="form-input select-pill order-status-select" data-id="${o._id}" style="font-size: 10px; padding: 4px 10px !important;">
          <option value="pending" ${o.status === 'pending' ? 'selected' : ''}>Pending</option>
          <option value="in_progress" ${o.status === 'in_progress' ? 'selected' : ''}>In Progress</option>
          <option value="completed" ${o.status === 'completed' ? 'selected' : ''}>Completed</option>
          <option value="cancelled" ${o.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
        </select>
      `;

      // Prefilled WhatsApp order text
      const waMsg = `Hi ${o.name}! This is the Boutique Manager from Laura Premium 🌸. I have reviewed your Bespoke custom order fitting measurements (Bust: ${o.bust || 'N/A'}", Waist: ${o.waist || 'N/A'}", Hips: ${o.hips || 'N/A'}", Height: ${o.height || 'N/A'}") for fabric: *${o.fabric}* (${o.garmentType}). We are ready to draft your styling layout slot! Let's align on designs.`;
      
      // Handle phone formatting (strip + or zeros if needed)
      let phoneNum = o.phone.replace(/[\s\-\+]/g, '');
      if (phoneNum.startsWith('0')) {
        phoneNum = '94' + phoneNum.slice(1);
      }
      
      const whatsappUrl = `https://wa.me/${phoneNum}?text=${encodeURIComponent(waMsg)}`;

      tr.innerHTML = `
        <td style="font-weight: 700; color: var(--text-white);">${o.name}</td>
        <td style="font-family: monospace;">${o.phone}</td>
        <td><strong style="color: var(--color-primary);">${o.garmentType}</strong></td>
        <td><span class="status-pill pending" style="background-color: rgba(112, 15, 92, 0.03); color: var(--text-white);">${o.fabric}</span></td>
        <td>${metricsHtml}</td>
        <td>${statusSelectHtml}</td>
        <td>${new Date(o.createdAt).toLocaleDateString()}</td>
        <td style="text-align: right;">
          <a href="${whatsappUrl}" target="_blank" class="btn btn-action-trigger btn-whatsapp-chat">
            <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.197 1.451 4.811 1.452 5.513 0 9.997-4.493 10.001-10.01.002-2.673-1.03-5.187-2.91-7.07C16.66 1.642 14.15 1.6 11.999 1.6c-5.517 0-10.002 4.493-10.006 10.011 0 1.696.447 3.354 1.3 4.816L2.3 21.73l5.347-1.402z"/></svg>
            DISCUSS DETAILS
          </a>
        </td>
      `;
      
      // Row styles based on notes if applicable
      if (o.notes) {
        const notesTr = document.createElement('tr');
        notesTr.innerHTML = `
          <td colspan="8" style="background-color: rgba(112, 15, 92, 0.02); font-size: 11px; padding: 6px 18px; color: var(--text-muted);">
            <strong>Bespoke style request notes:</strong> "${o.notes}"
          </td>
        `;
        adminOrdersList.appendChild(tr);
        adminOrdersList.appendChild(notesTr);
      } else {
        adminOrdersList.appendChild(tr);
      }
    });

    if (orders.length === 0) {
      adminOrdersList.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 40px 0;">No custom orders submitted yet.</td></tr>`;
    }

    // Attach dynamic listeners for orders status changes
    document.querySelectorAll('.order-status-select').forEach(select => {
      select.addEventListener('change', async () => {
        const id = select.getAttribute('data-id');
        const status = select.value;
        
        try {
          const res = await secureFetch(`${API_BASE}/custom-orders/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ status })
          });
          if (!res.ok) alert('Failed to update status.');
        } catch (err) {
          alert('Network communication error.');
        }
      });
    });

  } catch (err) {
    console.error('Load custom orders failed', err);
  }
}

// ==========================================
// 8. Contact Inquiries Inbox Controller
// ==========================================
async function loadContactInquiriesList() {
  try {
    const res = await secureFetch(`${API_BASE}/contact`);
    const inquiries = await res.json();
    
    adminMessagesList.innerHTML = '';
    inquiries.forEach(m => {
      const card = document.createElement('div');
      card.className = 'glass-card message-card animate-fade-in';
      card.style.marginBottom = '20px';
      
      const unreadBadge = m.status === 'unread' 
        ? `<span class="status-pill unread" style="margin-right: 10px;">New Inquiry</span>` 
        : '';
        
      const actionButtonHtml = m.status === 'unread'
        ? `<button class="btn btn-outline mark-read-btn" data-id="${m._id}" style="font-size: 11px; padding: 6px 14px;">MARK AS READ</button>`
        : '';

      const replyMailto = `mailto:${m.email}?subject=Re: Laura Premium Boutique - ${m.subject || 'Inquiry'}`;

      card.innerHTML = `
        <div class="message-header-row">
          <div class="message-subject-info">
            <h3>${unreadBadge}${m.subject || 'General Inquiry'}</h3>
            <div class="message-sender-details">
              <span>Client: <strong>${m.name}</strong></span>
              <span>Email: <strong><a href="mailto:${m.email}" style="color: var(--color-secondary); text-decoration: underline;">${m.email}</a></strong></span>
              <span>Date: <strong>${new Date(m.createdAt).toLocaleString()}</strong></span>
            </div>
          </div>
          <div>
            <span class="status-pill ${m.status}">${m.status}</span>
          </div>
        </div>
        <div class="message-body">
          <p class="message-body-p">"${m.message}"</p>
        </div>
        <div class="message-footer-actions">
          ${actionButtonHtml}
          <a href="${replyMailto}" class="btn btn-primary" style="font-size: 11px; padding: 6px 18px;">
            REPLY VIA EMAIL
          </a>
        </div>
      `;
      adminMessagesList.appendChild(card);
    });

    if (inquiries.length === 0) {
      adminMessagesList.innerHTML = `<div class="glass-card" style="padding: 40px; text-align: center; color: var(--text-muted);">Your Customer inbox is completely clear!</div>`;
    }

    // Attach inbox mark read listeners
    document.querySelectorAll('.mark-read-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        try {
          const res = await secureFetch(`${API_BASE}/contact/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ status: 'read' })
          });
          if (res.ok) {
            loadContactInquiriesList();
          }
        } catch (err) {
          alert('Network issue.');
        }
      });
    });

  } catch (err) {
    console.error('Load messages failed', err);
  }
}

// ==========================================
// 9. Store Global Settings Form Handler
// ==========================================
function populateSettingsForm() {
  settingsWhatsapp.value = storeSettings.whatsapp_number || '94768455271';
  settingsAnnouncement.value = storeSettings.store_announcement || '';
  settingsImgbbKey.value = storeSettings.imgbb_api_key || '';
  settingsImgbbUrl.value = storeSettings.imgbb_upload_url || '';
}

settingsForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const payload = {
    whatsapp_number: settingsWhatsapp.value.trim().replace(/[\s\-\+]/g, ''),
    store_announcement: settingsAnnouncement.value.trim(),
    imgbb_api_key: settingsImgbbKey.value.trim(),
    imgbb_upload_url: settingsImgbbUrl.value.trim()
  };

  try {
    const res = await secureFetch(`${API_BASE}/settings`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      settingsSuccess.classList.remove('hide');
      loadStoreSettings();
      setTimeout(() => settingsSuccess.classList.add('hide'), 3000);
    } else {
      alert('Failed to update configurations.');
    }
  } catch (err) {
    alert('Communication issue with Express.');
  }
});

// ==========================================
// 10. Dynamic Category Management Controllers
// ==========================================
async function loadCategoriesOnce() {
  try {
    const res = await secureFetch(`${API_BASE}/categories`);
    const categories = await res.json();
    populateCategoryDropdowns(categories);
  } catch (err) {
    console.error('Failed to pre-fetch categories', err);
  }
}

async function loadCategoriesList() {
  try {
    const res = await secureFetch(`${API_BASE}/categories`);
    const categories = await res.json();
    
    adminCategoriesList.innerHTML = '';
    categories.forEach(c => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-weight: 700; color: var(--text-white);">${c.name}</td>
        <td><span class="status-pill" style="background-color: rgba(112, 15, 92, 0.05); color: var(--color-primary); font-family: monospace;">${c.code}</span></td>
        <td style="text-align: right;">
          <button class="btn-action-trigger delete-cat-btn" data-id="${c._id}" style="color: #dc2626;">DELETE</button>
        </td>
      `;
      adminCategoriesList.appendChild(tr);
    });

    if (categories.length === 0) {
      adminCategoriesList.innerHTML = `<tr><td colspan="3" style="text-align: center; color: var(--text-muted); padding: 30px 0;">No active categories. Create some to start!</td></tr>`;
    }

    // Attach click events to deletion triggers
    document.querySelectorAll('.delete-cat-btn').forEach(btn => {
      btn.addEventListener('click', () => handleDeleteCategory(btn.getAttribute('data-id')));
    });

    populateCategoryDropdowns(categories);

  } catch (err) {
    console.error('Failed to load categories', err);
  }
}

function populateCategoryDropdowns(categories) {
  // 1. Catalog filter selector dropdown
  const currentFilterVal = productCategoryFilter.value;
  productCategoryFilter.innerHTML = '<option value="ALL">All Categories</option>';
  categories.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.code;
    opt.innerText = c.name;
    productCategoryFilter.appendChild(opt);
  });
  if ([...productCategoryFilter.options].some(o => o.value === currentFilterVal)) {
    productCategoryFilter.value = currentFilterVal;
  }

  // 2. Add/Edit modal drawer select dropdown
  const currentProdVal = prodCategory.value;
  prodCategory.innerHTML = '<option value="" disabled selected>Select Category</option>';
  categories.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.code;
    opt.innerText = c.name;
    prodCategory.appendChild(opt);
  });
  if ([...prodCategory.options].some(o => o.value === currentProdVal)) {
    prodCategory.value = currentProdVal;
  }
}

// Category Submit
categoryForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = catName.value.trim();
  const code = catCode.value.trim().toUpperCase();

  if (!name || !code) {
    alert('Both name and reference code are required.');
    return;
  }

  try {
    const res = await secureFetch(`${API_BASE}/categories`, {
      method: 'POST',
      body: JSON.stringify({ name, code })
    });

    if (res.ok) {
      catName.value = '';
      catCode.value = '';
      loadCategoriesList();
    } else {
      const err = await res.json();
      alert(`Error: ${err.error || 'Failed to add category'}`);
    }
  } catch (err) {
    alert('Communication issue with server.');
  }
});

// Delete Category
async function handleDeleteCategory(id) {
  if (!confirm('Are you absolutely sure you want to delete this category? (Products mapped to this code will need their categories adjusted in editing panel)')) {
    return;
  }

  try {
    const res = await secureFetch(`${API_BASE}/categories/${id}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      loadCategoriesList();
    } else {
      alert('Delete operation rejected by system.');
    }
  } catch (err) {
    alert('Connection failure with delete API.');
  }
}

// ==========================================
// 11. Lookbook Gallery Controller
// ==========================================
async function loadGalleryList() {
  try {
    const category = galleryCategoryFilter.value;
    const res = await secureFetch(`${API_BASE}/gallery?category=${category}`);
    const items = await res.json();
    
    adminGalleryList.innerHTML = '';
    items.forEach(g => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <div class="avatar-thumbnail" style="background-image: url(${g.image})"></div>
        </td>
        <td style="font-weight: 700; color: var(--text-white);">#${g.id}</td>
        <td>
          <div style="font-weight: 600; color: var(--text-white); font-size: 14px;">${g.title}</div>
        </td>
        <td><span class="status-pill" style="background-color: rgba(112, 15, 92, 0.05); color: var(--color-primary);">${g.category}</span></td>
        <td><span class="status-pill" style="background-color: rgba(255, 255, 255, 0.1); color: var(--text-white);">${g.aspect}</span></td>
        <td style="text-align: right;">
          <div style="display: flex; gap: 8px; justify-content: flex-end;">
            <button class="btn-action-trigger edit-gal-btn" data-id="${g.id}">EDIT</button>
            <button class="btn-action-trigger delete-gal-btn" data-id="${g.id}" style="color: #dc2626;">DELETE</button>
          </div>
        </td>
      `;
      adminGalleryList.appendChild(tr);
    });

    if (items.length === 0) {
      adminGalleryList.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 40px 0;">No lookbook items found. Add some items to populate!</td></tr>`;
    }

    // Attach listeners
    document.querySelectorAll('.edit-gal-btn').forEach(btn => {
      btn.addEventListener('click', () => openGalleryModal('UPDATE', btn.getAttribute('data-id')));
    });

    document.querySelectorAll('.delete-gal-btn').forEach(btn => {
      btn.addEventListener('click', () => handleDeleteGallery(btn.getAttribute('data-id')));
    });

  } catch (err) {
    console.error('Load gallery list failed', err);
  }
}

galleryCategoryFilter.addEventListener('change', loadGalleryList);

// Lookbook Drawer Modal
addGalleryItemBtn.addEventListener('click', () => openGalleryModal('CREATE'));
closeGalleryModalBtn.addEventListener('click', closeGalleryModal);
cancelGalleryBtn.addEventListener('click', closeGalleryModal);

function openGalleryModal(mode, id = null) {
  galleryFormElem.reset();
  galUploadProgressContainer.classList.add('hide');
  galleryImagePreview.style.backgroundImage = 'none';
  
  formGalleryMode.value = mode;
  
  if (mode === 'CREATE') {
    modalGalleryTitle.innerText = 'Add Lookbook Item';
    formGalleryId.value = '';
    galleryModal.classList.remove('hide');
  } else if (mode === 'UPDATE') {
    modalGalleryTitle.innerText = `Edit Lookbook Item #${id}`;
    formGalleryId.value = id;
    
    // Fetch lookbook details to populate
    secureFetch(`${API_BASE}/gallery/${id}`)
      .then(res => res.json())
      .then(g => {
        galTitle.value = g.title;
        galCategory.value = g.category;
        galAspect.value = g.aspect;
        galImageUrl.value = g.image;
        galleryImagePreview.style.backgroundImage = `url(${g.image})`;
        
        galleryModal.classList.remove('hide');
      })
      .catch(err => alert('Failed to retrieve lookbook details.'));
  }
}

function closeGalleryModal() {
  galleryModal.classList.add('hide');
}

// ImgBB upload for lookbook
triggerGalFileBtn.addEventListener('click', () => {
  galImageFile.click();
});

galImageFile.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const apiKey = storeSettings.imgbb_api_key || 'f2ac2dc4433d0a5a6cdb4831b9a0d68c';
  const uploadUrl = storeSettings.imgbb_upload_url || 'https://api.imgbb.com/1/upload';

  const formData = new FormData();
  formData.append('key', apiKey);
  formData.append('image', file);

  galUploadProgressContainer.classList.remove('hide');
  galUploadProgressFill.style.width = '0%';
  galUploadStatusText.innerText = 'Uploading to ImgBB (0%)...';
  triggerGalFileBtn.disabled = true;

  try {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', uploadUrl);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        galUploadProgressFill.style.width = `${percent}%`;
        galUploadStatusText.innerText = `Uploading to ImgBB (${percent}%)...`;
      }
    };

    xhr.onload = () => {
      triggerGalFileBtn.disabled = false;
      if (xhr.status >= 200 && xhr.status < 300) {
        const res = JSON.parse(xhr.responseText);
        if (res.data && res.data.url) {
          const uploadedUrl = res.data.url;
          galImageUrl.value = uploadedUrl;
          galleryImagePreview.style.backgroundImage = `url(${uploadedUrl})`;
          galUploadStatusText.innerText = 'Uploaded Successfully!';
          galUploadProgressFill.style.width = '100%';
          setTimeout(() => galUploadProgressContainer.classList.add('hide'), 2000);
        } else {
          alert('Upload failed: Invalid API Key or format');
          galUploadProgressContainer.classList.add('hide');
        }
      } else {
        alert('ImgBB upload returned status error. Check API key in Store Settings.');
        galUploadProgressContainer.classList.add('hide');
      }
    };

    xhr.onerror = () => {
      triggerGalFileBtn.disabled = false;
      alert('Network issue while communicating with ImgBB.');
      galUploadProgressContainer.classList.add('hide');
    };

    xhr.send(formData);

  } catch (err) {
    triggerGalFileBtn.disabled = false;
    alert('ImgBB upload request failed.');
    galUploadProgressContainer.classList.add('hide');
  }
});

galImageUrl.addEventListener('input', () => {
  const url = galImageUrl.value.trim();
  if (url) {
    galleryImagePreview.style.backgroundImage = `url(${url})`;
  } else {
    galleryImagePreview.style.backgroundImage = 'none';
  }
});

// Gallery submit
galleryFormElem.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const mode = formGalleryMode.value;
  const id = formGalleryId.value;
  
  const payload = {
    title: galTitle.value,
    category: galCategory.value,
    aspect: galAspect.value,
    image: galImageUrl.value.trim()
  };

  if (!payload.image) {
    alert('Please select or upload a lookbook image first.');
    return;
  }

  try {
    let url = `${API_BASE}/gallery`;
    let method = 'POST';

    if (mode === 'UPDATE') {
      url = `${API_BASE}/gallery/${id}`;
      method = 'PUT';
    }

    const res = await secureFetch(url, {
      method,
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      closeGalleryModal();
      loadGalleryList();
    } else {
      const err = await res.json();
      alert(`Error saving lookbook item: ${err.error}`);
    }
  } catch (err) {
    alert('Failed to communicate with Express backend.');
  }
});

// Delete Lookbook item
async function handleDeleteGallery(id) {
  if (!confirm(`Are you absolutely sure you want to delete Lookbook Item #${id} from the live gallery?`)) {
    return;
  }

  try {
    const res = await secureFetch(`${API_BASE}/gallery/${id}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      loadGalleryList();
    } else {
      alert('Delete operation rejected.');
    }
  } catch (err) {
    alert('Failed to connect to delete endpoint.');
  }
}

// App Bootstrap Init
window.addEventListener('DOMContentLoaded', checkAuth);
