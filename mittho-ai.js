/* ============================================================
   MITTHO-AI.JS — Floating AI Chat Widget
   La-Veta88 Café — mittho.ai integration
   ============================================================ */

(function () {
  'use strict';

  /* ── CONFIG ── */
  const MITTHO_CONFIG = {
    botName:       'Mittho AI',
    botEmoji:      '☕',
    userEmoji:     '👤',
    storageKey:    'mittho_chat_history',
    maxHistory:    40,         // max messages to keep in localStorage
    typingDelay:   { min: 600, max: 1400 }, // ms range for typing simulation
    autoGreet:     true,
    greetDelay:    1200,       // ms before auto-greeting on first open
  };

  /* ── CANNED RESPONSES (offline / fallback) ── */
  const CANNED = {
    menu: [
      "Our menu has coffees, teas, pastries, and light bites! ☕ Check out the <strong>Menu</strong> section — use the filter buttons to browse by category.",
      "We have 15+ coffee varieties including espresso, lattes, and cold brews. Scroll to the Menu section to explore! 🌿",
    ],
    hours: [
      "We're open <strong>Sunday–Friday 7am–9pm</strong> and <strong>Saturday 8am–10pm</strong>. Come visit us at New Road, Kathmandu! 📍",
    ],
    location: [
      "Find us at <strong>New Road, Kathmandu, Nepal</strong>. 🗺️ We're easy to spot — look for the green sign! Drop by or call us at +977 01-1234567.",
    ],
    preorder: [
      "You can pre-order your favourite items ahead of time — perfect for busy mornings! Head to the <strong>Services → Pre-order</strong> section or contact us at orders@kanchhikhobhatti.com. 🛍️",
    ],
    classes: [
      "We offer hands-on <strong>Baking & Coffee Classes</strong> for groups and individuals. Check the Services section or <a href='#contact'>contact us</a> to book a session! 👨‍🍳",
    ],
    contact: [
      "You can reach us at:<br>📞 +977 01-1234567<br>📧 info@kanchhikhobhatti.com<br>📍 New Road, Kathmandu<br><br>Or use the <a href='#contact'>Contact form</a> on this page!",
    ],
    price: [
      "Our prices are very reasonable! 😊 Browse the Menu section to see individual item prices. Most coffees range from Rs.150–Rs.450.",
    ],
    wifi: [
      "Yes! We have <strong>free high-speed Wi-Fi</strong> for all our guests. Perfect for working or studying. 💻☕",
    ],
    vegan: [
      "We have several <strong>vegan-friendly</strong> options including oat milk alternatives, plant-based bites, and herbal teas. Ask our staff for today's specials! 🌱",
    ],
    about: [
      "La-Veta88 is a cozy café at New Road, Kathmandu. We serve freshly brewed coffee, handcrafted dishes, and aim to be your perfect spot to relax, connect, and enjoy. We've been serving happy customers for <strong>10+ years</strong>! 🏡",
    ],
    events: [
      "We host private and corporate events with custom menus and professional staff. 🎉 Visit the <a href='#services'>Services section</a> or <a href='#contact'>contact us</a> for packages!",
    ],
    default: [
      "Great question! For the best answer, please <a href='#contact'>contact our team</a> directly — they'd love to help. ☕",
      "I'm not sure about that one, but our staff can help! Reach us at <a href='#contact'>the contact form</a> or call +977 01-1234567. 😊",
      "Hmm, I don't have that info right now. Try checking our <a href='#menu'>Menu</a> or <a href='#contact'>Contact</a> sections!",
    ],
  };

  /* ── QUICK SUGGESTIONS ── */
  const SUGGESTIONS = [
    { label: '☕ View Menu',     query: 'What is on the menu?' },
    { label: '🕐 Opening Hours', query: 'What are your opening hours?' },
    { label: '📍 Location',      query: 'Where are you located?' },
    { label: '🛍️ Pre-order',     query: 'How do I pre-order?' },
    { label: '📞 Contact',       query: 'How can I contact you?' },
    { label: '🌱 Vegan Options', query: 'Do you have vegan options?' },
  ];

  /* ── HELPERS ── */
  function getTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function matchResponse(text) {
    const t = text.toLowerCase();
    if (/menu|food|drink|coffee|latte|espresso|tea|pastry|cake|croissant|item|order/.test(t))  return pickRandom(CANNED.menu);
    if (/hour|open|close|time|when/.test(t))      return pickRandom(CANNED.hours);
    if (/locat|address|where|find|map|direction/.test(t)) return pickRandom(CANNED.location);
    if (/pre.?order|preorder|advance|pickup/.test(t))     return pickRandom(CANNED.preorder);
    if (/class|workshop|learn|bak|cook|barista/.test(t))  return pickRandom(CANNED.classes);
    if (/contact|email|phone|call|reach|number/.test(t))  return pickRandom(CANNED.contact);
    if (/price|cost|how much|rate|cheap|afford/.test(t))  return pickRandom(CANNED.price);
    if (/wifi|internet|connect|network/.test(t))          return pickRandom(CANNED.wifi);
    if (/vegan|plant|dairy.free|oat|lactose/.test(t))     return pickRandom(CANNED.vegan);
    if (/about|story|history|who are|what is la/.test(t)) return pickRandom(CANNED.about);
    if (/event|cater|party|corporate|host|private/.test(t)) return pickRandom(CANNED.events);
    return pickRandom(CANNED.default);
  }

  /* ── STATE ── */
  let isOpen     = false;
  let isTyping   = false;
  let hasGreeted = false;
  let messageHistory = [];   // { role, text, time }

  /* ── DOM REFERENCES (set after init) ── */
  let fab, panel, messagesEl, textarea, sendBtn, toastEl;

  /* ── LOCAL STORAGE ── */
  function saveHistory() {
    try {
      const trimmed = messageHistory.slice(-MITTHO_CONFIG.maxHistory);
      localStorage.setItem(MITTHO_CONFIG.storageKey, JSON.stringify(trimmed));
    } catch (_) {}
  }

  function loadHistory() {
    try {
      const raw = localStorage.getItem(MITTHO_CONFIG.storageKey);
      if (raw) messageHistory = JSON.parse(raw);
    } catch (_) { messageHistory = []; }
  }

  /* ── RENDER A MESSAGE BUBBLE ── */
  function renderMessage({ role, text, time }) {
    const wrap = document.createElement('div');
    wrap.className = `mittho-msg ${role}`;

    const avatarEl = document.createElement('div');
    avatarEl.className = 'mittho-msg-avatar';
    avatarEl.textContent = role === 'ai' ? MITTHO_CONFIG.botEmoji : MITTHO_CONFIG.userEmoji;

    const bubbleWrap = document.createElement('div');

    const bubble = document.createElement('div');
    bubble.className = 'mittho-bubble';
    bubble.innerHTML = text;

    const timeEl = document.createElement('div');
    timeEl.className = 'mittho-bubble-time';
    timeEl.textContent = time || getTime();

    bubbleWrap.appendChild(bubble);
    bubbleWrap.appendChild(timeEl);

    wrap.appendChild(avatarEl);
    wrap.appendChild(bubbleWrap);

    messagesEl.appendChild(wrap);
    scrollToBottom();
    return wrap;
  }

  /* ── TYPING INDICATOR ── */
  function showTyping() {
    const wrap = document.createElement('div');
    wrap.className = 'mittho-msg ai mittho-typing';
    wrap.id = 'mittho-typing-indicator';

    const avatarEl = document.createElement('div');
    avatarEl.className = 'mittho-msg-avatar';
    avatarEl.textContent = MITTHO_CONFIG.botEmoji;

    const bubble = document.createElement('div');
    bubble.className = 'mittho-bubble';
    bubble.innerHTML = '<div class="mittho-dot"></div><div class="mittho-dot"></div><div class="mittho-dot"></div>';

    wrap.appendChild(avatarEl);
    wrap.appendChild(bubble);
    messagesEl.appendChild(wrap);
    scrollToBottom();
  }

  function removeTyping() {
    const el = document.getElementById('mittho-typing-indicator');
    if (el) el.remove();
  }

  /* ── SCROLL ── */
  function scrollToBottom() {
    requestAnimationFrame(() => {
      messagesEl.scrollTop = messagesEl.scrollHeight;
    });
  }

  /* ── ADD MESSAGE (and save) ── */
  function addMessage(role, text) {
    const time = getTime();
    const entry = { role, text, time };
    messageHistory.push(entry);
    saveHistory();
    renderMessage(entry);
  }

  /* ── BOT REPLY ── */
  function botReply(userText) {
    if (isTyping) return;
    isTyping = true;
    sendBtn.disabled = true;

    const delay = Math.random() *
      (MITTHO_CONFIG.typingDelay.max - MITTHO_CONFIG.typingDelay.min) +
      MITTHO_CONFIG.typingDelay.min;

    showTyping();

    setTimeout(() => {
      removeTyping();
      const response = matchResponse(userText);
      addMessage('ai', response);
      isTyping = false;
      sendBtn.disabled = false;
      textarea.focus();
    }, delay);
  }

  /* ── SEND MESSAGE ── */
  function sendMessage() {
    const text = textarea.value.trim();
    if (!text || isTyping) return;

    textarea.value = '';
    autoResize();
    addMessage('user', text);
    botReply(text);
  }

  /* ── CHIP CLICK ── */
  function handleChip(query) {
    addMessage('user', query);
    botReply(query);
  }

  /* ── TOAST ── */
  function showToast(msg, duration = 2800) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    setTimeout(() => toastEl.classList.remove('show'), duration);
  }

  /* ── OPEN / CLOSE ── */
  function openPanel() {
    isOpen = true;
    panel.classList.add('open');
    fab.classList.add('open');
    fab.setAttribute('aria-expanded', 'true');
    panel.setAttribute('aria-hidden', 'false');

    // Auto-greet on first ever open
    if (MITTHO_CONFIG.autoGreet && !hasGreeted && messageHistory.length === 0) {
      hasGreeted = true;
      setTimeout(() => {
        botReply('hello');
      }, MITTHO_CONFIG.greetDelay);
    }

    setTimeout(() => textarea.focus(), 350);
  }

  function closePanel() {
    isOpen = false;
    panel.classList.remove('open');
    fab.classList.remove('open');
    fab.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-hidden', 'true');
  }

  function togglePanel() {
    isOpen ? closePanel() : openPanel();
  }

  /* ── CLEAR HISTORY ── */
  function clearHistory() {
    messageHistory = [];
    try { localStorage.removeItem(MITTHO_CONFIG.storageKey); } catch (_) {}
    // Remove all message nodes except welcome banner
    const msgs = messagesEl.querySelectorAll('.mittho-msg');
    msgs.forEach(m => m.remove());
    showToast('💬 Chat cleared!');
    hasGreeted = false;
  }

  /* ── AUTO-RESIZE TEXTAREA ── */
  function autoResize() {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  }

  /* ── BUILD DOM ── */
  function buildWidget() {
    /* ── FAB ── */
    fab = document.createElement('button');
    fab.className = 'mittho-fab';
    fab.id = 'mittho-fab';
    fab.setAttribute('aria-label', 'Open Mittho AI chat');
    fab.setAttribute('aria-expanded', 'false');
    fab.setAttribute('aria-controls', 'mittho-panel');
    fab.innerHTML = `
      <span class="mittho-notif-dot" id="mittho-notif-dot"></span>
      <span class="mittho-fab-icon icon-open" aria-hidden="true">☕</span>
      <span class="mittho-fab-icon icon-close" aria-hidden="true">✕</span>
    `;

    /* ── PANEL ── */
    panel = document.createElement('div');
    panel.className = 'mittho-panel';
    panel.id = 'mittho-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Mittho AI Chat');
    panel.setAttribute('aria-hidden', 'true');

    /* Header */
    const header = document.createElement('div');
    header.className = 'mittho-header';
    header.innerHTML = `
      <div class="mittho-header-left">
        <div class="mittho-avatar" aria-hidden="true">☕</div>
        <div class="mittho-header-info">
          <h4>${MITTHO_CONFIG.botName}</h4>
          <span><span class="mittho-status-dot"></span> Online · La-Veta88</span>
        </div>
      </div>
      <div class="mittho-header-actions">
        <button class="mittho-btn-icon mittho-clear-btn" id="mittho-clear" aria-label="Clear chat" title="Clear chat">🗑</button>
        <button class="mittho-btn-icon" id="mittho-close" aria-label="Close chat">✕</button>
      </div>
    `;

    /* Messages area */
    messagesEl = document.createElement('div');
    messagesEl.className = 'mittho-messages';
    messagesEl.id = 'mittho-messages';
    messagesEl.setAttribute('aria-live', 'polite');
    messagesEl.setAttribute('aria-relevant', 'additions');

    /* Welcome banner */
    const welcome = document.createElement('div');
    welcome.className = 'mittho-welcome';
    const chipHTML = SUGGESTIONS.map(s =>
      `<button class="mittho-chip" data-query="${s.query}">${s.label}</button>`
    ).join('');
    welcome.innerHTML = `
      <span class="mittho-welcome-emoji">☕</span>
      <h5>Welcome to La-Veta88!</h5>
      <p>Ask me anything about our menu, hours, location, or services. I'm here to help!</p>
      <div class="mittho-suggestions">${chipHTML}</div>
    `;
    messagesEl.appendChild(welcome);

    /* Input area */
    const inputArea = document.createElement('div');
    inputArea.className = 'mittho-input-area';
    inputArea.innerHTML = `
      <div class="mittho-textarea-wrap">
        <textarea
          class="mittho-textarea"
          id="mittho-textarea"
          placeholder="Ask about our menu, hours…"
          rows="1"
          aria-label="Type a message"
          autocomplete="off"
          maxlength="500"
        ></textarea>
      </div>
    `;

    sendBtn = document.createElement('button');
    sendBtn.className = 'mittho-send-btn';
    sendBtn.id = 'mittho-send';
    sendBtn.setAttribute('aria-label', 'Send message');
    sendBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
    inputArea.appendChild(sendBtn);

    /* Footer brand */
    const footerBrand = document.createElement('div');
    footerBrand.className = 'mittho-footer-brand';
    footerBrand.innerHTML = `Powered by <a href="mitthoai.html" target="_blank" rel="noopener">mittho.ai</a> · La-Veta88`;

    /* Toast */
    toastEl = document.createElement('div');
    toastEl.className = 'mittho-toast';
    toastEl.setAttribute('aria-live', 'assertive');

    /* Assemble panel */
    panel.appendChild(header);
    panel.appendChild(messagesEl);
    panel.appendChild(inputArea);
    panel.appendChild(footerBrand);

    /* Inject into DOM */
    document.body.appendChild(fab);
    document.body.appendChild(panel);
    document.body.appendChild(toastEl);

    /* Cache textarea ref */
    textarea = document.getElementById('mittho-textarea');
  }

  /* ── EVENT LISTENERS ── */
  function attachEvents() {
    /* FAB toggle */
    fab.addEventListener('click', togglePanel);

    /* Close button */
    document.getElementById('mittho-close').addEventListener('click', closePanel);

    /* Clear button */
    document.getElementById('mittho-clear').addEventListener('click', clearHistory);

    /* Send button */
    sendBtn.addEventListener('click', sendMessage);

    /* Textarea: send on Enter (not Shift+Enter) */
    textarea.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    /* Auto-resize textarea */
    textarea.addEventListener('input', autoResize);

    /* Chip clicks (event delegation) */
    messagesEl.addEventListener('click', e => {
      const chip = e.target.closest('.mittho-chip');
      if (chip) {
        const query = chip.getAttribute('data-query');
        if (query) handleChip(query);
      }
    });

    /* Close on Escape */
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && isOpen) closePanel();
    });

    /* Close when clicking outside panel and FAB */
    document.addEventListener('click', e => {
      if (
        isOpen &&
        !panel.contains(e.target) &&
        !fab.contains(e.target)
      ) {
        closePanel();
      }
    });

    /* Show notif dot after 3s if not opened */
    setTimeout(() => {
      const dot = document.getElementById('mittho-notif-dot');
      if (!isOpen && dot) dot.classList.remove('hidden');
    }, 3000);
  }

  /* ── RESTORE HISTORY ── */
  function restoreHistory() {
    loadHistory();
    if (messageHistory.length > 0) {
      hasGreeted = true;
      messageHistory.forEach(entry => renderMessage(entry));
    }
  }

  /* ── INIT ── */
  function init() {
    buildWidget();
    restoreHistory();
    attachEvents();

    // Show a toast hint after 5s on first visit
    const seenHint = localStorage.getItem('mittho_hint_seen');
    if (!seenHint) {
      setTimeout(() => {
        if (!isOpen) {
          showToast('☕ Hi! Ask me anything about La-Veta88!', 3500);
          localStorage.setItem('mittho_hint_seen', '1');
        }
      }, 5000);
    }
  }

  /* ── BOOT ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
