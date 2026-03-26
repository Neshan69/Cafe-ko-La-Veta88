

  // ══════════════════════════════════════════════════
  //  MENU ITEMS — Edit your items here
  //  👇 Change img: "images/YOUR-FILE-NAME.jpg"
  //     to match the actual image file you saved
  // ══════════════════════════════════════════════════

  const ITEMS = [

    // ── COFFEE ──────────────────────────────────────
    {
      category : "coffee",
      name     : "Signature Espresso",
      desc     : "Our single-origin dark roast, pulled slow for a velvety crema and bold chocolate finish.",
      price    : "350",
      badge    : "popular",   // "popular" | "new" | "seasonal" | "" (leave empty for none)
      img      : "images/expresso.jpg"   // 👈 change this to your image path
    },
    {
      category : "coffee",
      name     : "Oat Milk Latte",
      desc     : "Silky steamed oat milk swirled with our house espresso blend. Smooth, nutty, perfect.",
      price    : "520",
      badge    : "",
      img      : "images/oat milk coffee.jpg"  // 👈 change this to your image path
    },
    {
      category : "coffee",
      name     : "Honey Cardamom Flat White",
      desc     : "Espresso with local wildflower honey and a whisper of cardamom. Unexpectedly addictive.",
      price    : "580",
      badge    : "new",
      img      : "images/flat-white.jpg" // 👈 change this to your image path
    },
    {
      category : "coffee",
      name     : "Cold Brew Float",
      desc     : "24-hour cold brew over a scoop of vanilla bean ice cream. Summer in a glass.",
      price    : "650",
      badge    : "seasonal",
      img      : "images/cold-brew.jpg"  // 👈 change this to your image path
    },

    // ── TEA & MORE ──────────────────────────────────
    {
      category : "tea",
      name     : "Matcha Latte",
      desc     : "Ceremonial-grade matcha whisked with steamed oat or dairy milk. Earthy and calming.",
      price    : "500",
      badge    : "popular",
      img      : "images/matcha latte.jpg"     // 👈 change this to your image path
    },
    {
      category : "tea",
      name     : "Masala Chai",
      desc     : "Slow-simmered with fresh ginger, cinnamon, cloves and black peppercorn. Warming spice.",
      price    : "200",
      badge    : "",
      img      : "images/masala-chai.jpg" // 👈 change this to your image path
    },
    {
      category : "tea",
      name     : "Golden Turmeric Latte",
      desc     : "Turmeric, black pepper, coconut milk and a hint of maple. Anti-inflammatory bliss.",
      price    : "320",
      badge    : "new",
      img      : "images/turmeric-latte.jpg" // 👈 change this to your image path
    },

    // ── PASTRIES ────────────────────────────────────
    {
      category : "pastry",
      name     : "Almond Croissant",git 
      desc     : "Buttery layers filled with house-made frangipane and toasted almond slivers. Baked fresh.",
      price    : "420",
      badge    : "popular",
      img      : "images/croissant.jpg"  // 👈 change this to your image path
    },
    {
      category : "pastry",
      name     : "Cardamom Knot",
      desc     : "Scandinavian-inspired sweet roll with cardamom-brown-sugar swirls and a glaze finish.",
      price    : "280",
      badge    : "",
      img      : "images/cardamom-knot.jpg" // 👈 change this to your image path
    },
    {
      category : "pastry",
      name     : "Lemon Olive Oil Cake",
      desc     : "Moist, fragrant cake with fresh lemon zest and a citrus drizzle. Gluten-flexible.",
      price    : "380",
      badge    : "seasonal",
      img      : "images/lemon-cake.jpg" // 👈 change this to your image path
    },

    // ── BITES ───────────────────────────────────────
    {
      category : "food",
      name     : "Avocado Toast",
      desc     : "Sourdough, smashed avocado, chilli flakes, microgreens, and a drizzle of good olive oil.",
      price    : "750",
      badge    : "",
      img      : "images/avocado-toast.jpg" // 👈 change this to your image path
    },
    {
      category : "food",
      name     : "Mushroom Bruschetta",
      desc     : "Wild mushrooms sautéed in garlic butter on grilled sourdough with crème fraîche.",
      price    : "650",
      badge    : "new",
      img      : "images/bruschetta.jpg" // 👈 change this to your image path
    },

  ];

  // ══════════════════════════════════════════════════
  //  DO NOT EDIT BELOW — rendering & filter logic
  // ══════════════════════════════════════════════════

  const grid      = document.getElementById('menuGrid');
  const filterBar = document.getElementById('filterBar');

  function renderCards(filter) {
    const items = filter === 'all' ? ITEMS : ITEMS.filter(i => i.category === filter);
    grid.innerHTML = '';

    if (items.length === 0) {
      grid.innerHTML = '<div class="empty-state visible"><p>Nothing here yet — check back soon.</p></div>';
      return;
    }

    items.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = 'menu-card';
      card.dataset.category = item.category;
      card.style.animationDelay = `${idx * 0.07}s`;

      const badge = item.badge
        ? `<span class="card-badge ${item.badge}">${item.badge}</span>`
        : '';

      // Image — shows placeholder if file not found
      const imgHTML = item.img
        ? `<img class="card-img" src="${item.img}" alt="${item.name}"
               onerror="this.replaceWith(Object.assign(document.createElement('div'),
               {className:'card-img-placeholder',innerHTML:'🖼️<p>Add image path in JS</p>'}));">`
        : `<div class="card-img-placeholder">🖼️<p>Add image path in JS</p></div>`;

      card.innerHTML = `
        ${badge}
        ${imgHTML}
        <div class="card-body">
          <p class="card-category">${item.category}</p>
          <h3 class="card-name">${item.name}</h3>
          <p class="card-desc">${item.desc}</p>
          <div class="card-footer">
            <p class="card-price">Rs.${item.price}<span>NPR</span></p>
            <button class="card-add">+</button>
          </div>
        </div>`;

      card.querySelector('.card-add').addEventListener('click', function () {
        this.textContent = '✓';
        this.style.background = '#55883B';
        this.style.transform = 'scale(1.2)';
        setTimeout(() => {
          this.textContent = '+';
          this.style.background = '';
          this.style.transform = '';
        }, 1200);
      });

      grid.appendChild(card);
    });
  }

  filterBar.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderCards(btn.dataset.filter);
  });

  renderCards('all');
