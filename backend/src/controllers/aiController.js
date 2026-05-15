// simple AI proxy (requires OPENAI_API_KEY)
const fetch = require('node-fetch');

exports.chat = async (req, res, next) => {
  try {
    const { messages } = req.body; // array of { role, content }
    if(!process.env.OPENAI_API_KEY) return res.status(500).json({ error: 'openai_not_configured' });
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({ model: 'gpt-4o-mini', messages })
    });
    const data = await resp.json();
    res.json(data);
  } catch (err){ next(err); }
};
