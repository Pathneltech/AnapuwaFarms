import { useState, useEffect, useRef } from "react";

// ─── ICONS (inline SVG components) ─────────────────────────────────────────
const Icon = ({ name, size = 20, color = "currentColor" }) => {
  const icons = {
    menu: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />,
    x: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />,
    egg: <ellipse cx="12" cy="13" rx="6" ry="8" />,
    chicken: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z" />,
    star: <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />,
    phone: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />,
    mail: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
    location: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />,
    arrow: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />,
    check: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />,
    sun: <><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></>,
    moon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
    cart: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />,
    chat: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />,
    leaf: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3s7-1 14 6c0 0-1 9-9 10H5V3z" />,
    upload: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />,
    edit: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />,
    trash: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />,
    plus: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />,
    chart: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
    close: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />,
    whatsapp: null,
    fb: null,
    ig: null,
    tw: null,
  };

  if (name === "whatsapp") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.535 5.845L.057 23.571a.5.5 0 00.615.612l5.857-1.533A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.656-.505-5.187-1.385l-.372-.218-3.854 1.01 1.029-3.748-.24-.386A9.961 9.961 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  );

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  );
};

// ─── DATA ───────────────────────────────────────────────────────────────────
const PRODUCTS = [
  { id: 1, name: "Broiler Chickens", category: "Live Birds", price: "₦4,500", unit: "per bird", image: "🐔", desc: "Healthy, well-fed broilers raised in hygienic conditions. Available in various weight ranges.", badge: "Best Seller", color: "#e8f5e9" },
  { id: 2, name: "Layer Hens", category: "Live Birds", price: "₦3,800", unit: "per bird", image: "🐓", desc: "High-yield layers for consistent egg production. Vaccinated and disease-free.", badge: "Popular", color: "#fff8e1" },
  { id: 3, name: "Farm Fresh Eggs", category: "Eggs", price: "₦2,800", unit: "per crate (30)", image: "🥚", desc: "Fresh, nutritious eggs collected daily. Available in white and brown varieties.", badge: "Daily Fresh", color: "#fce4ec" },
  { id: 4, name: "Day-Old Chicks", category: "Chicks", price: "₦650", unit: "per chick", image: "🐣", desc: "Vaccinated day-old chicks from high-performance parent stock. Minimum order: 50 chicks.", badge: "In Stock", color: "#e3f2fd" },
  { id: 5, name: "Turkey (Live)", category: "Live Birds", price: "₦18,000", unit: "per bird", image: "🦃", desc: "Premium turkeys for festive seasons and special occasions. Healthy and well-grown.", badge: "Seasonal", color: "#f3e5f5" },
  { id: 6, name: "Poultry Feeds", category: "Feed", price: "₦22,500", unit: "per 25kg bag", image: "🌾", desc: "Nutritionally balanced feeds: starter, grower, finisher, and layer mash formulations.", badge: "Bulk Available", color: "#e8f5e9" },
];

const TESTIMONIALS = [
  { name: "Chidi Okonkwo", role: "Restaurant Owner, Lagos", rating: 5, text: "Anapuwa has been supplying our restaurant for 2 years. Their broilers are consistently top quality and delivery is always on time. Highly recommended!" },
  { name: "Blessing Adeyemi", role: "Food Distributor, Abuja", rating: 5, text: "Best poultry farm in the region! Their eggs are always fresh and the packaging is excellent. My customers love the quality and I love the bulk pricing." },
  { name: "Ibrahim Musa", role: "Supermarket Manager, Kano", rating: 5, text: "We've tried many suppliers but none match Anapuwa's consistency. Their day-old chicks have an amazing survival rate. Very professional team." },
  { name: "Funmi Alade", role: "Home Buyer, Ibadan", rating: 4, text: "Ordered via WhatsApp and got delivery the same day. The chickens were fresh and well-packaged. Will definitely order again!" },
];

const GALLERY_ITEMS = [
  { id: 1, label: "Farm Overview", emoji: "🏡", bg: "linear-gradient(135deg, #2d5a27, #4a8f3f)" },
  { id: 2, label: "Broiler Pens", emoji: "🐔", bg: "linear-gradient(135deg, #7b5e2a, #c49a3c)" },
  { id: 3, label: "Egg Collection", emoji: "🥚", bg: "linear-gradient(135deg, #8d4a1a, #d4813a)" },
  { id: 4, label: "Feeding Process", emoji: "🌾", bg: "linear-gradient(135deg, #1a5c1a, #3a8f2a)" },
  { id: 5, label: "Packaging Unit", emoji: "📦", bg: "linear-gradient(135deg, #2a4a7a, #3d7abf)" },
  { id: 6, label: "Our Team", emoji: "👨‍🌾", bg: "linear-gradient(135deg, #5a2a7a, #8a4abf)" },
];

const TEAM = [
  { name: "Emmanuel Anapuwa", role: "Founder & CEO", emoji: "👨‍💼", desc: "20+ years in poultry farming" },
  { name: "Grace Anapuwa", role: "Operations Manager", emoji: "👩‍💼", desc: "Expert in quality control" },
  { name: "Dr. Kola Balogun", role: "Farm Veterinarian", emoji: "👨‍⚕️", desc: "Ensures animal health & welfare" },
  { name: "Ngozi Eze", role: "Sales & Logistics", emoji: "👩‍🚀", desc: "Handles orders & delivery" },
];

const FAQS = [
  { q: "What is your minimum order quantity?", a: "For live birds, minimum is 10 birds. For eggs, minimum is 1 crate (30 eggs). For day-old chicks, minimum order is 50 chicks. Bulk discounts available." },
  { q: "Do you offer delivery services?", a: "Yes! We deliver across Lagos, Abuja, and surrounding states. Same-day delivery available within 50km of the farm. Contact us for delivery charges." },
  { q: "How do I place a bulk order?", a: "You can order via our website form, WhatsApp, or call us directly. Bulk orders receive 5-15% discounts depending on quantity." },
  { q: "Are your birds vaccinated?", a: "Absolutely. All our birds receive full vaccination schedules including Newcastle disease, Marek's, Gumboro, and more. Health certificates available on request." },
  { q: "What payment methods do you accept?", a: "We accept bank transfers, Paystack, Flutterwave, cash on delivery (within radius), and POS payments. Receipts provided for all transactions." },
];

