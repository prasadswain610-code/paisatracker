import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import expenseRoutes from './routes/expenses.js';
import savingsRoutes from './routes/savings.js';
import investmentRoutes from './routes/investments.js';
import budgetRoutes from './routes/budgets.js';
import notificationRoutes from './routes/notifications.js';
import aiRoutes from './routes/ai.js';
import pdfRoutes from './routes/pdf.js';

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/savings', savingsRoutes);
app.use('/api/investments', investmentRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/pdf', pdfRoutes);

// Serve static SPA from public folder (one level up)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '..', 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
