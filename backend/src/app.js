const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const path = require('path');
const routes = require('./routes');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

// Basic security
app.use(helmet());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Sanitize
app.use(mongoSanitize());
app.use(xss());

// Rate limiter
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
app.use(limiter);

// CORS
const allowedOrigins = [process.env.FRONTEND_URL, process.env.ADMIN_URL, 'http://localhost:3000', 'http://localhost:5173'];
app.use(cors({ origin: function(origin, callback){ if(!origin) return callback(null, true); if(allowedOrigins.indexOf(origin) === -1){ return callback(new Error('CORS not allowed')); } return callback(null, true); }}));

// Static (if needed)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// API routes
app.use('/api', routes);

// health
app.get('/health', (req, res) => res.json({ ok: true, time: Date.now() }));

// Error handler
app.use(errorHandler);

module.exports = app;
