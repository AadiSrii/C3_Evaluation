const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
  title: String,
  author: String,
  content: [String],
  pdfPath: String,
}, { timestamps: true });

module.exports = mongoose.model('PDF', pdfSchema);
