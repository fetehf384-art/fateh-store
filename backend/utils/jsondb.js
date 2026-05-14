const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

class JSONDatabase {
  constructor(filename) {
    this.filePath = path.join(__dirname, '../database', filename);
    this.ensureFileExists();
  }

  ensureFileExists() {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify({ products: [] }, null, 2));
    }
  }

  read() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading database:', error);
      return { products: [] };
    }
  }

  write(data) {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
      return true;
    } catch (error) {
      console.error('Error writing database:', error);
      return false;
    }
  }

  getAllProducts() {
    const data = this.read();
    return data.products || [];
  }

  getProductById(id) {
    const products = this.getAllProducts();
    return products.find(p => p.id === String(id));
  }

  getProductsByCategory(category) {
    const products = this.getAllProducts();
    return products.filter(p => p.category === category);
  }

  getProductsByPlatform(platform) {
    const products = this.getAllProducts();
    return products.filter(p => p.platform === platform);
  }

  searchProducts(query) {
    const products = this.getAllProducts();
    const searchQuery = query.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(searchQuery) ||
      p.description.toLowerCase().includes(searchQuery) ||
      p.platform.toLowerCase().includes(searchQuery)
    );
  }

  createProduct(productData) {
    const products = this.getAllProducts();
    const newProduct = {
      id: uuidv4(),
      ...productData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    products.push(newProduct);
    const data = this.read();
    data.products = products;
    this.write(data);
    return newProduct;
  }

  updateProduct(id, updates) {
    const products = this.getAllProducts();
    const index = products.findIndex(p => p.id === String(id));
    
    if (index === -1) return null;
    
    products[index] = {
      ...products[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    const data = this.read();
    data.products = products;
    this.write(data);
    return products[index];
  }

  deleteProduct(id) {
    const products = this.getAllProducts();
    const filteredProducts = products.filter(p => p.id !== String(id));
    
    if (filteredProducts.length === products.length) return false;
    
    const data = this.read();
    data.products = filteredProducts;
    this.write(data);
    return true;
  }

  deleteAllProducts() {
    const data = { products: [] };
    return this.write(data);
  }
}

module.exports = JSONDatabase;
