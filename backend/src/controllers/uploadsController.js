const cloudinary = require('../services/cloudinary');
const fs = require('fs');

exports.upload = async (req, res, next) => {
  try {
    if(!req.file) return res.status(400).json({ error: 'no_file' });
    const path = req.file.path;
    const result = await cloudinary.uploader.upload(path, { folder: 'fateh_store' });
    // remove temp file
    fs.unlink(req.file.path, () => {});
    res.json({ url: result.secure_url, public_id: result.public_id });
  } catch (err){ next(err); }
};
