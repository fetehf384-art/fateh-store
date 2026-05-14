const express = require('express');
const { readJSON, writeJSON } = require('../lib/store');
const { nanoid } = require('nanoid');
const router = express.Router();
const FILE = 'orders.json';

router.get('/', async (req, res) => {
  const orders = await readJSON(FILE);
  res.json(orders);
});

router.post('/', async (req, res) => {
  const orders = await readJSON(FILE);
  const order = {
    id: nanoid(10),
    items: req.body.items || [],
    customer: req.body.customer || null,
    status: 'pending',
    createdAt: Date.now()
  };
  orders.push(order);
  await writeJSON(FILE, orders);
  res.status(201).json(order);
});

router.put('/:id', async (req, res) => {
  const orders = await readJSON(FILE);
  const i = orders.findIndex(o => o.id === req.params.id);
  if (i === -1) return res.status(404).json({ error: 'not_found' });
  orders[i] = { ...orders[i], ...req.body, updatedAt: Date.now() };
  await writeJSON(FILE, orders);
  res.json(orders[i]);
});

module.exports = router;
