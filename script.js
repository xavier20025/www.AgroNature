// Variables globales
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let promoCode = '';
let promoDiscount = 0;

// Base de données des produits
const products = [
    {
        id: 1,
        name: "Quinoa Bio Premium",
        category: "cereales",
        price: 8.99,
        image: "https://images.pexels.com/photos/5640746/pexels-photo-5640746.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Quinoa bio d'origine équitable, riche en protéines et sans gluten.",
        badge: "Bio"
    },
    {
        id: 2,
        name: "Lentilles Vertes Bio",
        category: "legumineuses",
        price: 6.49,
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Lentilles vertes cultivées sans pesticides, parfaites pour vos plats mijotés.",
        badge: "Nouveau"
    },
    {
        id: 3,
        name: "Huile d'Olive Extra Vierge",
        category: "huiles",
        price: 12.99,
        image: "https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=400",
        description: "Huile d'olive première pression à froid, extraction artisanale.",
        badge: "Premium"
    },
    {
        id: 4,
        name: "Avoine Complète Bio",
        category: "cereales",
        price: 4.99,
        image: "https://images.pexels.com/photos/4518653/pexels-photo-4518653.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Flocons d'avoine complets, idéaux pour un petit-déjeuner énergétique.",
        badge: "Bio"
    },
    {
        id: 5,
        name: "Pois Chiches Bio",
        category: "legumineuses",
        price: 5.49,
        image: "https://images.pexels.com/photos/6646962/pexels-photo-6646962.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Pois chiches bio, source excellente de protéines végétales.",
        badge: "Bio"
    },
    {
        id: 6,
        name: "Huile de Tournesol Bio",
        category: "huiles",
        price: 7.99,
        image: "https://images.pexels.com/photos/4750312/pexels-photo-4750312.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Huile de tournesol bio pressée à froid, goût neutre.",
        badge: "Bio"
    },
    {
        id: 7,
        name: "Conserve Tomates Bio",
        category: "conserves",
        price: 3.99,
        image: "https://images.pexels.com/photos/4750274/pexels-photo-4750274.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Tomates pelées en conserve, cultivées biologiquement.",
        badge: "Bio"
    },
    {
        id: 8,
        name: "Riz Complet Bio",
        category: "cereales",
        price: 6.99,
        image: "https://images.pexels.com/photos/4750274/pexels-photo-4750274.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Riz complet bio, conserve tous ses nutriments naturels.",
        badge: "Complet"
    },
    {
        id: 9,
        name: "Haricots Rouges Bio",
        category: "legumineuses",
        price: 4.79,
        image: "https://images.pexels.com/photos/4686816/pexels-photo-4686816.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Haricots rouges bio, parfaits pour vos chilis et salades.",
        badge: "Bio"
    },
    {
        id: 10,
        name: "Conserve Maïs Bio",
        category: "conserves",
        price: 2.99,
        image: "https://images.pexels.com/photos/1395319/pexels-photo-1395319.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Maïs doux en conserve, sans OGM ni conservateurs artificiels.",
        badge: "Sans OGM"
    },
    {
        id: 11,
        name: "Huile de Colza Bio",
        category: "huiles",
        price: 8.49,
        image: "https://images.pexels.com/photos/4750312/pexels-photo-4750312.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Huile de colza bio, riche en oméga-3 et vitamine E.",
        badge: "Omega-3"
    },
    {
        id: 12,
        name: "Millet Bio",
        category: "cereales",
        price: 5.99,
        image: "https://images.pexels.com/photos/4518653/pexels-photo-4518653.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Millet bio sans gluten, céréale ancestrale nutritive.",
        badge: "Sans Gluten"
    }
];

// Codes promotionnels
const promoCodes = {
    'WELCOME10': { discount: 10, message: 'Code promotionnel appliqué : 10% de réduction' },
    'BIO20': { discount: 20, message: 'Code BIO20 appliqué : 20% de réduction' },
    'FIRSTORDER': { discount: 15, message: 'Première commande : 15% de réduction' }
};

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    initializeEmailJS();
});

// Configuration EmailJS
function initializeEmailJS() {
    // Initialisation d'EmailJS avec votre clé publique
    emailjs.init("YOUR_PUBLIC_KEY"); // À remplacer par votre clé publique EmailJS
}

function initializeApp() {
    updateCartCount();
    initializeNavigation();
    initializeCurrentPage();
    initializeScrollAnimations();
}

// Navigation
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Fermer le menu mobile lors du clic sur un lien
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

function initializeCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch(currentPage) {
        case 'produits.html':
            initializeProductsPage();
            break;
        case 'panier.html':
            initializeCartPage();
            break;
        case 'contact.html':
            initializeContactPage();
            break;
        case 'publicite.html':
            initializeAdsPage();
            break;
    }
}

// Page des produits
function initializeProductsPage() {
    renderProducts();
    initializeFilters();
}

function renderProducts(filterCategory = 'all') {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    const filteredProducts = filterCategory === 'all' 
        ? products 
        : products.filter(product => product.category === filterCategory);
    
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-badge">${product.badge}</div>
            </div>
            <div class="product-info">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">${product.price.toFixed(2)} €</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    Ajouter au panier
                </button>
            </div>
        </div>
    `).join('');
    
    // Animation d'apparition
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('animate-on-scroll');
    });
}

function initializeFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Mise à jour des boutons actifs
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrage des produits
            const category = this.dataset.category;
            renderProducts(category);
            
            // Animation des nouveaux produits
            setTimeout(() => {
                const productCards = document.querySelectorAll('.product-card');
                productCards.forEach((card, index) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.transition = 'all 0.3s ease-out';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }, 50);
        });
    });
}

function getCategoryName(category) {
    const categories = {
        'cereales': 'Céréales',
        'legumineuses': 'Légumineuses',
        'huiles': 'Huiles',
        'conserves': 'Conserves'
    };
    return categories[category] || category;
}

// Gestion du panier
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartCount();
    showAddToCartNotification(product.name);
}

function addSpecialOfferToCart(offerId, price) {
    const offers = {
        'pack-cereales': {
            name: 'Pack Céréales Bio',
            image: 'https://images.pexels.com/photos/5640746/pexels-photo-5640746.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        'trio-huiles': {
            name: 'Trio Huiles Pressées à Froid',
            image: 'https://images.pexels.com/photos/6827578/pexels-photo-6827578.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
    };
    
    const offer = offers[offerId];
    if (!offer) return;
    
    const existingItem = cart.find(item => item.id === offerId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: offerId,
            name: offer.name,
            price: price,
            image: offer.image,
            quantity: 1,
            isSpecialOffer: true
        });
    }
    
    saveCart();
    updateCartCount();
    showAddToCartNotification(offer.name);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    
    if (window.location.pathname.includes('panier.html')) {
        renderCartItems();
        updateCartSummary();
    }
}

function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item && quantity > 0) {
        item.quantity = quantity;
        saveCart();
        updateCartCount();
        renderCartItems();
        updateCartSummary();
    } else if (quantity <= 0) {
        removeFromCart(productId);
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

function showAddToCartNotification(productName) {
    // Création d'une notification temporaire
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span>✅ ${productName} ajouté au panier</span>
        </div>
    `;
    
    // Styles inline pour la notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '90px',
        right: '20px',
        background: 'var(--success)',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: 'var(--border-radius)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        zIndex: '1001',
        animation: 'slideInRight 0.3s ease-out'
    });
    
    document.body.appendChild(notification);
    
    // Suppression après 3 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
    
    // Ajout des styles CSS pour les animations
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Page du panier
function initializeCartPage() {
    renderCartItems();
    updateCartSummary();
    initializeCheckout();
    initializePromoCode();
}

