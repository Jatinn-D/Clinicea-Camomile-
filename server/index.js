import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db.js'; 
import appointmentRoutes from './routes/appointmentRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';

dotenv.config();

const app = express();

// FIXED: Removed trailing slash and added local support for testing
const allowedOrigins = [
  'https://clinicea-camomile.vercel.app',
  'http://localhost:5173', // Vite default
  'http://localhost:3000'  // CRA default
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/appointments', appointmentRoutes); 
app.use('/api/services', serviceRoutes);

app.post('/api/appointments/lookup-email', async (req, res) => {
  const { email } = req.body;
  try {
    const result = await pool.query("SELECT * FROM patients WHERE email = $1", [email]);
    if (result.rows.length > 0) {
      return res.json({ exists: true, patient: result.rows[0] });
    }
    res.json({ exists: false });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/health', (req, res) => {
    res.json({ status: "ok", message: "Server is live on Railway!" });
});

// Start the server - Railway provides the PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
});