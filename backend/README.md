# Backend README

Run locally:

1. copy backend/.env.example to backend/.env and fill values (MONGODB_URI, JWT_SECRET, CLOUDINARY_...)
2. cd backend && npm install
3. npm run dev

API:
- GET /api/products
- GET /api/products/:id
- POST /api/products (admin)
- POST /api/orders
- POST /api/uploads (file form-data key 'file')
- POST /api/auth/register
- POST /api/auth/login
- POST /api/ai/chat

