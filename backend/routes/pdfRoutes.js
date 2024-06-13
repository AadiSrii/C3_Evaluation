const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');

// Route to create a PDF
router.post('/create', (req, res) => {
  const { content } = req.body;

  const doc = new PDFDocument();
  let filename = `${Date.now()}.pdf`;
  filename = encodeURIComponent(filename);

  res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
  res.setHeader('Content-type', 'application/pdf');

  doc.text(content, 100, 100);
  doc.pipe(res);
  doc.end();
});

module.exports = router;
