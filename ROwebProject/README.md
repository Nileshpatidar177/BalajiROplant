# ❄️ Patidar Ice & RO Services — Complete MERN Stack Project

## 📁 Project Structure
```
ROwebProject/
├── frontend/     → Customer website (React) — Port 3000
├── backend/      → API Server (Node/Express/MongoDB) — Port 5000
└── admin/        → Admin Dashboard (React) — Port 3001
```

---

## 🚀 Setup Kaise Karein (Step by Step)

### Step 1 — Prerequisites Install Karein
Pehle in tools ka hona zaroori hai:
- **Node.js** (v18+): https://nodejs.org
- **MongoDB** (local ya MongoDB Atlas free tier): https://www.mongodb.com

---

### Step 2 — Backend Setup

```bash
cd backend
npm install
```

Ab `.env` file banao (`.env.example` copy karo):
```bash
cp .env.example .env
```

`.env` file kholo aur ye details bharo:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/patidar_db
JWT_SECRET=koi_bhi_unique_string_likho_yahan
ADMIN_USERNAME=admin
ADMIN_PASSWORD=apna_password_likho
```

Backend start karo:
```bash
npm run dev
```
✅ Terminal mein dikhega: `Server running on port 5000`

---

### Step 3 — Frontend Setup (Customer Website)

```bash
cd frontend
npm install
npm start
```
✅ Browser mein khulega: `http://localhost:3000`

---

### Step 4 — Admin Panel Setup

```bash
cd admin
npm install
npm start
```
✅ Browser mein khulega: `http://localhost:3001`

**Admin Login:**
- Username: `admin` (ya jo .env mein set kiya)
- Password: `admin123` (ya jo .env mein set kiya)

---

## ⚠️ IMPORTANT — Ye Zaroor Update Karein!

### 1. Owner ka WhatsApp Number Change Karein:

**frontend/src/components/StickyButtons.js** mein:
```js
const OWNER_PHONE = '919999999999'; // ← Apna number daalo
```

**frontend/src/components/QuickOrderForm.js** mein:
```js
const OWNER_WA = '919999999999'; // ← Apna number daalo
```

**frontend/src/pages/Products.js** mein:
```js
const phone = '919999999999'; // ← Apna number daalo
```

### 2. Phone Number in About & Home Pages:
- `frontend/src/pages/Home.js` → `tel:+919999999999`
- `frontend/src/pages/About.js` → `tel:+919999999999`
- `frontend/src/components/Footer.js` → `tel:+919999999999`

---

## 📱 Features

### Customer Website (frontend):
- ✅ Beautiful hero section with animated particles
- ✅ Products page with Retail/Wholesale price toggle
- ✅ Quick Order Form → directly WhatsApp par order jaata hai
- ✅ About Us page with timeline
- ✅ Sticky Call & WhatsApp buttons (mobile friendly)
- ✅ Fully responsive (mobile + desktop)

### Admin Panel (admin):
- ✅ Secure login with JWT
- ✅ Dashboard with order stats
- ✅ Orders management — status update, call/WhatsApp customer
- ✅ Products management — add/edit/delete, price update
- ✅ Settings — phone number, business hours update
- ✅ Retail vs Wholesale pricing

### Backend API (backend):
- ✅ `POST /api/orders` — Order save karna
- ✅ `GET /api/orders` — Sab orders dekhna (admin)
- ✅ `PATCH /api/orders/:id` — Status update
- ✅ `GET /api/products` — Products list
- ✅ `POST /api/products` — Product add (admin)
- ✅ `PUT /api/products/:id` — Product update (admin)
- ✅ `POST /api/auth/login` — Admin login

---

## 🌐 Live Deploy Karna (Free)

### Backend → Railway.app
1. https://railway.app pe account banao
2. New Project → Deploy from GitHub
3. Environment variables add karo
4. MongoDB Atlas free cluster use karo

### Frontend & Admin → Vercel
1. https://vercel.com pe account banao
2. GitHub se connect karo
3. Frontend aur Admin dono alag deploy karo
4. `REACT_APP_API_URL` env variable set karo backend URL ke saath

---

## 📞 Support
Koi problem aaye toh WhatsApp par sampark karein. All the best! 🎉
