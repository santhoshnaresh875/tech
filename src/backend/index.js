// backend/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database connection (assuming MongoDB here)
mongoose.connect('mongodb+srv://santhoshnaresh875:yhmgRm54zXrA9xzZ@cluster0.n28sne2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: String,
  fathername: String,
  email: String,
  city: String,
  state: String,
  resume: String,
});

const User = mongoose.model('User', userSchema);


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });


app.post('/register', upload.single('resume'), async (req, res) => {
  const { username, fathername, email, city, state } = req.body;
  const resume = req.file.path;
  const newUser = new User({ username, fathername, email, city, state, resume });
  try {
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

app.listen(port, () => {
  console.log(`Server running at:${port}/`);
});
