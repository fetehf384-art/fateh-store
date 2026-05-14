const express = require('express');
const { readJSON, writeJSON } = require('../lib/store');
const { nanoid } = require('nanoid');
const router = express.Router();

const FILE = 'products.json';

router.get('/', async (req, res) => {
  const products = await readJSON(FILE);
  const q = (req.query.q || '').toLowerCase();
  const cat = req.query.cat;
  let out = products;
  if (q) out = out.filter(p => (p.name || '').toLowerCase().includes(q));
  if (cat) out = out.filter(p => p.cat === cat);
  res.json(out);
});

router.get('/:id', async (req, res) => {
  const products = await readJSON(FILE);
  const p = products.find(x => String(x.id) === String(req.params.id));
  if (!p) return res.status(404).json({ error: 'not_found' });
  res.json(p);
});

router.post('/', async (req, res) => {
  const products = await readJSON(FILE);
  const item = { id: nanoid(8), ...req.body, createdAt: Date.now() };
  products.push(item);
  await writeJSON(FILE, products);
  res.status(201).json(item);
});

router.put('/:id', async (req, res) => {
  const products = await readJSON(FILE);
  const i = products.findIndex(x => String(x.id) === String(req.params.id));
  if (i === -1) return res.status(404).json({ error: 'not_found' });
  products[i] = { ...products[i], ...req.body, updatedAt: Date.now() };
  await writeJSON(FILE, products);
  res.json(products[i]);
});

router.delete('/:id', async (req, res) => {
  let products = await readJSON(FILE);
  const prev = products.length;
  products = products.filter(x => String(x.id) !== String(req.params.id));
  if (products.length === prev) return res.status(404).json({ error: 'not_found' });
  await writeJSON(FILE, products);
  res.status(204).end();
});

module.exports = router;
