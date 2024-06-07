const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const PDFDocument = require('pdfkit');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000', // URL of your React frontend
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/pdfGenerator', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Define routes
const pdfRouter = require('./routes/pdfRoutes');
app.use('/api/pdf', pdfRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
