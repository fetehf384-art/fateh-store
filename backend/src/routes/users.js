const express = require('express');
const { readJSON, writeJSON } = require('../lib/store');
const { nanoid } = require('nanoid');
const router = express.Router();
const FILE = 'users.json';

// For now: simple list and create
router.get('/', async (req, res) => res.json(await readJSON(FILE)));

router.post('/', async (req, res) => {
  const users = await readJSON(FILE);
  const u = { id: nanoid(8), phone: req.body.phone || null, createdAt: Date.now() };
  users.push(u);
  await writeJSON(FILE, users);
  res.status(201).json(u);
});

module.exports = router;