// ─── STYLES ─────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --green-dark: #1a4a1a;
    --green-main: #2d7a2d;
    --green-light: #4caf50;
    --green-pale: #e8f5e9;
    --gold: #d4a017;
    --gold-light: #f0c040;
    --brown: #6b3a1f;
    --brown-light: #c49a3c;
    --cream: #fdf6e3;
    --white: #ffffff;
    --text-dark: #1a2410;
    --text-mid: #3d4a2e;
    --text-light: #7a8a6e;
    --border: #d4e4c4;
    --shadow: 0 4px 24px rgba(45,122,45,0.10);
    --shadow-lg: 0 12px 48px rgba(45,122,45,0.18);
    --radius: 16px;
    --radius-sm: 8px;
    --transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
  }

  .dark {
    --green-pale: #0f2a0f;
    --cream: #111a0d;
    --white: #1a2a14;
    --text-dark: #e8f5e0;
    --text-mid: #b8d4a8;
    --text-light: #7a9a6a;
    --border: #2a4a1a;
    --shadow: 0 4px 24px rgba(0,0,0,0.3);
    --shadow-lg: 0 12px 48px rgba(0,0,0,0.4);
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--text-dark);
    line-height: 1.6;
    transition: background 0.3s, color 0.3s;
    overflow-x: hidden;
  }

  h1, h2, h3, h4 { font-family: 'Playfair Display', serif; line-height: 1.2; }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    background: rgba(253,246,227,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    transition: var(--transition);
    padding: 0 24px;
  }
  .dark .nav { background: rgba(17,26,13,0.92); }
  .nav-inner { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; height: 72px; }
  .logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
  .logo-icon { width: 42px; height: 42px; background: var(--green-main); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 22px; }
  .logo-text { font-family: 'Playfair Display', serif; font-weight: 800; font-size: 18px; color: var(--green-dark); }
  .dark .logo-text { color: var(--green-light); }
  .logo-sub { font-size: 10px; font-weight: 400; color: var(--text-light); display: block; margin-top: -2px; }
  .nav-links { display: flex; align-items: center; gap: 4px; }
  .nav-link { padding: 8px 14px; border-radius: 8px; font-size: 14px; font-weight: 500; color: var(--text-mid); cursor: pointer; transition: var(--transition); border: none; background: none; }
  .nav-link:hover, .nav-link.active { background: var(--green-pale); color: var(--green-main); }
  .nav-cta { background: var(--green-main) !important; color: white !important; padding: 8px 20px !important; }
  .nav-cta:hover { background: var(--green-dark) !important; transform: translateY(-1px); }
  .nav-right { display: flex; align-items: center; gap: 8px; }
  .theme-btn { width: 36px; height: 36px; border-radius: 8px; border: 1px solid var(--border); background: var(--white); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: var(--transition); color: var(--text-mid); }
  .hamburger { display: none; width: 36px; height: 36px; border-radius: 8px; border: 1px solid var(--border); background: var(--white); cursor: pointer; align-items: center; justify-content: center; color: var(--text-mid); }
  .mobile-menu { display: none; flex-direction: column; gap: 4px; padding: 16px 0; border-top: 1px solid var(--border); }
  .mobile-menu.open { display: flex; }

  /* HERO */
  .hero {
    min-height: 100vh;
    background: linear-gradient(135deg, #0f2a0f 0%, #1a4a1a 40%, #2d7a2d 70%, #4a9a20 100%);
    position: relative; overflow: hidden;
    display: flex; align-items: center;
    padding-top: 72px;
  }
  .hero::before {
    content: ''; position: absolute; inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
  .hero-bg-circles { position: absolute; inset: 0; pointer-events: none; }
  .hero-circle { position: absolute; border-radius: 50%; opacity: 0.06; background: white; }
  .hero-inner { max-width: 1200px; margin: 0 auto; padding: 80px 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; position: relative; z-index: 2; }
  .hero-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2); color: #c8f0a0; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; letter-spacing: 0.5px; margin-bottom: 20px; }
  .hero-title { font-size: clamp(36px, 5vw, 64px); color: white; margin-bottom: 20px; font-weight: 800; }
  .hero-title span { color: var(--gold-light); display: block; }
  .hero-desc { color: rgba(255,255,255,0.8); font-size: 17px; margin-bottom: 36px; max-width: 480px; line-height: 1.7; }
  .hero-btns { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 48px; }
  .btn { display: inline-flex; align-items: center; gap: 8px; padding: 13px 26px; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; transition: var(--transition); border: none; text-decoration: none; font-family: 'DM Sans', sans-serif; }
  .btn-primary { background: var(--gold); color: #1a2410; }
  .btn-primary:hover { background: var(--gold-light); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(212,160,23,0.4); }
  .btn-outline { background: transparent; color: white; border: 2px solid rgba(255,255,255,0.4); }
  .btn-outline:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.7); }
  .btn-green { background: var(--green-main); color: white; }
  .btn-green:hover { background: var(--green-dark); transform: translateY(-2px); }
  .btn-white { background: white; color: var(--green-dark); }
  .btn-white:hover { background: var(--green-pale); transform: translateY(-2px); }
  .btn-ghost { background: var(--green-pale); color: var(--green-main); }
  .btn-ghost:hover { background: var(--green-main); color: white; }

  .hero-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(255,255,255,0.1); border-radius: 12px; overflow: hidden; }
  .hero-stat { background: rgba(0,0,0,0.15); padding: 20px 16px; text-align: center; }
  .hero-stat-num { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 800; color: var(--gold-light); }
  .hero-stat-label { font-size: 12px; color: rgba(255,255,255,0.6); margin-top: 2px; }

  .hero-visual { position: relative; }
  .hero-farm-card { background: rgba(255,255,255,0.08); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.15); border-radius: 20px; padding: 32px; text-align: center; }
  .hero-emoji-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px; }
  .hero-emoji-item { background: rgba(255,255,255,0.08); border-radius: 12px; padding: 16px; font-size: 32px; transition: var(--transition); cursor: default; }
  .hero-emoji-item:hover { background: rgba(255,255,255,0.15); transform: scale(1.05); }
  .hero-farm-name { color: white; font-family: 'Playfair Display', serif; font-size: 18px; margin-bottom: 6px; }
  .hero-farm-sub { color: rgba(255,255,255,0.6); font-size: 13px; }
  .floating-badge { position: absolute; background: white; border-radius: 12px; padding: 10px 16px; box-shadow: 0 8px 24px rgba(0,0,0,0.2); display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: var(--text-dark); }
  .floating-badge-1 { top: -16px; right: -16px; }
  .floating-badge-2 { bottom: -16px; left: -16px; }
  .fb-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--green-light); animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }

  /* SECTIONS */
  .section { padding: 96px 24px; }
  .section-inner { max-width: 1200px; margin: 0 auto; }
  .section-label { font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--green-main); margin-bottom: 12px; }
  .section-title { font-size: clamp(28px, 4vw, 44px); color: var(--text-dark); margin-bottom: 16px; }
  .section-desc { font-size: 17px; color: var(--text-light); max-width: 560px; line-height: 1.7; }
  .section-header { margin-bottom: 56px; }
  .section-header.center { text-align: center; }
  .section-header.center .section-desc { margin: 0 auto; }

  /* ABOUT */
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
  .about-visual { position: relative; }
  .about-main-img { width: 100%; aspect-ratio: 1; background: linear-gradient(135deg, #1a4a1a, #4a9a20); border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 120px; }
  .about-badge-float { position: absolute; bottom: 24px; right: -24px; background: var(--white); border: 1px solid var(--border); border-radius: 14px; padding: 16px 20px; box-shadow: var(--shadow); }
  .about-badge-num { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 800; color: var(--green-main); }
  .about-badge-txt { font-size: 12px; color: var(--text-light); }
  .about-values { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 32px; }
  .about-value { background: var(--green-pale); border-radius: var(--radius-sm); padding: 16px; display: flex; gap: 12px; align-items: flex-start; }
  .about-value-icon { width: 36px; height: 36px; background: var(--green-main); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .about-value-title { font-weight: 600; font-size: 14px; color: var(--text-dark); margin-bottom: 2px; }
  .about-value-desc { font-size: 13px; color: var(--text-light); }

  .team-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 64px; }
  .team-card { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius); padding: 28px 20px; text-align: center; transition: var(--transition); }
  .team-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
  .team-emoji { font-size: 48px; margin-bottom: 12px; }
  .team-name { font-size: 16px; font-weight: 700; color: var(--text-dark); margin-bottom: 4px; }
  .team-role { font-size: 13px; color: var(--green-main); font-weight: 600; margin-bottom: 6px; }
  .team-desc { font-size: 12px; color: var(--text-light); }

  /* PRODUCTS */
  .products-bg { background: var(--green-pale); }
  .products-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .product-card { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; transition: var(--transition); cursor: pointer; }
  .product-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }
  .product-img { height: 160px; display: flex; align-items: center; justify-content: center; font-size: 72px; position: relative; }
  .product-badge { position: absolute; top: 12px; right: 12px; background: var(--green-main); color: white; font-size: 10px; font-weight: 700; padding: 4px 10px; border-radius: 20px; letter-spacing: 0.5px; }
  .product-body { padding: 20px; }
  .product-cat { font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--green-main); margin-bottom: 6px; }
  .product-name { font-size: 18px; font-weight: 700; color: var(--text-dark); margin-bottom: 8px; }
  .product-desc { font-size: 13px; color: var(--text-light); margin-bottom: 16px; line-height: 1.5; }
  .product-footer { display: flex; align-items: center; justify-content: space-between; }
  .product-price { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 800; color: var(--green-dark); }
  .dark .product-price { color: var(--green-light); }
  .product-unit { font-size: 12px; color: var(--text-light); }
  .product-btn { background: var(--green-pale); color: var(--green-main); border: none; padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; transition: var(--transition); font-family: 'DM Sans', sans-serif; }
  .product-btn:hover { background: var(--green-main); color: white; }

  /* ORDER */
  .order-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
  .form-card { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius); padding: 36px; box-shadow: var(--shadow); }
  .form-title { font-size: 22px; margin-bottom: 24px; color: var(--text-dark); }
  .form-group { margin-bottom: 18px; }
  .form-label { display: block; font-size: 13px; font-weight: 600; color: var(--text-mid); margin-bottom: 6px; }
  .form-input { width: 100%; padding: 11px 14px; border: 1.5px solid var(--border); border-radius: var(--radius-sm); font-size: 14px; background: var(--cream); color: var(--text-dark); transition: var(--transition); font-family: 'DM Sans', sans-serif; outline: none; }
  .form-input:focus { border-color: var(--green-light); box-shadow: 0 0 0 3px rgba(76,175,80,0.15); }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .form-submit { width: 100%; padding: 14px; background: var(--green-main); color: white; border: none; border-radius: var(--radius-sm); font-size: 15px; font-weight: 700; cursor: pointer; transition: var(--transition); font-family: 'DM Sans', sans-serif; }
  .form-submit:hover { background: var(--green-dark); transform: translateY(-2px); }
  .whatsapp-order { background: #25D366; color: white; border: none; border-radius: var(--radius-sm); padding: 14px 20px; font-size: 15px; font-weight: 700; cursor: pointer; width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: 12px; transition: var(--transition); font-family: 'DM Sans', sans-serif; }
  .whatsapp-order:hover { background: #1ba354; transform: translateY(-2px); }
  .order-info { display: flex; flex-direction: column; gap: 20px; }
  .info-card { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius); padding: 24px; }
  .info-card-title { font-weight: 700; color: var(--text-dark); margin-bottom: 8px; font-size: 15px; }
  .info-card-text { font-size: 13px; color: var(--text-light); line-height: 1.6; }
  .steps { display: flex; flex-direction: column; gap: 12px; margin-top: 8px; }
  .step { display: flex; align-items: flex-start; gap: 12px; }
  .step-num { width: 24px; height: 24px; border-radius: 50%; background: var(--green-main); color: white; font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
  .step-text { font-size: 13px; color: var(--text-light); }

  /* GALLERY */
  .gallery-bg { background: var(--white); }
  .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .gallery-item { border-radius: var(--radius); overflow: hidden; aspect-ratio: 4/3; position: relative; cursor: pointer; transition: var(--transition); }
  .gallery-item:hover { transform: scale(1.02); box-shadow: var(--shadow-lg); }
  .gallery-item:hover .gallery-overlay { opacity: 1; }
  .gallery-bg-img { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 64px; }
  .gallery-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: flex-end; padding: 20px; opacity: 0; transition: var(--transition); }
  .gallery-label { color: white; font-weight: 700; font-size: 15px; }

  /* TESTIMONIALS */
  .testimonials-bg { background: linear-gradient(135deg, var(--green-dark), var(--green-main)); }
  .testimonials-bg .section-label { color: var(--gold-light); }
  .testimonials-bg .section-title { color: white; }
  .testimonials-bg .section-desc { color: rgba(255,255,255,0.7); }
  .testimonials-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
  .testimonial-card { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: var(--radius); padding: 28px; transition: var(--transition); }
  .testimonial-card:hover { background: rgba(255,255,255,0.12); transform: translateY(-4px); }
  .stars { display: flex; gap: 3px; margin-bottom: 14px; }
  .star { color: var(--gold-light); }
  .testimonial-text { color: rgba(255,255,255,0.85); font-size: 15px; line-height: 1.7; margin-bottom: 20px; font-style: italic; }
  .testimonial-author { display: flex; align-items: center; gap: 12px; }
  .author-avatar { width: 44px; height: 44px; border-radius: 50%; background: rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; font-size: 22px; }
  .author-name { font-weight: 700; color: white; font-size: 14px; }
  .author-role { font-size: 12px; color: rgba(255,255,255,0.6); }

  /* FAQ */
  .faq-item { border: 1px solid var(--border); border-radius: var(--radius-sm); overflow: hidden; margin-bottom: 12px; }
  .faq-q { padding: 18px 20px; font-weight: 600; font-size: 15px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; background: var(--white); color: var(--text-dark); transition: var(--transition); }
  .faq-q:hover { background: var(--green-pale); }
  .faq-q.open { background: var(--green-pale); color: var(--green-main); }
  .faq-a { padding: 0 20px; max-height: 0; overflow: hidden; transition: max-height 0.3s ease, padding 0.3s ease; font-size: 14px; color: var(--text-light); line-height: 1.6; background: var(--green-pale); }
  .faq-a.open { max-height: 120px; padding: 16px 20px; }
  .faq-icon { font-size: 20px; font-weight: 400; transition: transform 0.3s; }
  .faq-icon.open { transform: rotate(45deg); }

  /* CONTACT */
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
  .map-placeholder { background: linear-gradient(135deg, #1a4a1a, #2d7a2d); border-radius: var(--radius); height: 300px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; color: white; margin-bottom: 24px; }
  .contact-info { display: flex; flex-direction: column; gap: 16px; }
  .contact-info-item { display: flex; align-items: flex-start; gap: 14px; }
  .contact-icon { width: 42px; height: 42px; background: var(--green-pale); border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: var(--green-main); }
  .contact-info-label { font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--green-main); margin-bottom: 2px; }
  .contact-info-val { font-size: 14px; color: var(--text-dark); font-weight: 500; }
  .social-links { display: flex; gap: 10px; margin-top: 8px; }
  .social-btn { width: 40px; height: 40px; border-radius: 10px; border: 1.5px solid var(--border); background: var(--white); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: var(--transition); font-size: 18px; }
  .social-btn:hover { background: var(--green-pale); border-color: var(--green-light); transform: translateY(-2px); }

  /* ADMIN */
  .admin-bg { background: var(--cream); }
  .admin-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 32px; }
  .admin-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 32px; }
  .admin-stat-card { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px; }
  .admin-stat-val { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 800; color: var(--green-main); }
  .admin-stat-label { font-size: 13px; color: var(--text-light); margin-top: 4px; }
  .admin-tabs { display: flex; gap: 8px; margin-bottom: 24px; }
  .admin-tab { padding: 8px 18px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; border: 1.5px solid var(--border); background: var(--white); color: var(--text-mid); transition: var(--transition); }
  .admin-tab.active { background: var(--green-main); color: white; border-color: var(--green-main); }
  .admin-table { width: 100%; background: var(--white); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
  .admin-table table { width: 100%; border-collapse: collapse; }
  .admin-table th { background: var(--green-pale); padding: 12px 16px; font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--green-main); text-align: left; }
  .admin-table td { padding: 14px 16px; font-size: 14px; color: var(--text-dark); border-top: 1px solid var(--border); }
  .admin-table tr:hover td { background: var(--green-pale); }
  .status-badge { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; }
  .status-new { background: #e3f2fd; color: #1565c0; }
  .status-processing { background: #fff8e1; color: #e65100; }
  .status-done { background: var(--green-pale); color: var(--green-dark); }
  .action-btns { display: flex; gap: 6px; }
  .action-btn { width: 30px; height: 30px; border-radius: 6px; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: var(--transition); }
  .action-edit { background: var(--green-pale); color: var(--green-main); }
  .action-del { background: #fce4ec; color: #c62828; }

  /* FOOTER */
  .footer { background: var(--green-dark); color: rgba(255,255,255,0.8); padding: 64px 24px 32px; }
  .footer-inner { max-width: 1200px; margin: 0 auto; }
  .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 48px; }
  .footer-brand { color: var(--gold-light); font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 800; margin-bottom: 12px; }
  .footer-desc { font-size: 13px; line-height: 1.7; color: rgba(255,255,255,0.6); margin-bottom: 20px; }
  .footer-col-title { font-weight: 700; font-size: 14px; color: white; margin-bottom: 16px; letter-spacing: 0.5px; }
  .footer-link { display: block; font-size: 13px; color: rgba(255,255,255,0.6); margin-bottom: 8px; cursor: pointer; transition: var(--transition); }
  .footer-link:hover { color: var(--gold-light); }
  .footer-bottom { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; display: flex; justify-content: space-between; align-items: center; }
  .footer-copy { font-size: 13px; color: rgba(255,255,255,0.4); }
  .newsletter { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 20px; margin-bottom: 20px; }
  .newsletter-title { font-weight: 700; color: white; font-size: 14px; margin-bottom: 10px; }
  .newsletter-form { display: flex; gap: 8px; }
  .newsletter-input { flex: 1; padding: 9px 12px; border-radius: 7px; border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.08); color: white; font-size: 13px; outline: none; font-family: 'DM Sans', sans-serif; }
  .newsletter-input::placeholder { color: rgba(255,255,255,0.4); }
  .newsletter-btn { padding: 9px 16px; background: var(--gold); color: #1a2410; border: none; border-radius: 7px; font-weight: 700; font-size: 13px; cursor: pointer; transition: var(--transition); font-family: 'DM Sans', sans-serif; }
  .newsletter-btn:hover { background: var(--gold-light); }

  /* WHATSAPP FLOAT */
  .whatsapp-float { position: fixed; bottom: 28px; right: 28px; width: 56px; height: 56px; border-radius: 50%; background: #25D366; box-shadow: 0 4px 20px rgba(37,211,102,0.4); display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 999; transition: var(--transition); animation: float-pulse 3s infinite; }
  .whatsapp-float:hover { transform: scale(1.1); box-shadow: 0 8px 32px rgba(37,211,102,0.6); }
  @keyframes float-pulse { 0%,100%{box-shadow:0 4px 20px rgba(37,211,102,0.4)} 50%{box-shadow:0 4px 32px rgba(37,211,102,0.7)} }
  .whatsapp-tooltip { position: absolute; right: 68px; background: #1a2410; color: white; padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 600; white-space: nowrap; opacity: 0; pointer-events: none; transition: var(--transition); }
  .whatsapp-float:hover .whatsapp-tooltip { opacity: 1; }

  /* SUCCESS MODAL */
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 20px; animation: fadeIn 0.2s; }
  .modal-box { background: var(--white); border-radius: var(--radius); padding: 40px; max-width: 400px; width: 100%; text-align: center; animation: slideUp 0.3s; }
  .modal-icon { font-size: 56px; margin-bottom: 16px; }
  .modal-title { font-size: 22px; font-weight: 800; color: var(--text-dark); margin-bottom: 8px; }
  .modal-text { font-size: 14px; color: var(--text-light); line-height: 1.6; margin-bottom: 24px; }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  @keyframes slideUp { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }

  /* RESPONSIVE */
  @media (max-width: 900px) {
    .hero-inner { grid-template-columns: 1fr; }
    .hero-visual { display: none; }
    .about-grid { grid-template-columns: 1fr; }
    .products-grid { grid-template-columns: repeat(2, 1fr); }
    .team-grid { grid-template-columns: repeat(2, 1fr); }
    .testimonials-grid { grid-template-columns: 1fr; }
    .contact-grid { grid-template-columns: 1fr; }
    .order-grid { grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr 1fr; }
    .admin-stats { grid-template-columns: repeat(2, 1fr); }
    .gallery-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 600px) {
    .nav-links { display: none; }
    .hamburger { display: flex; }
    .products-grid { grid-template-columns: 1fr; }
    .team-grid { grid-template-columns: 1fr 1fr; }
    .footer-grid { grid-template-columns: 1fr; }
    .admin-stats { grid-template-columns: repeat(2, 1fr); }
    .form-row { grid-template-columns: 1fr; }
    .gallery-grid { grid-template-columns: 1fr; }
    .section { padding: 64px 20px; }
  }

  /* PAGE TRANSITIONS */
  .page { animation: pageIn 0.4s ease; }
  @keyframes pageIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }

  select.form-input option { background: var(--cream); color: var(--text-dark); }
`;

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function AnapuwaPoultryFarms() {
  const [page, setPage] = useState("home");
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);
  const [orderForm, setOrderForm] = useState({ name: "", phone: "", product: "", qty: "", location: "", notes: "" });
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [newsletter, setNewsletter] = useState("");
  const [modal, setModal] = useState(null);
  const [adminTab, setAdminTab] = useState("orders");
  const [adminOrders] = useState([
    { id: "#1042", name: "Chidi Okonkwo", product: "Broiler Chickens", qty: 50, status: "processing", date: "May 19, 2026" },
    { id: "#1041", name: "Blessing Adeyemi", product: "Farm Fresh Eggs", qty: 10, status: "done", date: "May 18, 2026" },
    { id: "#1040", name: "Ngozi Umeh", product: "Day-Old Chicks", qty: 100, status: "new", date: "May 18, 2026" },
    { id: "#1039", name: "Taiwo Salami", product: "Poultry Feeds", qty: 5, status: "done", date: "May 17, 2026" },
  ]);

  useEffect(() => {
    document.body.className = dark ? "dark" : "";
  }, [dark]);

  const nav = (p) => { setPage(p); setMenuOpen(false); window.scrollTo(0, 0); };

  const handleOrder = (e) => {
    e.preventDefault();
    const msg = `Hello Anapuwa Poultry Farms! 🐔\n\nNew Order:\nName: ${orderForm.name}\nPhone: ${orderForm.phone}\nProduct: ${orderForm.product}\nQty: ${orderForm.qty}\nDelivery: ${orderForm.location}\nNotes: ${orderForm.notes || "None"}`;
    setModal({ icon: "✅", title: "Order Submitted!", text: "Your order has been received. We'll contact you within 30 minutes to confirm details." });
    setOrderForm({ name: "", phone: "", product: "", qty: "", location: "", notes: "" });
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent("Hello! I'd like to place an order from Anapuwa Poultry Farms. 🐔");
    window.open(`https://wa.me/2348012345678?text=${msg}`, "_blank");
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setModal({ icon: "📬", title: "Message Sent!", text: "Thank you for reaching out. Our team will respond within 24 hours." });
    setContactForm({ name: "", email: "", message: "" });
  };

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "products", label: "Products" },
    { id: "order", label: "Order" },
    { id: "gallery", label: "Gallery" },
    { id: "contact", label: "Contact" },
    { id: "admin", label: "Admin" },
  ];

  return (
    <>
      <style>{styles}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-inner">
          <span className="logo" onClick={() => nav("home")} style={{ cursor: "pointer" }}>
            <div className="logo-icon">🐔</div>
            <div>
              <div className="logo-text">Anapuwa</div>
              <span className="logo-sub">Poultry Farms</span>
            </div>
          </span>
          <div className="nav-links">
            {navLinks.slice(0, 6).map(l => (
              <button key={l.id} className={`nav-link${page === l.id ? " active" : ""}`} onClick={() => nav(l.id)}>{l.label}</button>
            ))}
            <button className="nav-link nav-cta btn" onClick={() => nav("admin")}>⚙ Admin</button>
          </div>
          <div className="nav-right">
            <button className="theme-btn" onClick={() => setDark(!dark)} title="Toggle theme">
              <Icon name={dark ? "sun" : "moon"} size={16} />
            </button>
            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? "x" : "menu"} size={18} />
            </button>
          </div>
        </div>
        <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
          {navLinks.map(l => (
            <button key={l.id} className={`nav-link${page === l.id ? " active" : ""}`} onClick={() => nav(l.id)}>{l.label}</button>
          ))}
        </div>
      </nav>

      {/* PAGES */}
      <div className="page" key={page}>
        {page === "home" && <HomePage nav={nav} />}
        {page === "about" && <AboutPage />}
        {page === "products" && <ProductsPage nav={nav} setModal={setModal} />}
        {page === "order" && <OrderPage orderForm={orderForm} setOrderForm={setOrderForm} handleOrder={handleOrder} handleWhatsApp={handleWhatsApp} />}
        {page === "gallery" && <GalleryPage />}
        {page === "contact" && <ContactPage contactForm={contactForm} setContactForm={setContactForm} handleContactSubmit={handleContactSubmit} />}
        {page === "admin" && <AdminPage adminTab={adminTab} setAdminTab={setAdminTab} adminOrders={adminOrders} />}
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">🐔 Anapuwa Poultry Farms</div>
              <p className="footer-desc">Premium poultry products from our farm to your table. Healthy birds, fresh eggs, and quality feeds since 2004.</p>
              <div className="newsletter">
                <div className="newsletter-title">📧 Subscribe for Updates & Deals</div>
                <div className="newsletter-form">
                  <input className="newsletter-input" placeholder="Your email address" value={newsletter} onChange={e => setNewsletter(e.target.value)} />
                  <button className="newsletter-btn" onClick={() => { setModal({ icon: "📧", title: "Subscribed!", text: "You'll receive farm updates, seasonal deals, and special offers." }); setNewsletter(""); }}>Join</button>
                </div>
              </div>
              <div className="social-links">
                {["📘", "📸", "🐦", "▶️"].map((s, i) => <button key={i} className="social-btn" title="Social">{s}</button>)}
              </div>
            </div>
            <div>
              <div className="footer-col-title">Quick Links</div>
              {navLinks.map(l => <span key={l.id} className="footer-link" onClick={() => nav(l.id)}>{l.label}</span>)}
            </div>
            <div>
              <div className="footer-col-title">Products</div>
              {["Broiler Chickens", "Layer Hens", "Farm Fresh Eggs", "Day-Old Chicks", "Turkey (Live)", "Poultry Feeds"].map(p => (
                <span key={p} className="footer-link" onClick={() => nav("products")}>{p}</span>
              ))}
            </div>
            <div>
              <div className="footer-col-title">Contact</div>
              <span className="footer-link">📞 +234 801 234 5678</span>
              <span className="footer-link">📧 info@anapuwa.com</span>
              <span className="footer-link">📍 Farm Road, Ogun State</span>
              <span className="footer-link">⏰ Mon–Sat 7am–7pm</span>
              <div style={{ marginTop: 16, padding: "8px 14px", background: "#25D366", borderRadius: 8, color: "white", fontSize: 13, fontWeight: 700, cursor: "pointer", textAlign: "center" }} onClick={handleWhatsApp}>
                💬 Chat on WhatsApp
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span className="footer-copy">© 2026 Anapuwa Poultry Farms. All rights reserved.</span>
            <span className="footer-copy">Premium Poultry Products | Est. 2004</span>
          </div>
        </div>
      </footer>

      {/* WHATSAPP FLOAT */}
      <div className="whatsapp-float" onClick={handleWhatsApp}>
        <span className="whatsapp-tooltip">Order via WhatsApp</span>
        <Icon name="whatsapp" size={28} color="white" />
      </div>

      {/* MODAL */}
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-icon">{modal.icon}</div>
            <div className="modal-title">{modal.title}</div>
            <p className="modal-text">{modal.text}</p>
            <button className="btn btn-green" style={{ width: "100%" }} onClick={() => setModal(null)}>Done</button>
          </div>
        </div>
      )}
    </>
  );
}