function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCart = document.getElementById('empty-cart');
    
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.style.display = 'none';
        if (emptyCart) emptyCart.style.display = 'block';
        return;
    }
    
    cartItemsContainer.style.display = 'block';
    if (emptyCart) emptyCart.style.display = 'none';
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
            </div>
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>Prix unitaire: ${item.price.toFixed(2)} €</p>
                <div class="cart-item-price">Total: ${(item.price * item.quantity).toFixed(2)} €</div>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity - 1})" type="button">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" 
                           onchange="updateQuantity('${item.id}', parseInt(this.value) || 1)" min="1">
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity + 1})" type="button">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart('${item.id}')" type="button">Supprimer</button>
            </div>
        </div>
    `).join('');
}

function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= 50 ? 0 : 7.90;
    const discount = subtotal * (promoDiscount / 100);
    const total = subtotal + shipping - discount;
    
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (subtotalElement) subtotalElement.textContent = `${subtotal.toFixed(2)} €`;
    if (shippingElement) {
        shippingElement.textContent = shipping === 0 ? 'Gratuite' : `${shipping.toFixed(2)} €`;
        shippingElement.style.color = shipping === 0 ? 'var(--success)' : 'inherit';
    }
    if (totalElement) totalElement.textContent = `${total.toFixed(2)} €`;
    
    if (checkoutBtn) {
        checkoutBtn.disabled = cart.length === 0;
    }
}

function initializePromoCode() {
    const applyPromoBtn = document.getElementById('apply-promo');
    const promoInput = document.getElementById('promo-input');
    const promoMessage = document.getElementById('promo-message');
    
    if (applyPromoBtn && promoInput && promoMessage) {
        applyPromoBtn.addEventListener('click', function() {
            const code = promoInput.value.trim().toUpperCase();
            
            if (promoCodes[code]) {
                promoCode = code;
                promoDiscount = promoCodes[code].discount;
                promoMessage.textContent = promoCodes[code].message;
                promoMessage.className = 'promo-message success';
                updateCartSummary();
            } else {
                promoMessage.textContent = 'Code promotionnel invalide';
                promoMessage.className = 'promo-message error';
                promoDiscount = 0;
                updateCartSummary();
            }
        });
        
        promoInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                applyPromoBtn.click();
            }
        });
    }
}

// Checkout
function initializeCheckout() {
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutModal = document.getElementById('checkout-modal');
    const closeModal = document.querySelector('.modal .close');
    const checkoutForm = document.getElementById('checkout-form');
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', openCheckoutModal);
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', closeCheckoutModal);
    }
    
    if (checkoutModal) {
        checkoutModal.addEventListener('click', function(e) {
            if (e.target === checkoutModal) {
                closeCheckoutModal();
            }
        });
    }
    
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', processOrder);
    }
}

function openCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    const modalSummary = document.getElementById('modal-cart-summary');
    
    if (modal && modalSummary) {
        // Mise à jour du résumé dans la modal
        updateModalCartSummary();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function updateModalCartSummary() {
    const modalSummary = document.getElementById('modal-cart-summary');
    if (!modalSummary) return;
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= 50 ? 0 : 7.90;
    const discount = subtotal * (promoDiscount / 100);
    const total = subtotal + shipping - discount;
    
    modalSummary.innerHTML = `
        <div class="summary-line">
            <span>Sous-total</span>
            <span>${subtotal.toFixed(2)} €</span>
        </div>
        ${discount > 0 ? `
            <div class="summary-line">
                <span>Réduction (${promoDiscount}%)</span>
                <span style="color: var(--success)">-${discount.toFixed(2)} €</span>
            </div>
        ` : ''}
        <div class="summary-line">
            <span>Livraison</span>
            <span style="color: ${shipping === 0 ? 'var(--success)' : 'inherit'}">${shipping === 0 ? 'Gratuite' : shipping.toFixed(2) + ' €'}</span>
        </div>
        <div class="summary-line total">
            <span>Total</span>
            <span>${total.toFixed(2)} €</span>
        </div>
    `;
}

function processOrder(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const orderData = {
        customer: {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            zipCode: formData.get('zipCode'),
            city: formData.get('city')
        },
        payment: formData.get('payment'),
        items: cart,
        subtotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        shipping: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) >= 50 ? 0 : 7.90,
        discount: promoDiscount,
        total: calculateTotal(),
        orderDate: new Date().toISOString(),
        orderNumber: generateOrderNumber()
    };
    
    // Simulation de traitement de commande
    showOrderProcessing();
    
    setTimeout(() => {
        // Sauvegarde de la commande
        saveOrder(orderData);
        
        // Envoi de l'email au propriétaire
        sendOrderEmailToOwner(orderData);
        
        // Vider le panier
        cart = [];
        saveCart();
        updateCartCount();
        
        // Afficher confirmation
        showOrderConfirmation(orderData.orderNumber);
        
        // Fermer la modal
        closeCheckoutModal();
        
        // Rediriger vers la page d'accueil après quelques secondes
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 5000);
        
    }, 2000);
}

function sendOrderEmailToOwner(orderData) {
    // Préparation des données pour l'email
    const emailData = {
        to_email: 'xaviergaye824@gmail.com',
        to_name: 'Propriétaire AgroNature',
        order_number: orderData.orderNumber,
        customer_name: `${orderData.customer.firstName} ${orderData.customer.lastName}`,
        customer_email: orderData.customer.email,
        customer_phone: orderData.customer.phone,
        customer_address: `${orderData.customer.address}, ${orderData.customer.zipCode} ${orderData.customer.city}`,
        order_items: formatOrderItemsForEmail(orderData.items),
        subtotal: orderData.subtotal.toFixed(2),
        shipping: orderData.shipping.toFixed(2),
        discount: orderData.discount > 0 ? `${orderData.discount}%` : 'Aucune',
        total: orderData.total.toFixed(2),
        payment_method: getPaymentMethodName(orderData.payment),
        order_date: new Date(orderData.orderDate).toLocaleString('fr-FR')
    };

    // Envoi de l'email via EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailData)
        .then(function(response) {
            console.log('Email envoyé avec succès au propriétaire:', response.status, response.text);
        }, function(error) {
            console.error('Erreur lors de l\'envoi de l\'email:', error);
            // Optionnel: afficher une notification d'erreur à l'utilisateur
        });
}

function formatOrderItemsForEmail(items) {
    return items.map(item => {
        const itemTotal = (item.price * item.quantity).toFixed(2);
        return `• ${item.name} - Quantité: ${item.quantity} - Prix unitaire: ${item.price.toFixed(2)}€ - Total: ${itemTotal}€`;
    }).join('\n');
}

function getPaymentMethodName(paymentMethod) {
    const methods = {
        'card': 'Carte Bancaire',
        'paypal': 'PayPal',
        'transfer': 'Virement Bancaire'
    };
    return methods[paymentMethod] || paymentMethod;
}

function calculateTotal() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= 50 ? 0 : 7.90;
    const discount = subtotal * (promoDiscount / 100);
    return subtotal + shipping - discount;
}

function generateOrderNumber() {
    return 'AG' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
}

function saveOrder(orderData) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(orders));
}

function showOrderProcessing() {
    const confirmBtn = document.querySelector('.confirm-btn');
    if (confirmBtn) {
        const originalText = confirmBtn.innerHTML;
        confirmBtn.innerHTML = '<div class="loading-spinner"></div> Traitement...';
        confirmBtn.disabled = true;
        
        // Ajouter styles pour le spinner si pas déjà présent
        if (!document.getElementById('spinner-styles')) {
            const style = document.createElement('style');
            style.id = 'spinner-styles';
            style.textContent = `
                .loading-spinner {
                    width: 20px;
                    height: 20px;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    border-top-color: white;
                    animation: spin 1s ease-in-out infinite;
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

function showOrderConfirmation(orderNumber) {
    const notification = document.createElement('div');
    notification.className = 'order-confirmation';
    notification.innerHTML = `
        <div class="confirmation-content">
            <div class="confirmation-icon">✅</div>
            <h3>Commande Confirmée !</h3>
            <p>Votre commande <strong>${orderNumber}</strong> a été enregistrée avec succès.</p>
            <p>Vous recevrez un email de confirmation sous peu.</p>
            <small>Redirection en cours...</small>
        </div>
    `;
    
    // Styles inline
    Object.assign(notification.style, {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'white',
        padding: '2rem',
        borderRadius: 'var(--border-radius)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        zIndex: '2001',
        textAlign: 'center',
        maxWidth: '400px',
        width: '90%'
    });
    
    const backdrop = document.createElement('div');
    Object.assign(backdrop.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.8)',
        zIndex: '2000',
        backdropFilter: 'blur(5px)'
    });
    
    document.body.appendChild(backdrop);
    document.body.appendChild(notification);
}

