import cors from 'cors';
import express, { Application, Request, Response, NextFunction } from 'express';
import productRoutes from './Routes/productRoutes';
import orderRoutes from './Routes/orderRoutes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to my E-commerce API');
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

export default app;
