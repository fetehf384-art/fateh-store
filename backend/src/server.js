require('dotenv').config();
const app = require('./app');
const { connectDB } = require('./lib/db');

const PORT = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
}).catch(err => {
  console.error('Failed to connect DB', err);
  process.exit(1);
});