// Page de contact
function initializeContactPage() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
}

function handleContactForm(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('.submit-btn');
    const spinner = submitBtn.querySelector('.loading-spinner');
    const btnText = submitBtn.querySelector('span');
    
    // Animation de chargement
    spinner.style.display = 'inline-block';
    btnText.textContent = 'Envoi en cours...';
    submitBtn.disabled = true;
    
    // Simulation d'envoi
    setTimeout(() => {
        showContactSuccess();
        
        // Reset du formulaire
        e.target.reset();
        
        // Reset du bouton
        spinner.style.display = 'none';
        btnText.textContent = 'Envoyer le Message';
        submitBtn.disabled = false;
    }, 2000);
}

function showContactSuccess() {
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div style="position: fixed; top: 90px; right: 20px; background: var(--success); color: white; 
                    padding: 1rem 1.5rem; border-radius: var(--border-radius); box-shadow: 0 4px 20px rgba(0,0,0,0.2); 
                    z-index: 1001; animation: slideInRight 0.3s ease-out;">
            ✅ Message envoyé avec succès ! Nous vous répondrons sous 24h.
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Page de publicité
function initializeAdsPage() {
    initializeNewsletterForm();
    initializeImageUpload();
}

function initializeNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSignup);
    }
}

function handleNewsletterSignup(e) {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    const submitBtn = e.target.querySelector('button[type="submit"]');
    
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Inscription...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Sauvegarder l'email
        const newsletters = JSON.parse(localStorage.getItem('newsletters')) || [];
        if (!newsletters.includes(email)) {
            newsletters.push(email);
            localStorage.setItem('newsletters', JSON.stringify(newsletters));
        }
        
        showNewsletterSuccess();
        e.target.reset();
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

function showNewsletterSuccess() {
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div style="position: fixed; top: 90px; right: 20px; background: var(--success); color: white; 
                    padding: 1rem 1.5rem; border-radius: var(--border-radius); box-shadow: 0 4px 20px rgba(0,0,0,0.2); 
                    z-index: 1001; animation: slideInRight 0.3s ease-out;">
            📧 Inscription réussie ! Bienvenue dans notre newsletter.
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function initializeImageUpload() {
    const uploadInput = document.getElementById('upload-promo');
    const promoGallery = document.getElementById('promo-gallery');
    
    if (uploadInput && promoGallery) {
        uploadInput.addEventListener('change', handleImageUpload);
    }
}

function handleImageUpload(e) {
    const files = e.target.files;
    const promoGallery = document.getElementById('promo-gallery');
    
    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const promoItem = document.createElement('div');
                promoItem.className = 'promo-item';
                promoItem.innerHTML = `
                    <img src="${e.target.result}" alt="Nouvelle promotion">
                    <div class="promo-overlay">
                        <h4>Nouvelle Promotion</h4>
                        <p>Ajoutée par l'utilisateur</p>
                        <button onclick="this.closest('.promo-item').remove()" style="
                            background: var(--error); color: white; border: none; padding: 5px 10px; 
                            border-radius: 5px; margin-top: 10px; cursor: pointer;">
                            Supprimer
                        </button>
                    </div>
                `;
                
                promoGallery.appendChild(promoItem);
                
                // Animation d'apparition
                promoItem.style.opacity = '0';
                promoItem.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    promoItem.style.transition = 'all 0.3s ease-out';
                    promoItem.style.opacity = '1';
                    promoItem.style.transform = 'scale(1)';
                }, 100);
            };
            
            reader.readAsDataURL(file);
        }
    });
    
    // Reset de l'input
    e.target.value = '';
}

