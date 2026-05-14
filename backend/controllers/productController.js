const JSONDatabase = require('../utils/jsondb');
const db = new JSONDatabase('products.json');

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
exports.getAllProducts = (req, res, next) => {
  try {
    const { category, platform, search, inStock } = req.query;
    let products = db.getAllProducts();

    // Filter by category
    if (category) {
      products = products.filter(p => p.category === category);
    }

    // Filter by platform
    if (platform) {
      products = products.filter(p => p.platform === platform);
    }

    // Search by name or description
    if (search) {
      products = db.searchProducts(search);
    }

    // Filter by stock status
    if (inStock === 'true') {
      products = products.filter(p => p.inStock === true);
    }

    // Sort by price (default: ascending)
    const sortBy = req.query.sortBy || 'name';
    const order = req.query.order === 'desc' ? -1 : 1;

    if (sortBy === 'price') {
      products.sort((a, b) => (a.price - b.price) * order);
    } else if (sortBy === 'rating') {
      products.sort((a, b) => (a.rating - b.rating) * order);
    } else if (sortBy === 'sales') {
      products.sort((a, b) => (a.sales - b.sales) * order);
    } else {
      products.sort((a, b) => a.name.localeCompare(b.name) * order);
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const paginatedProducts = products.slice(skip, skip + limit);

    res.status(200).json({
      success: true,
      count: paginatedProducts.length,
      total: products.length,
      page,
      pages: Math.ceil(products.length / limit),
      data: paginatedProducts
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by ID
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProductById = (req, res, next) => {
  try {
    const product = db.getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new product
// @route   POST /api/v1/products
// @access  Private (Admin/Seller)
exports.createProduct = (req, res, next) => {
  try {
    const { name, description, emoji, price, originalPrice, platform, category } = req.body;

    // Validation
    if (!name || !price || !category || !platform) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, price, category, platform'
      });
    }

    if (price < 0 || (originalPrice && originalPrice < 0)) {
      return res.status(400).json({
        success: false,
        message: 'Price cannot be negative'
      });
    }

    const newProduct = db.createProduct({
      name,
      description: description || '',
      emoji: emoji || '📦',
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : Number(price),
      platform,
      category,
      rating: 0,
      sales: 0,
      inStock: req.body.inStock !== false,
      quantity: req.body.quantity || 0,
      hot: req.body.hot || false,
      image: req.body.image || '/images/placeholder.jpg'
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: newProduct
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product
// @route   PUT /api/v1/products/:id
// @access  Private (Admin/Seller)
exports.updateProduct = (req, res, next) => {
  try {
    const product = db.getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Validate price if being updated
    if (req.body.price && req.body.price < 0) {
      return res.status(400).json({
        success: false,
        message: 'Price cannot be negative'
      });
    }

    const updatedProduct = db.updateProduct(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
// @access  Private (Admin/Seller)
exports.deleteProduct = (req, res, next) => {
  try {
    const product = db.getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const deleted = db.deleteProduct(req.params.id);

    if (!deleted) {
      return res.status(500).json({
        success: false,
        message: 'Error deleting product'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get products by category
// @route   GET /api/v1/products/category/:category
// @access  Public
exports.getProductsByCategory = (req, res, next) => {
  try {
    const products = db.getProductsByCategory(req.params.category);

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get products statistics
// @route   GET /api/v1/products/stats
// @access  Public
exports.getProductStats = (req, res, next) => {
  try {
    const products = db.getAllProducts();

    const stats = {
      totalProducts: products.length,
      totalInventory: products.reduce((sum, p) => sum + p.quantity, 0),
      inStockCount: products.filter(p => p.inStock).length,
      outOfStockCount: products.filter(p => !p.inStock).length,
      averageRating: (products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(2),
      totalSales: products.reduce((sum, p) => sum + p.sales, 0),
      categories: [...new Set(products.map(p => p.category))],
      platforms: [...new Set(products.map(p => p.platform))]
    };

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
};
