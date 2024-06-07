const express = require('express');
const router = express.Router();
const multer = require('multer');
const PDFDocument = require('pdfkit');
const fs = require('fs');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/generate', upload.fields([
  { name: 'frontCover', maxCount: 1 },
  { name: 'backCover', maxCount: 1 },
  { name: 'internalPages', maxCount: 5 },
]), (req, res) => {
  const { title, author, content } = req.body;

  const doc = new PDFDocument();
  const buffers = [];

  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {
    const pdfData = Buffer.concat(buffers);
    res.writeHead(200, {
      'Content-Length': Buffer.byteLength(pdfData),
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment;filename=generated.pdf',
    }).end(pdfData);
  });

  // Front cover
  if (req.files.frontCover) {
    const frontCover = req.files.frontCover[0];
    doc.image(frontCover.buffer, 0, 0, { width: doc.page.width, height: doc.page.height });
    doc.fontSize(25).text(title, 100, 100);
    doc.fontSize(20).text(author, 100, 150);
  }
  doc.addPage();

  // Internal pages
  for (let i = 0; i < 5; i++) {
    if (req.files.internalPages && req.files.internalPages[i]) {
      const page = req.files.internalPages[i];
      doc.image(page.buffer, 0, 0, { width: doc.page.width, height: doc.page.height });
    }
    doc.fontSize(15).text(content[i] || '', 100, 100);
    if (i < 4) doc.addPage();
  }

  // Back cover
  if (req.files.backCover) {
    const backCover = req.files.backCover[0];
    doc.image(backCover.buffer, 0, 0, { width: doc.page.width, height: doc.page.height });
  }

  doc.end();
});

module.exports = router;
