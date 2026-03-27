/**
 * ============================================================
 * cart.js — Shopping Cart System
 * ============================================================
 * Created by Kilo
 *
 * Handles:
 * - Cart state (add, remove, quantity, total)
 * - Cart dropdown toggle
 * - Badge count
 * - Renders cart items in dropdown
 * - Persists to localStorage
 * ============================================================
 */

(function () {
    'use strict';

    // ── STATE ───────────────────────────────────────────────
    var STORAGE_KEY = 'laveta88_cart';
    var cart = loadCart();

    function loadCart() {
        try {
            var data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            return [];
        }
    }

    function saveCart() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
        } catch (e) { /* quota exceeded — ignore */ }
    }

    // ── DOM REFS ────────────────────────────────────────────
    var cartWrapper  = document.getElementById('cart-wrapper');
    var cartToggle   = document.getElementById('cart-toggle');
    var cartDropdown = document.getElementById('cart-dropdown');
    var cartClose    = document.getElementById('cart-close');
    var cartItems    = document.getElementById('cart-items');
    var cartEmpty    = document.getElementById('cart-empty');
    var cartFooter   = document.getElementById('cart-footer');
    var cartBadge    = document.getElementById('cart-badge');
    var cartTotalEl  = document.getElementById('cart-total-price');
    var cartCheckout = document.getElementById('cart-checkout');

    if (!cartWrapper) return; // not on this page

    // ── TOGGLE CART DROPDOWN ────────────────────────────────
    function openCart() {
        cartDropdown.classList.add('open');
        cartToggle.setAttribute('aria-expanded', 'true');
    }

    function closeCart() {
        cartDropdown.classList.remove('open');
        cartToggle.setAttribute('aria-expanded', 'false');
    }

    function toggleCart() {
        cartDropdown.classList.contains('open') ? closeCart() : openCart();
    }

    cartToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleCart();
    });

    cartClose.addEventListener('click', function () {
        closeCart();
    });

    // close on outside click
    document.addEventListener('click', function (e) {
        if (!cartWrapper.contains(e.target)) {
            closeCart();
        }
    });

    // close on Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeCart();
    });

    // ── CART OPERATIONS ─────────────────────────────────────
    function addItem(name, price, img) {
        price = parseInt(price, 10) || 0;
        var existing = cart.find(function (item) { return item.name === name; });
        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ name: name, price: price, img: img || '', qty: 1 });
        }
        saveCart();
        render();
        openCart();

        // pulse the badge
        cartBadge.classList.add('pulse');
        setTimeout(function () { cartBadge.classList.remove('pulse'); }, 400);
    }

    function removeItem(name) {
        cart = cart.filter(function (item) { return item.name !== name; });
        saveCart();
        render();
    }

    function updateQty(name, delta) {
        var item = cart.find(function (i) { return i.name === name; });
        if (!item) return;
        item.qty += delta;
        if (item.qty <= 0) {
            removeItem(name);
            return;
        }
        saveCart();
        render();
    }

    function getTotal() {
        return cart.reduce(function (sum, item) { return sum + item.price * item.qty; }, 0);
    }

    function getTotalItems() {
        return cart.reduce(function (sum, item) { return sum + item.qty; }, 0);
    }

    // ── RENDER ──────────────────────────────────────────────
    function render() {
        var total = getTotal();
        var count = getTotalItems();

        // badge
        cartBadge.textContent = count;
        cartBadge.style.display = count > 0 ? 'flex' : 'none';

        // empty state vs items
        if (cart.length === 0) {
            cartEmpty.style.display = 'flex';
            cartFooter.style.display = 'none';
            // clear item elements (keep empty div)
            var existingItems = cartItems.querySelectorAll('.cart-item');
            existingItems.forEach(function (el) { el.remove(); });
            return;
        }

        cartEmpty.style.display = 'none';
        cartFooter.style.display = 'block';

        // rebuild item list
        var existingItems = cartItems.querySelectorAll('.cart-item');
        existingItems.forEach(function (el) { el.remove(); });

        cart.forEach(function (item) {
            var el = document.createElement('div');
            el.className = 'cart-item';
            el.innerHTML =
                '<div class="cart-item-img">' +
                    (item.img
                        ? '<img src="' + item.img + '" alt="' + item.name + '" onerror="this.parentNode.innerHTML=\'☕\'">'
                        : '☕') +
                '</div>' +
                '<div class="cart-item-info">' +
                    '<span class="cart-item-name">' + item.name + '</span>' +
                    '<span class="cart-item-price">Rs.' + item.price + '</span>' +
                '</div>' +
                '<div class="cart-item-qty">' +
                    '<button class="qty-btn qty-minus" data-name="' + item.name + '" type="button" aria-label="Decrease">&minus;</button>' +
                    '<span class="qty-val">' + item.qty + '</span>' +
                    '<button class="qty-btn qty-plus" data-name="' + item.name + '" type="button" aria-label="Increase">+</button>' +
                '</div>' +
                '<button class="cart-item-remove" data-name="' + item.name + '" type="button" aria-label="Remove">&times;</button>';

            cartItems.appendChild(el);
        });

        // total
        cartTotalEl.textContent = 'Rs.' + total;
    }

    // ── EVENT DELEGATION FOR QTY / REMOVE ───────────────────
    cartItems.addEventListener('click', function (e) {
        var target = e.target;
        var name = target.dataset.name;
        if (!name) return;

        if (target.classList.contains('qty-minus')) {
            updateQty(name, -1);
        } else if (target.classList.contains('qty-plus')) {
            updateQty(name, 1);
        } else if (target.classList.contains('cart-item-remove')) {
            removeItem(name);
        }
    });

    // ── CHECKOUT ────────────────────────────────────────────
    if (cartCheckout) {
        cartCheckout.addEventListener('click', function () {
            if (cart.length === 0) return;
            alert('Checkout — Total: Rs.' + getTotal() + '\n\nItems:\n' +
                cart.map(function (i) { return '  ' + i.name + ' x' + i.qty + ' = Rs.' + (i.price * i.qty); }).join('\n') +
                '\n\nThank you for your order!');
        });
    }

    // ── PUBLIC API (for menu.js to call) ────────────────────
    window.Cart = {
        add: addItem,
        remove: removeItem,
        updateQty: updateQty,
        getItems: function () { return cart; },
        getTotal: getTotal,
        getTotalItems: getTotalItems,
        clear: function () { cart = []; saveCart(); render(); }
    };

    // ── INITIAL RENDER ──────────────────────────────────────
    render();

})();
