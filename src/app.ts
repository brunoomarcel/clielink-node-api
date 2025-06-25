import express from 'express';
import urlRoutes from './routes/urlRoutes';

const app = express();

// Middleware para interpretar JSON no body das requisições
app.use(express.json());

app.use('/api/url', urlRoutes);

export default app;