// ─── HOME PAGE ───────────────────────────────────────────────────────────────
function HomePage({ nav }) {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-circles">
          <div className="hero-circle" style={{ width: 600, height: 600, top: -200, right: -100 }} />
          <div className="hero-circle" style={{ width: 300, height: 300, bottom: -100, left: -50 }} />
        </div>
        <div className="hero-inner">
          <div>
            <div className="hero-badge">🌿 &nbsp;Est. 2004 · Ogun State, Nigeria</div>
            <h1 className="hero-title">
              Premium Poultry,
              <span>Fresh from Our Farm</span>
              to Your Table
            </h1>
            <p className="hero-desc">
              Anapuwa Poultry Farms raises healthy, well-fed birds in hygienic conditions. From farm-fresh eggs to premium broilers — quality you can taste.
            </p>
            <div className="hero-btns">
              <button className="btn btn-primary" onClick={() => nav("order")}>🛒 Order Now <Icon name="arrow" size={16} /></button>
              <button className="btn btn-outline" onClick={() => nav("products")}>🐔 View Products</button>
              <button className="btn btn-outline" onClick={() => nav("contact")}>📞 Contact Us</button>
            </div>
            <div className="hero-stats">
              {[["50,000+", "Birds on Farm"], ["22", "Years Experience"], ["8,000+", "Eggs Daily"]].map(([n, l]) => (
                <div key={l} className="hero-stat">
                  <div className="hero-stat-num">{n}</div>
                  <div className="hero-stat-label">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-badge floating-badge-1">
              <div className="fb-dot" /><span>🥚 Fresh Eggs Daily</span>
            </div>
            <div className="hero-farm-card">
              <div className="hero-emoji-grid">
                {["🐔","🥚","🐣","🐓","🦃","🌾","🏡","🚚","⭐"].map((e,i) => (
                  <div key={i} className="hero-emoji-item">{e}</div>
                ))}
              </div>
              <div className="hero-farm-name">Anapuwa Poultry Farms</div>
              <div className="hero-farm-sub">Ogun State, Nigeria · Open 7 days</div>
            </div>
            <div className="floating-badge floating-badge-2">
              <span>⭐ 4.9 · 200+ Reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK PRODUCTS PREVIEW */}
      <section className="section products-bg">
        <div className="section-inner">
          <div className="section-header center">
            <div className="section-label">Our Products</div>
            <h2 className="section-title">Farm-Fresh, Always Available</h2>
            <p className="section-desc">From live birds to feeds — everything you need for your poultry business or home.</p>
          </div>
          <div className="products-grid">
            {PRODUCTS.slice(0, 3).map(p => <ProductCard key={p.id} p={p} />)}
          </div>
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <button className="btn btn-green" onClick={() => nav("products")}>View All Products <Icon name="arrow" size={16} /></button>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section">
        <div className="section-inner">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <div className="section-label">Why Choose Us</div>
              <h2 className="section-title">Quality You Can Trust, Prices You'll Love</h2>
              <p className="section-desc" style={{ marginBottom: 32 }}>We combine modern farming practices with traditional care to bring you the finest poultry products in Nigeria.</p>
              {[
                ["🛡️", "100% Vaccinated Birds", "All birds receive full vaccination schedules for your safety."],
                ["🚚", "Same-Day Delivery", "Order before 12pm and get delivery within Lagos and Ogun State."],
                ["🌿", "Organic Feed", "Our birds are raised on nutritionally balanced, natural feeds."],
                ["📞", "24/7 WhatsApp Support", "Order anytime — our team is always available on WhatsApp."],
              ].map(([icon, title, desc]) => (
                <div key={title} style={{ display: "flex", gap: 16, marginBottom: 20, alignItems: "flex-start" }}>
                  <div style={{ width: 44, height: 44, background: "var(--green-pale)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 3, color: "var(--text-dark)" }}>{title}</div>
                    <div style={{ fontSize: 13, color: "var(--text-light)" }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: "linear-gradient(135deg, #1a4a1a, #4a9a20)", borderRadius: 20, padding: 40, color: "white", textAlign: "center" }}>
              <div style={{ fontSize: 80 }}>🏆</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, marginBottom: 12 }}>Award-Winning Farm</h3>
              <p style={{ fontSize: 14, opacity: 0.8, marginBottom: 28, lineHeight: 1.7 }}>Recognized by the Nigerian Poultry Association for excellence in hygiene, quality, and customer service for 3 consecutive years.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[["200+", "Happy Clients"], ["50K+", "Birds/Month"], ["99%", "Satisfaction"], ["8,000+", "Eggs Daily"]].map(([n, l]) => (
                  <div key={l} style={{ background: "rgba(255,255,255,0.1)", borderRadius: 10, padding: "12px 8px" }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 800, color: "#f0c040" }}>{n}</div>
                    <div style={{ fontSize: 11, opacity: 0.7 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS PREVIEW */}
      <section className="section testimonials-bg">
        <div className="section-inner">
          <div className="section-header center">
            <div className="section-label">Testimonials</div>
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-desc">Over 200 happy buyers and distributors across Nigeria trust Anapuwa.</p>
          </div>
          <div className="testimonials-grid">
            {TESTIMONIALS.slice(0, 2).map((t, i) => <TestimonialCard key={i} t={t} />)}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="section" style={{ background: "var(--cream)" }}>
        <div className="section-inner">
          <div style={{ background: "linear-gradient(135deg, #d4a017, #f0c040)", borderRadius: 20, padding: "48px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: "#1a2410", marginBottom: 8 }}>Ready to Order?</h2>
              <p style={{ color: "#3d3500", fontSize: 15 }}>Get the freshest poultry products delivered to your door.</p>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="btn" style={{ background: "#1a4a1a", color: "white" }} onClick={() => nav("order")}>🛒 Place Order Now</button>
              <button className="btn" style={{ background: "rgba(0,0,0,0.1)", color: "#1a2410" }} onClick={() => nav("contact")}>📞 Call Us</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── ABOUT PAGE ──────────────────────────────────────────────────────────────
function AboutPage() {
  return (
    <div style={{ paddingTop: 72 }}>
      <div style={{ background: "linear-gradient(135deg, #1a4a1a, #2d7a2d)", padding: "64px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div className="section-label" style={{ color: "#c8f0a0" }}>Our Story</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px,5vw,52px)", color: "white", marginBottom: 16 }}>About Anapuwa Poultry Farms</h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 16, lineHeight: 1.7 }}>From a small backyard farm to one of Nigeria's most trusted poultry producers.</p>
        </div>
      </div>

      <section className="section">
        <div className="section-inner">
          <div className="about-grid">
            <div className="about-visual">
              <div className="about-main-img">🐔</div>
              <div className="about-badge-float">
                <div className="about-badge-num">22+</div>
                <div className="about-badge-txt">Years of Excellence</div>
              </div>
            </div>
            <div>
              <div className="section-label">Our Story</div>
              <h2 className="section-title">From 50 Birds to 50,000 — A Journey of Passion</h2>
              <p style={{ color: "var(--text-light)", marginBottom: 20, lineHeight: 1.8 }}>
                Anapuwa Poultry Farms was founded in 2004 by Emmanuel Anapuwa with just 50 broiler chicks and a vision: to provide the freshest, healthiest poultry products to Nigerian families and businesses.
              </p>
              <p style={{ color: "var(--text-light)", marginBottom: 28, lineHeight: 1.8 }}>
                Today, we operate a 15-acre farm with over 50,000 birds, a modern hatchery, egg processing unit, and a fleet of refrigerated delivery vehicles. We supply restaurants, hotels, supermarkets, and individual buyers across Lagos, Abuja, and Ogun State.
              </p>
              <div className="about-values">
                {[
                  ["🛡️", "Hygiene First", "NAFDAC compliant facilities with weekly health inspections."],
                  ["🌿", "Natural Feeding", "Balanced feeds with zero growth hormones or antibiotics."],
                  ["🔬", "Quality Assurance", "Every batch tested before leaving our farm."],
                  ["❤️", "Animal Welfare", "Stress-free environments for healthier, tastier birds."],
                ].map(([icon, title, desc]) => (
                  <div key={title} className="about-value">
                    <div className="about-value-icon"><span style={{ fontSize: 16 }}>{icon}</span></div>
                    <div>
                      <div className="about-value-title">{title}</div>
                      <div className="about-value-desc">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section products-bg">
        <div className="section-inner">
          <div className="section-header center">
            <div className="section-label">Our Mission</div>
            <h2 className="section-title">Feeding Nigeria, One Farm at a Time</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {[
              ["🎯", "Our Mission", "To be Nigeria's most trusted poultry provider by delivering safe, nutritious, and affordable poultry products while empowering local communities."],
              ["👁️", "Our Vision", "A Nigeria where every household has access to fresh, quality poultry products at fair prices, produced sustainably and ethically."],
              ["💎", "Our Values", "Integrity, Quality, Sustainability, and Community. Every decision we make reflects our commitment to these core principles."],
            ].map(([icon, title, desc]) => (
              <div key={title} style={{ background: "var(--white)", borderRadius: "var(--radius)", padding: 28, border: "1px solid var(--border)", textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{icon}</div>
                <h3 style={{ fontSize: 18, marginBottom: 10, color: "var(--text-dark)" }}>{title}</h3>
                <p style={{ fontSize: 14, color: "var(--text-light)", lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="section">
        <div className="section-inner">
          <div className="section-header center">
            <div className="section-label">The Team</div>
            <h2 className="section-title">Meet the People Behind the Farm</h2>
          </div>
          <div className="team-grid">
            {TEAM.map((m, i) => (
              <div key={i} className="team-card">
                <div className="team-emoji">{m.emoji}</div>
                <div className="team-name">{m.name}</div>
                <div className="team-role">{m.role}</div>
                <div className="team-desc">{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── PRODUCTS PAGE ───────────────────────────────────────────────────────────
function ProductsPage({ nav, setModal }) {
  const [filter, setFilter] = useState("All");
  const cats = ["All", "Live Birds", "Eggs", "Chicks", "Feed"];
  const filtered = filter === "All" ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  return (
    <div style={{ paddingTop: 72 }}>
      <div style={{ background: "linear-gradient(135deg, #1a4a1a, #2d7a2d)", padding: "64px 24px", textAlign: "center" }}>
        <div className="section-label" style={{ color: "#c8f0a0" }}>Our Products</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,5vw,48px)", color: "white", marginBottom: 12 }}>Fresh Poultry Products</h1>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15 }}>Quality birds, eggs, and feeds — straight from our farm.</p>
      </div>
      <section className="section products-bg">
        <div className="section-inner">
          <div style={{ display: "flex", gap: 10, marginBottom: 36, flexWrap: "wrap" }}>
            {cats.map(c => (
              <button key={c} onClick={() => setFilter(c)} className="admin-tab" style={filter === c ? { background: "var(--green-main)", color: "white", border: "1.5px solid var(--green-main)" } : {}}>
                {c}
              </button>
            ))}
          </div>
          <div className="products-grid">
            {filtered.map(p => <ProductCard key={p.id} p={p} onOrder={() => { setModal({ icon: "🛒", title: "Added to Inquiry!", text: `${p.name} added. Go to Order page to submit your full order.` }); }} />)}
          </div>
          {/* Bulk Order */}
          <div style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: 32, marginTop: 48 }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, marginBottom: 8, color: "var(--text-dark)" }}>🏭 Bulk Order Inquiry</h3>
            <p style={{ color: "var(--text-light)", fontSize: 14, marginBottom: 20 }}>For orders above 500 birds or 50 crates of eggs, contact us for special pricing.</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="btn btn-green" onClick={() => nav("order")}>Submit Bulk Order Form</button>
              <button className="btn" style={{ background: "#25D366", color: "white" }} onClick={() => window.open("https://wa.me/2348012345678?text=I+need+bulk+pricing", "_blank")}>
                <Icon name="whatsapp" size={16} color="white" /> WhatsApp for Bulk Pricing
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductCard({ p, onOrder }) {
  return (
    <div className="product-card">
      <div className="product-img" style={{ background: p.color }}>
        <span>{p.image}</span>
        <span className="product-badge">{p.badge}</span>
      </div>
      <div className="product-body">
        <div className="product-cat">{p.category}</div>
        <div className="product-name">{p.name}</div>
        <div className="product-desc">{p.desc}</div>
        <div className="product-footer">
          <div>
            <div className="product-price">{p.price}</div>
            <div className="product-unit">{p.unit}</div>
          </div>
          <button className="product-btn" onClick={onOrder}>Order Now</button>
        </div>
      </div>
    </div>
  );
}

// ─── ORDER PAGE ──────────────────────────────────────────────────────────────
function OrderPage({ orderForm, setOrderForm, handleOrder, handleWhatsApp }) {
  return (
    <div style={{ paddingTop: 72 }}>
      <div style={{ background: "linear-gradient(135deg, #1a4a1a, #2d7a2d)", padding: "64px 24px", textAlign: "center" }}>
        <div className="section-label" style={{ color: "#c8f0a0" }}>Place an Order</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,5vw,48px)", color: "white", marginBottom: 12 }}>Order Fresh Poultry</h1>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15 }}>Fill the form or reach us instantly via WhatsApp.</p>
      </div>
      <section className="section">
        <div className="section-inner">
          <div className="order-grid">
            <div className="form-card">
              <h3 className="form-title">📋 Order Request Form</h3>
              <form onSubmit={handleOrder}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input className="form-input" required placeholder="e.g. John Doe" value={orderForm.name} onChange={e => setOrderForm({ ...orderForm, name: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input className="form-input" required placeholder="+234 XXX XXX XXXX" value={orderForm.phone} onChange={e => setOrderForm({ ...orderForm, phone: e.target.value })} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Product *</label>
                  <select className="form-input" required value={orderForm.product} onChange={e => setOrderForm({ ...orderForm, product: e.target.value })}>
                    <option value="">-- Select Product --</option>
                    {PRODUCTS.map(p => <option key={p.id} value={p.name}>{p.name} — {p.price} {p.unit}</option>)}
                  </select>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Quantity *</label>
                    <input className="form-input" required type="number" min="1" placeholder="e.g. 50" value={orderForm.qty} onChange={e => setOrderForm({ ...orderForm, qty: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Delivery Location *</label>
                    <input className="form-input" required placeholder="e.g. Ikeja, Lagos" value={orderForm.location} onChange={e => setOrderForm({ ...orderForm, location: e.target.value })} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Additional Notes</label>
                  <textarea className="form-input" rows={3} placeholder="Special requests, preferred date, etc." value={orderForm.notes} onChange={e => setOrderForm({ ...orderForm, notes: e.target.value })} style={{ resize: "vertical" }} />
                </div>
                <button type="submit" className="form-submit">🛒 Submit Order Request</button>
                <button type="button" className="whatsapp-order" onClick={handleWhatsApp}>
                  <Icon name="whatsapp" size={20} color="white" /> Order Instantly via WhatsApp
                </button>
              </form>
            </div>
            <div className="order-info">
              <div className="info-card">
                <div className="info-card-title">📦 How It Works</div>
                <div className="steps">
                  {["Submit your order form or WhatsApp us", "Our team confirms within 30 mins", "Make payment via bank transfer or POS", "Receive delivery or pick up from farm"].map((s, i) => (
                    <div key={i} className="step">
                      <div className="step-num">{i + 1}</div>
                      <div className="step-text">{s}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="info-card">
                <div className="info-card-title">💳 Payment Methods</div>
                <div className="info-card-text">
                  ✅ Bank Transfer (Instant confirmation)<br />
                  ✅ Paystack Online Payment<br />
                  ✅ Flutterwave<br />
                  ✅ POS on delivery<br />
                  ✅ Cash (farm pickup only)
                </div>
              </div>
              <div className="info-card">
                <div className="info-card-title">🚚 Delivery Info</div>
                <div className="info-card-text">
                  • Same-day delivery: Orders before 12pm<br />
                  • Lagos Island/Mainland: ₦2,000–₦3,500<br />
                  • Ogun State: ₦1,500–₦2,500<br />
                  • Abuja: Contact for pricing<br />
                  • Free delivery on orders above ₦150,000
                </div>
              </div>
              <div className="info-card" style={{ background: "#e8f5e9", borderColor: "#4caf50" }}>
                <div className="info-card-title" style={{ color: "var(--green-dark)" }}>📞 Direct Contact</div>
                <div className="info-card-text">
                  <strong>Phone:</strong> +234 801 234 5678<br />
                  <strong>WhatsApp:</strong> +234 801 234 5678<br />
                  <strong>Email:</strong> orders@anapuwa.com<br />
                  <strong>Hours:</strong> Mon–Sat, 7am–7pm
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── GALLERY PAGE ────────────────────────────────────────────────────────────
function GalleryPage() {
  return (
    <div style={{ paddingTop: 72 }}>
      <div style={{ background: "linear-gradient(135deg, #1a4a1a, #2d7a2d)", padding: "64px 24px", textAlign: "center" }}>
        <div className="section-label" style={{ color: "#c8f0a0" }}>Gallery</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,5vw,48px)", color: "white", marginBottom: 12 }}>Inside Our Farm</h1>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15 }}>A glimpse into the world of Anapuwa Poultry Farms.</p>
      </div>
      <section className="section gallery-bg">
        <div className="section-inner">
          <div className="gallery-grid">
            {GALLERY_ITEMS.map(g => (
              <div key={g.id} className="gallery-item">
                <div className="gallery-bg-img" style={{ background: g.bg }}>
                  <span>{g.emoji}</span>
                </div>
                <div className="gallery-overlay">
                  <span className="gallery-label">{g.label}</span>
                </div>
              </div>
            ))}
          </div>
          {/* Testimonials in gallery */}
          <div style={{ marginTop: 64 }}>
            <div className="section-header center">
              <div className="section-label">Reviews</div>
              <h2 className="section-title">Customer Testimonials</h2>
            </div>
            <div className="testimonials-grid" style={{ gridTemplateColumns: "repeat(2,1fr)", display: "grid", gap: 20 }}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: 28 }}>
                  <div className="stars">{[...Array(t.rating)].map((_, j) => <span key={j} className="star">★</span>)}</div>
                  <p style={{ fontSize: 14, color: "var(--text-light)", lineHeight: 1.7, fontStyle: "italic", marginBottom: 16 }}>"{t.text}"</p>
                  <div className="testimonial-author">
                    <div className="author-avatar" style={{ background: "var(--green-pale)" }}>👤</div>
                    <div>
                      <div className="author-name" style={{ color: "var(--text-dark)" }}>{t.name}</div>
                      <div className="author-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function TestimonialCard({ t }) {
  return (
    <div className="testimonial-card">
      <div className="stars">{[...Array(t.rating)].map((_, i) => <span key={i} className="star">★</span>)}</div>
      <p className="testimonial-text">"{t.text}"</p>
      <div className="testimonial-author">
        <div className="author-avatar">👤</div>
        <div>
          <div className="author-name">{t.name}</div>
          <div className="author-role">{t.role}</div>
        </div>
      </div>
    </div>
  );
}

// ─── CONTACT PAGE ────────────────────────────────────────────────────────────
function ContactPage({ contactForm, setContactForm, handleContactSubmit }) {
  return (
    <div style={{ paddingTop: 72 }}>
      <div style={{ background: "linear-gradient(135deg, #1a4a1a, #2d7a2d)", padding: "64px 24px", textAlign: "center" }}>
        <div className="section-label" style={{ color: "#c8f0a0" }}>Get In Touch</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,5vw,48px)", color: "white", marginBottom: 12 }}>Contact Us</h1>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15 }}>We're here to help — reach out anytime.</p>
      </div>

      <section className="section">
        <div className="section-inner">
          <div className="contact-grid">
            <div>
              <div className="map-placeholder">
                <span style={{ fontSize: 48 }}>📍</span>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700 }}>Find Us on the Map</div>
                <div style={{ fontSize: 13, opacity: 0.75 }}>Farm Road, Sagamu, Ogun State, Nigeria</div>
                <button className="btn btn-white" style={{ marginTop: 8, fontSize: 13, padding: "8px 18px" }} onClick={() => window.open("https://maps.google.com", "_blank")}>
                  Open in Google Maps
                </button>
              </div>
              <div className="contact-info">
                {[
                  ["phone", "PHONE", "+234 801 234 5678"],
                  ["mail", "EMAIL", "info@anapuwa.com"],
                  ["location", "ADDRESS", "Farm Road, Sagamu, Ogun State, Nigeria"],
                ].map(([icon, label, val]) => (
                  <div key={label} className="contact-info-item">
                    <div className="contact-icon"><Icon name={icon} size={18} /></div>
                    <div>
                      <div className="contact-info-label">{label}</div>
                      <div className="contact-info-val">{val}</div>
                    </div>
                  </div>
                ))}
                <div className="contact-info-item">
                  <div className="contact-icon" style={{ fontSize: 18 }}>📱</div>
                  <div>
                    <div className="contact-info-label">SOCIAL MEDIA</div>
                    <div className="social-links">
                      {["📘", "📸", "🐦", "▶️"].map((s, i) => <button key={i} className="social-btn">{s}</button>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="form-card">
                <h3 className="form-title">💬 Send Us a Message</h3>
                <form onSubmit={handleContactSubmit}>
                  <div className="form-group">
                    <label className="form-label">Your Name *</label>
                    <input className="form-input" required placeholder="John Doe" value={contactForm.name} onChange={e => setContactForm({ ...contactForm, name: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input className="form-input" required type="email" placeholder="john@example.com" value={contactForm.email} onChange={e => setContactForm({ ...contactForm, email: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea className="form-input" required rows={5} placeholder="How can we help you?" value={contactForm.message} onChange={e => setContactForm({ ...contactForm, message: e.target.value })} style={{ resize: "vertical" }} />
                  </div>
                  <button type="submit" className="form-submit">Send Message</button>
                </form>
              </div>
              {/* FAQ */}
              <div style={{ marginTop: 32 }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, marginBottom: 20, color: "var(--text-dark)" }}>❓ Frequently Asked Questions</h3>
                {FAQS.map((f, i) => <FaqItem key={i} f={f} />)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FaqItem({ f }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <div className={`faq-q${open ? " open" : ""}`} onClick={() => setOpen(!open)}>
        {f.q}
        <span className={`faq-icon${open ? " open" : ""}`}>+</span>
      </div>
      <div className={`faq-a${open ? " open" : ""}`}>{f.a}</div>
    </div>
  );
}

// ─── ADMIN PAGE ──────────────────────────────────────────────────────────────
function AdminPage({ adminTab, setAdminTab, adminOrders }) {
  const [products, setProducts] = useState(PRODUCTS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", category: "Live Birds", desc: "" });

  const statusColors = { new: "status-new", processing: "status-processing", done: "status-done" };

  const deleteProduct = (id) => setProducts(products.filter(p => p.id !== id));
  const addProduct = () => {
    if (newProduct.name && newProduct.price) {
      setProducts([...products, { ...newProduct, id: Date.now(), image: "🐔", unit: "per unit", badge: "New", color: "#e8f5e9" }]);
      setNewProduct({ name: "", price: "", category: "Live Birds", desc: "" });
      setShowAddForm(false);
    }
  };

  return (
    <div style={{ paddingTop: 72 }}>
      <div style={{ background: "linear-gradient(135deg, #1a4a1a, #2d7a2d)", padding: "40px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div className="section-label" style={{ color: "#c8f0a0" }}>Admin Panel</div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, color: "white" }}>Farm Dashboard</h1>
            </div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>
              Welcome back, Emmanuel 👋 · {new Date().toLocaleDateString("en-NG", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </div>
          </div>
        </div>
      </div>

      <section className="section admin-bg">
        <div className="section-inner">
          {/* STATS */}
          <div className="admin-stats">
            {[["📦", "Total Orders", "147"], ["🐔", "Products", String(products.length)], ["💰", "This Month", "₦2.4M"], ["⭐", "Avg Rating", "4.9/5"]].map(([icon, label, val]) => (
              <div key={label} className="admin-stat-card">
                <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
                <div className="admin-stat-val">{val}</div>
                <div className="admin-stat-label">{label}</div>
              </div>
            ))}
          </div>

          {/* QUICK ANALYTICS */}
          <div style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: 24, marginBottom: 28 }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, marginBottom: 20, color: "var(--text-dark)" }}>📊 Weekly Sales Overview</h3>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 80 }}>
              {[60, 80, 55, 95, 70, 100, 85].map((h, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{ width: "100%", height: `${h}%`, background: "var(--green-main)", borderRadius: "4px 4px 0 0", opacity: i === 5 ? 1 : 0.5 }} />
                  <div style={{ fontSize: 10, color: "var(--text-light)" }}>{["M", "T", "W", "T", "F", "S", "S"][i]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* TABS */}
          <div className="admin-tabs">
            {["orders", "products", "gallery"].map(t => (
              <button key={t} className={`admin-tab${adminTab === t ? " active" : ""}`} onClick={() => setAdminTab(t)}>
                {t === "orders" ? "📦 Orders" : t === "products" ? "🐔 Products" : "🖼️ Gallery"}
              </button>
            ))}
          </div>

          {/* ORDERS TAB */}
          {adminTab === "orders" && (
            <div className="admin-table">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th><th>Customer</th><th>Product</th><th>Qty</th><th>Status</th><th>Date</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {adminOrders.map((o, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 700, color: "var(--green-main)" }}>{o.id}</td>
                      <td>{o.name}</td>
                      <td>{o.product}</td>
                      <td>{o.qty}</td>
                      <td><span className={`status-badge ${statusColors[o.status]}`}>{o.status.toUpperCase()}</span></td>
                      <td style={{ color: "var(--text-light)", fontSize: 13 }}>{o.date}</td>
                      <td>
                        <div className="action-btns">
                          <button className="action-btn action-edit" title="Edit"><Icon name="edit" size={13} /></button>
                          <button className="action-btn action-del" title="Delete"><Icon name="trash" size={13} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* PRODUCTS TAB */}
          {adminTab === "products" && (
            <div>
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
                <button className="btn btn-green" onClick={() => setShowAddForm(!showAddForm)}>
                  <Icon name="plus" size={16} /> Add Product
                </button>
              </div>
              {showAddForm && (
                <div className="form-card" style={{ marginBottom: 20 }}>
                  <h3 className="form-title">➕ Add New Product</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Product Name</label>
                      <input className="form-input" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} placeholder="e.g. Guinea Fowl" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Price</label>
                      <input className="form-input" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} placeholder="e.g. ₦5,000" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <input className="form-input" value={newProduct.desc} onChange={e => setNewProduct({ ...newProduct, desc: e.target.value })} placeholder="Short description" />
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button className="btn btn-green" onClick={addProduct}>Save Product</button>
                    <button className="btn btn-ghost" onClick={() => setShowAddForm(false)}>Cancel</button>
                  </div>
                </div>
              )}
              <div className="admin-table">
                <table>
                  <thead>
                    <tr><th>Product</th><th>Category</th><th>Price</th><th>Actions</th></tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id}>
                        <td><span style={{ marginRight: 8 }}>{p.image}</span>{p.name}</td>
                        <td><span className="status-badge status-new">{p.category}</span></td>
                        <td style={{ fontWeight: 700, color: "var(--green-main)" }}>{p.price}</td>
                        <td>
                          <div className="action-btns">
                            <button className="action-btn action-edit"><Icon name="edit" size={13} /></button>
                            <button className="action-btn action-del" onClick={() => deleteProduct(p.id)}><Icon name="trash" size={13} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* GALLERY TAB */}
          {adminTab === "gallery" && (
            <div>
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
                <button className="btn btn-green"><Icon name="upload" size={16} /> Upload Image</button>
              </div>
              <div className="gallery-grid">
                {GALLERY_ITEMS.map(g => (
                  <div key={g.id} style={{ position: "relative", borderRadius: "var(--radius)", overflow: "hidden" }}>
                    <div style={{ background: g.bg, height: 140, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48 }}>{g.emoji}</div>
                    <div style={{ padding: "12px 16px", background: "var(--white)", border: "1px solid var(--border)", borderTop: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-dark)" }}>{g.label}</span>
                      <div className="action-btns">
                        <button className="action-btn action-edit"><Icon name="edit" size={13} /></button>
                        <button className="action-btn action-del"><Icon name="trash" size={13} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
