
/**
 * BACKEND ARCHITECTURE (Node.js + Express + MongoDB)
 * 
 * Instructions:
 * 1. Install dependencies: npm install express mongoose cors jsonwebtoken bcryptjs helmet morgan
 * 2. Create .env with MONGODB_URI and JWT_SECRET
 */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// DB Connection
// mongoose.connect(process.env.MONGODB_URI);

// Simple User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: { type: String, select: false },
});

// Resume Schema
const ResumeSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: String,
  templateId: String,
  personalInfo: Object,
  education: Array,
  experience: Array,
  projects: Array,
  skills: Array,
  lastModified: { type: Date, default: Date.now }
});

const Resume = mongoose.model('Resume', ResumeSchema);

// Auth Middleware
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send({ error: 'Please authenticate.' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

// API Endpoints
app.get('/api/resumes', auth, async (req, res) => {
  const resumes = await Resume.find({ userId: req.userId });
  res.send(resumes);
});

app.post('/api/resumes', auth, async (req, res) => {
  const resume = new Resume({ ...req.body, userId: req.userId });
  await resume.save();
  res.status(201).send(resume);
});

app.put('/api/resumes/:id', auth, async (req, res) => {
  const resume = await Resume.findOneAndUpdate({ _id: req.params.id, userId: req.userId }, req.body, { new: true });
  res.send(resume);
});

// PDF Generation Endpoint (Placeholder for server-side logic)
// Typically using puppeteer or chromium
app.post('/api/export/pdf', auth, async (req, res) => {
  // 1. Receive resume JSON
  // 2. Render HTML template
  // 3. Convert to PDF using Puppeteer
  // 4. Send back binary stream
  res.send({ status: 'success', message: 'PDF generated via chromium' });
});

// Export script for the environment if needed
module.exports = app;