// Animations au scroll
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observer tous les éléments qui doivent être animés
    document.querySelectorAll('.value-card, .team-member, .service-card, .product-card, .process-step, .certification-card').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Fonctions utilitaires
function formatPrice(price) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
    }).format(price);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance et optimisations
function preloadImages() {
    const images = [
        'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg',
        ...products.map(product => product.image)
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Chargement différé des images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
        // Le navigateur supporte le lazy loading natif
        return;
    }
    
    // Fallback pour les navigateurs qui ne supportent pas le lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialisation finale
window.addEventListener('load', function() {
    preloadImages();
    lazyLoadImages();
    
    // Initialiser les interactions spécifiques aux pages
    initializePageInteractions();
});

// Interactions spécifiques aux pages
function initializePageInteractions() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentPage === 'services.html') {
        initializeServicesInteractions();
    }
}

function initializeServicesInteractions() {
    // Animation des cartes de service au survol
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 50px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 30px var(--shadow)';
        });
    });
    
    // Animation des zones de livraison
    const zones = document.querySelectorAll('.zone');
    zones.forEach(zone => {
        zone.addEventListener('click', function() {
            // Retirer la classe active de toutes les zones
            zones.forEach(z => z.classList.remove('zone-active'));
            // Ajouter la classe active à la zone cliquée
            this.classList.add('zone-active');
            
            // Animation de pulsation
            this.style.animation = 'pulse 0.6s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });
    
    // Interaction avec les options de contact
    const contactOptions = document.querySelectorAll('.contact-option');
    contactOptions.forEach(option => {
        option.addEventListener('click', function() {
            const contactType = this.querySelector('h4').textContent;
            showContactNotification(`Vous avez sélectionné: ${contactType}`);
        });
    });
}

function showContactNotification(message) {
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div style="position: fixed; top: 90px; right: 20px; background: var(--primary-color); color: white; 
                    padding: 1rem 1.5rem; border-radius: var(--border-radius); box-shadow: 0 4px 20px rgba(0,0,0,0.2); 
                    z-index: 1001; animation: slideInRight 0.3s ease-out;">
            ℹ️ ${message}
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Gestion des erreurs globales
window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript:', e.error);
});

// Export des fonctions principales pour les tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        addToCart,
        removeFromCart,
        updateQuantity,
        products,
        promoCodes
    };
}