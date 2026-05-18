# 🐔 Anapuwa Poultry Farms

A modern, responsive MVP website for Anapuwa Poultry Farms — built with React + Vite.

## Features

- 🏠 Homepage with hero, stats, product preview, testimonials
- 📖 About Us — story, mission, team
- 🛒 Products — 6 products with category filter
- 📋 Order Form — with WhatsApp integration
- 🖼️ Gallery — farm photos & testimonials
- 📞 Contact — form, FAQ accordion, map
- ⚙️ Admin Dashboard — orders, products, gallery management
- 🌙 Dark / Light mode
- 📱 Mobile-first responsive design
- 💬 Floating WhatsApp button

## Tech Stack

- **Frontend:** React 18 + Vite
- **Styling:** Pure CSS (no Tailwind dependency)
- **Fonts:** Playfair Display + DM Sans (Google Fonts)

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Build for production
npm run build
```

---

## 📦 Deploy to GitHub Pages

```bash
# 1. Install gh-pages
npm install --save-dev gh-pages

# 2. Add to package.json scripts:
#    "predeploy": "npm run build",
#    "deploy": "gh-pages -d dist"
# Also add: "homepage": "https://<your-username>.github.io/anapuwa-poultry-farms"

# 3. Deploy
npm run deploy
```

## ☁️ Deploy to Vercel (Recommended — Free)

```bash
# Option A: Vercel CLI
npm install -g vercel
vercel

# Option B: Connect GitHub repo at vercel.com → Import Project → Done
```

## ☁️ Deploy to Netlify

```bash
npm run build
# Drag the /dist folder to netlify.com/drop
```

---

## 📁 Project Structure

```
anapuwa-poultry-farms/
├── index.html
├── vite.config.js
├── package.json
├── .gitignore
└── src/
    ├── main.jsx       # React entry point
    └── App.jsx        # Full application (all pages + styles)
```

---

## 🔧 Customisation

| What | Where in App.jsx |
|---|---|
| Phone number | Search `2348012345678` |
| Products & prices | `PRODUCTS` array |
| Testimonials | `TESTIMONIALS` array |
| Team members | `TEAM` array |
| Gallery items | `GALLERY_ITEMS` array |
| FAQs | `FAQS` array |

---

## 📬 Contact

**Anapuwa Poultry Farms** · Ogun State, Nigeria  
📞 +234 801 234 5678 · 📧 info@anapuwa.com
