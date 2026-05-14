# Fateh Store - Backend API

## 📋 Overview

Node.js + Express backend for the Fateh Store ecommerce platform. This API provides RESTful endpoints for managing products, orders, and other ecommerce functionalities.

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ 
- npm or yarn

### Installation

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

### Running

```bash
# Production
npm start

# Development (with auto-reload)
npm run dev

# Testing
npm test
```

## 📁 Project Structure

```
backend/
├── database/
│   └── products.json          # JSON database for products
├── controllers/
│   └── productController.js   # Product business logic
├── routes/
│   └── products.js            # Product API routes
├── utils/
│   └── jsondb.js              # JSON database utility class
├── server.js                  # Express app setup
├── package.json               # Dependencies
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore rules
└── README.md                  # This file
```

## 🔌 API Endpoints

### Base URL
```
http://localhost:5000/api/v1
```

### Products

#### Get All Products
```http
GET /products
```

**Query Parameters:**
- `page` (number): Page number for pagination (default: 1)
- `limit` (number): Items per page (default: 10)
- `category` (string): Filter by category (electronics, fashion, home, etc.)
- `platform` (string): Filter by platform (AliExpress, Amazon, etc.)
- `search` (string): Search by name or description
- `inStock` (boolean): Filter by stock status (true/false)
- `sortBy` (string): Sort field (name, price, rating, sales)
- `order` (string): Sort order (asc/desc, default: asc)

**Example:**
```bash
curl "http://localhost:5000/api/v1/products?category=electronics&inStock=true&sortBy=price&order=asc&page=1&limit=10"
```

**Response:**
```json
{
  "success": true,
  "count": 10,
  "total": 45,
  "page": 1,
  "pages": 5,
  "data": [
    {
      "id": "1",
      "name": "سماعات بلوتوث لاسلكية Pro Max",
      "description": "سماعات بلوتوث عالية الجودة...",
      "emoji": "🎧",
      "price": 2800,
      "originalPrice": 5500,
      "platform": "AliExpress",
      "category": "electronics",
      "rating": 4.8,
      "sales": 1234,
      "inStock": true,
      "quantity": 45,
      "hot": true,
      "image": "/images/products/wireless-headphones.jpg",
      "createdAt": "2026-05-01T10:00:00Z",
      "updatedAt": "2026-05-14T10:00:00Z"
    }
  ]
}
```

#### Get Product by ID
```http
GET /products/:id
```

**Example:**
```bash
curl "http://localhost:5000/api/v1/products/1"
```

**Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

#### Get Products by Category
```http
GET /products/category/:category
```

**Example:**
```bash
curl "http://localhost:5000/api/v1/products/category/electronics"
```

#### Create Product
```http
POST /products
```

**Request Body:**
```json
{
  "name": "منتج جديد",
  "description": "وصف المنتج",
  "emoji": "📱",
  "price": 5000,
  "originalPrice": 8000,
  "platform": "AliExpress",
  "category": "electronics",
  "inStock": true,
  "quantity": 50,
  "hot": false,
  "image": "/images/product.jpg"
}
```

**Example:**
```bash
curl -X POST "http://localhost:5000/api/v1/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "هاتف ذكي جديد",
    "price": 35000,
    "platform": "Amazon",
    "category": "electronics"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": { ... }
}
```

#### Update Product
```http
PUT /products/:id
```

**Request Body:**
```json
{
  "price": 4500,
  "quantity": 30,
  "inStock": true
}
```

**Example:**
```bash
curl -X PUT "http://localhost:5000/api/v1/products/1" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 2500,
    "quantity": 40
  }'
```

#### Delete Product
```http
DELETE /products/:id
```

**Example:**
```bash
curl -X DELETE "http://localhost:5000/api/v1/products/1"
```

**Response:**
```json
{
  "success": true,
  "message": "Product deleted successfully",
  "data": {}
}
```

#### Get Product Statistics
```http
GET /products/stats
```

**Example:**
```bash
curl "http://localhost:5000/api/v1/products/stats"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalProducts": 5,
    "totalInventory": 160,
    "inStockCount": 4,
    "outOfStockCount": 1,
    "averageRating": "4.78",
    "totalSales": 7822,
    "categories": ["electronics", "fashion", "home", "beauty"],
    "platforms": ["AliExpress", "Amazon", "Shein", "Jumia", "CJ Dropship"]
  }
}
```

## 🗄️ Database Structure

### JSON Database (products.json)

The system uses a simple JSON file-based database at `database/products.json`:

```json
{
  "products": [
    {
      "id": "uuid",
      "name": "Product Name",
      "description": "Product description",
      "emoji": "🎧",
      "price": 2800,
      "originalPrice": 5500,
      "platform": "AliExpress",
      "category": "electronics",
      "rating": 4.8,
      "sales": 1234,
      "inStock": true,
      "quantity": 45,
      "hot": true,
      "image": "/images/products/product.jpg",
      "createdAt": "2026-05-01T10:00:00Z",
      "updatedAt": "2026-05-14T10:00:00Z"
    }
  ]
}
```

## 🔐 Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Server
PORT=5000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:3000

# API
API_VERSION=v1
API_PREFIX=/api/v1

# Database
DB_TYPE=json
```

## 📊 Response Format

All API responses follow a consistent format:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description"
}
```

## 🧪 Testing

### Using cURL

```bash
# Test health
curl http://localhost:5000/health

# Get all products
curl http://localhost:5000/api/v1/products

# Search products
curl "http://localhost:5000/api/v1/products?search=bluetooth"

# Create product
curl -X POST http://localhost:5000/api/v1/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","price":1000,"platform":"Test","category":"electronics"}'
```

### Using Postman

1. Import the API endpoints into Postman
2. Use the examples provided in this documentation
3. Test CRUD operations for products

## 🚦 Status Codes

- `200` - OK (successful GET, PUT, DELETE)
- `201` - Created (successful POST)
- `400` - Bad Request (validation error)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error

## 🔄 Future Improvements

- [ ] Replace JSON with PostgreSQL/MongoDB
- [ ] Add authentication (JWT)
- [ ] Add order management API
- [ ] Add user/seller management
- [ ] Add payment processing
- [ ] Add image upload functionality
- [ ] Add search engine (Elasticsearch)
- [ ] Add caching (Redis)
- [ ] Add logging
- [ ] Add rate limiting
- [ ] Add input validation middleware
- [ ] Add API documentation (Swagger/OpenAPI)

## 📝 License

MIT

## 👤 Author

Fateh Store Team
