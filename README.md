# Fragranzia - MERN Perfume E-Commerce

## Quick Start

### Backend
```bash
cd Server
npm install
# Create .env with MONGO_URI and JWT_SECRET
npm start
# Or: npx nodemon server.js
```

### Frontend
```bash
cd Frontend
npm install
npm run dev
```

## Default Admin (auto-seeded)
- **Email:** admin@fragranzia.com
- **Password:** Admin@123

## Features Implemented
- JWT auth with role-based access (user/admin)
- Guest gating: cart, wishlist, checkout, profile require login
- Blocked users cannot login or access protected routes
- Stock validation on cart and orders; auto stock decrement/increment on orders/returns
- Full order status flow with visual tracking
- Return system (7-day window after delivery)
- Admin dashboard with charts (Recharts)
- Security: helmet, rate limiting, mongo sanitize, bcrypt passwords

## API Base
`http://localhost:5000`

## Frontend
`http://localhost:5173`
