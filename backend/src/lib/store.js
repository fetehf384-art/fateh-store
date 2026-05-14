const fs = require('fs').promises;
const path = require('path');

async function readJSON(fname) {
  const p = path.join(__dirname, '..', 'data', fname);
  try {
    const raw = await fs.readFile(p, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

async function writeJSON(fname, data) {
  const p = path.join(__dirname, '..', 'data', fname);
  // atomic-ish write for development
  await fs.writeFile(p, JSON.stringify(data, null, 2), 'utf8');
}

module.exports = { readJSON, writeJSON };
