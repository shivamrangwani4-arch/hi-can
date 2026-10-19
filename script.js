// Menu items data
const menuItems = [
  {
    id: 1,
    name: "Cheese Burst Pizza",
    category: "fastfood",
    price: 199,
    rating: "4.8 ★",
    desc: "Loads of mozzarella cheese with capsicum, onion & corn topping.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    name: "Special Veg Thali",
    category: "thali",
    price: 180,
    rating: "4.9 ★",
    desc: "Paneer sabzi, Dal Makhani, 4 Butter Roti, Jeera Rice, Raita & Gulab Jamun.",
    image: "https://images.unsplash.com/photo-1610057099433-d532123d4c0f?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    name: "Crispy Masala Dosa",
    category: "snacks",
    price: 120,
    rating: "4.7 ★",
    desc: "Golden crispy dosa served with spicy aloo masala, coconut chutney & sambar.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 4,
    name: "Paneer Butter Masala",
    category: "thali",
    price: 220,
    rating: "4.8 ★",
    desc: "Soft cottage cheese cubes in rich and creamy butter tomato gravy.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 5,
    name: "Veg Hakka Noodles & Manchurian",
    category: "fastfood",
    price: 150,
    rating: "4.6 ★",
    desc: "Spicy Indo-Chinese noodles served with vegetable Manchurian balls.",
    image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 6,
    name: "Pani Puri / Golgappe (8 pcs)",
    category: "snacks",
    price: 60,
    rating: "5.0 ★",
    desc: "Crispy puris filled with spicy mint water, sweet chutney and potato masala.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 7,
    name: "Crispy Veg Burger Combo",
    category: "fastfood",
    price: 130,
    rating: "4.5 ★",
    desc: "Crispy aloo tikki burger served with salted French fries.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 8,
    name: "Special Masala Chai",
    category: "beverages",
    price: 30,
    rating: "4.9 ★",
    desc: "Kadak adrak-elaichi desi kulhad chai for refreshment.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 9,
    name: "Thandi Mango Lassi",
    category: "beverages",
    price: 70,
    rating: "4.8 ★",
    desc: "Thick, creamy yogurt drink blended with sweet Alphonso mango pulp.",
    image: "https://images.unsplash.com/photo-1571006682898-11a57c5a9394?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 10,
    name: "Hot Samosa Chaat (2 pcs)",
    category: "snacks",
    price: 80,
    rating: "4.7 ★",
    desc: "Crushed samosas topped with spicy chole, curd, and tangy chutneys.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=60"
  }
];

// App State
let cart = [];
let currentCategory = 'all';

// DOM Elements
const foodGrid = document.getElementById('foodGrid');
const cartCount = document.getElementById('cartCount');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartTotal = document.getElementById('cartTotal');
const checkoutModal = document.getElementById('checkoutModal');
const orderSummaryBox = document.getElementById('orderSummaryBox');

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  renderMenu();
});

