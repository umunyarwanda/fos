import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { initializeDatabase } from './config/database';
import { swaggerSpec } from './config/swagger';
import userRoutes from './routes/userRoutes';
import eventRoutes from './routes/eventRoutes';
import specialProgramRoutes from './routes/specialProgramRoutes';
import scheduleRoutes from './routes/scheduleRoutes';
import commissionRoutes from './routes/commissionRoutes';
import bookingRoutes from './routes/bookingRoutes';
import contactRoutes from './routes/contactRoutes';
import authRoutes from './routes/authRoutes';
import uploadRoutes from './routes/upload.routes';
import videoRoutes from './routes/videoRoutes';
import { SCHEDULES_URL, EVENTS_URL, USERS_URL, SPECIAL_PROGRAMS_URL, COMMISSIONS_URL, BOOKINGS_URL, CONTACTS_URL, AUTH_URL, UPLOAD_URL, VIDEOS_URL } from './shared/variables/urls';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('combined')); // Logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'FOS Backend API Server',
    version: '1.0.0',
    status: 'running'
  });
});

app.use(USERS_URL.BASE, userRoutes);
app.use(EVENTS_URL.BASE, eventRoutes);
app.use(SPECIAL_PROGRAMS_URL.BASE, specialProgramRoutes);
app.use(SCHEDULES_URL.BASE, scheduleRoutes);
app.use(COMMISSIONS_URL.BASE, commissionRoutes);
app.use(BOOKINGS_URL.BASE, bookingRoutes);
app.use(CONTACTS_URL.BASE, contactRoutes);
app.use(AUTH_URL.BASE, authRoutes);
app.use(UPLOAD_URL.BASE, uploadRoutes);
app.use(VIDEOS_URL.BASE, videoRoutes);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'FOS Backend API Documentation'
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Initialize database and start server
const startServer = async () => {
  try {
    await initializeDatabase();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();