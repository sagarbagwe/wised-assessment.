const express = require('express');
const multer = require('multer');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
app.use(cors());

// Set up Multer storage and upload
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const originalName = file.originalname;
    const extension = originalName.substring(originalName.lastIndexOf('.'));
    const filename = file.fieldname + '-' + uniqueSuffix + extension;
    cb(null, filename);
  },
});

const upload = multer({ storage });

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('MongoDB connected successfully');
});

const MaterialSchema = new mongoose.Schema({
  name: String,
  materialName: String,
  category: String,
  fileUrl: String,
});
const Material = mongoose.model('Material', MaterialSchema);

// Parse JSON bodies
app.use(express.json());

// API endpoint for uploading material
app.post('/upload', upload.single('materialFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload a file' });
    }

    // Simulating asynchronous upload process
    setTimeout(async () => {
      const { name, materialName, category } = req.body;
      const fileUrl = req.file.filename;

      // Save material to the database
      const material = new Material({ name, materialName, category, fileUrl });
      await material.save();

      res.status(200).json({ fileUrl });
    }, 2000);
  } catch (error) {
    console.error('Error uploading material:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint for fetching materials
app.get('/materials', async (req, res) => {
  try {
    // Fetch materials from the database
    const materials = await Material.find();
    res.status(200).json(materials);
  } catch (error) {
    console.error('Error fetching materials:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint for searching materials
app.get('/search', async (req, res) => {
  try {
    const query = req.query.query;

    // Search materials based on materialName
    const materials = await Material.find({
      materialName: { $regex: query, $options: 'i' },
    });
    res.status(200).json(materials);
  } catch (error) {
    console.error('Error searching materials:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