// Render food items into the grid
function renderMenu(items = menuItems) {
  if (items.length === 0) {
    foodGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #64748b;">
        <i class="fa-solid fa-utensils" style="font-size: 2.5rem; margin-bottom: 1rem; color: #fdba74;"></i>
        <h4>Koi dish nahi mili!</h4>
        <p>Kripya dusra naam search karein ya category badlein.</p>
      </div>
    `;
    return;
  }

  foodGrid.innerHTML = items.map(item => `
    <div class="food-card">
      <div class="card-img-wrapper">
        <img src="${item.image}" alt="${item.name}" loading="lazy">
        <span class="veg-badge"><i class="fa-solid fa-circle" style="font-size: 8px;"></i> 100% Veg</span>
      </div>
      <div class="card-content">
        <div class="card-top">
          <h4>${item.name}</h4>
          <span class="rating">${item.rating}</span>
        </div>
        <p class="desc">${item.desc}</p>
        <div class="card-bottom">
          <span class="price">₹${item.price}</span>
          <button class="add-btn" onclick="addToCart(${item.id})">
            <i class="fa-solid fa-plus"></i> Add
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Category filter
function setCategory(category) {
  currentCategory = category;
  
  // Update pill active classes
  const pills = document.querySelectorAll('.category-pills .pill');
  pills.forEach(pill => pill.classList.remove('active'));
  event.target.classList.add('active');

  filterMenu();
}

// Search and category unified filter
function filterMenu() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
  
  const filtered = menuItems.filter(item => {
    const matchesCategory = (currentCategory === 'all' || item.category === currentCategory);
    const matchesSearch = item.name.toLowerCase().includes(searchTerm) || 
                          item.desc.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  renderMenu(filtered);
}

// Cart Drawer open/close
function toggleCart() {
  cartDrawer.classList.toggle('open');
  cartOverlay.classList.toggle('open');
}

// Add Item to Cart
function addToCart(itemId) {
  const item = menuItems.find(m => m.id === itemId);
  const existing = cart.find(c => c.id === itemId);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  updateCartUI();
  showToast(`${item.name} cart mein add ho gaya!`);
}

// Change Quantity
function changeQty(itemId, change) {
  const itemIndex = cart.findIndex(c => c.id === itemId);
  if (itemIndex > -1) {
    cart[itemIndex].qty += change;
    if (cart[itemIndex].qty <= 0) {
      cart.splice(itemIndex, 1);
    }
  }
  updateCartUI();
}

// Update Cart Display
function updateCartUI() {
  // Update badge count
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = totalCount;

  // Render items in drawer
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart-msg">
        <i class="fa-solid fa-cart-shopping"></i>
        <p>Aapka cart khali hai.<br>Swadist khana add karein!</p>
      </div>
    `;
    cartTotal.textContent = '₹0';
    return;
  }

  let total = 0;
  cartItemsContainer.innerHTML = cart.map(item => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;
    return `
      <div class="cart-item">
        <div class="cart-item-info">
          <h5>${item.name}</h5>
          <span class="item-price">₹${item.price} x ${item.qty} = ₹${itemTotal}</span>
        </div>
        <div class="qty-control">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
          <span class="qty-count">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
        </div>
      </div>
    `;
  }).join('');

  cartTotal.textContent = `₹${total}`;
}

// Open Checkout Modal
function openCheckout() {
  if (cart.length === 0) {
    alert("Kripya pehle cart mein kuch items add karein!");
    return;
  }

  // Populate order summary
  let summaryHtml = "<strong>Aapka Order:</strong><br>";
  let total = 0;
  cart.forEach(item => {
    summaryHtml += `${item.name} x ${item.qty} = ₹${item.price * item.qty}<br>`;
    total += item.price * item.qty;
  });
  summaryHtml += `<br><strong>Kul Rashi (Total): ₹${total}</strong>`;
  orderSummaryBox.innerHTML = summaryHtml;

  checkoutModal.classList.add('open');
}

// Close Checkout Modal
function closeCheckout() {
  checkoutModal.classList.remove('open');
}

// Submit Order Form
function submitOrder(e) {
  e.preventDefault();

  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const table = document.getElementById('custTable').value.trim();

  let orderDetails = `*Naya Order - Shivam Food Court*%0A`;
  orderDetails += `*Naam:* ${name}%0A`;
  orderDetails += `*Phone:* ${phone}%0A`;
  orderDetails += `*Table / Address:* ${table}%0A%0A`;
  orderDetails += `*Items:*%0A`;

  let total = 0;
  cart.forEach(item => {
    orderDetails += `- ${item.name} x ${item.qty} (₹${item.price * item.qty})%0A`;
    total += item.price * item.qty;
  });

  orderDetails += `%0A*Total Amount:* ₹${total}`;

  // WhatsApp order URL (can replace with actual restaurant WhatsApp number)
  const whatsappUrl = `https://wa.me/919876543210?text=${orderDetails}`;

  alert(`Dhanyawad ${name} ji! Aapka ₹${total} ka order receive ho gaya hai.`);
  
  // Optional: open WhatsApp in new tab
  window.open(whatsappUrl, '_blank');

  // Reset cart & forms
  cart = [];
  updateCartUI();
  closeCheckout();
  toggleCart();
  document.getElementById('orderForm').reset();
}

// Simple Toast Notification
function showToast(msg) {
  const existing = document.getElementById('toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${msg}`;
  toast.style.cssText = `
    position: fixed;
    bottom: 25px;
    left: 50%;
    transform: translateX(-50%);
    background: #1e293b;
    color: white;
    padding: 10px 22px;
    border-radius: 30px;
    font-size: 0.9rem;
    box-shadow: 0 8px 20px rgba(0,0,0,0.25);
    z-index: 1000;
    display: flex;
    align-items: center;
    gap: 8px;
    animation: fadeInOut 2.5s forwards;
  `;

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}
