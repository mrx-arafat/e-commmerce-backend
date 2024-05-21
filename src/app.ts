import cors from 'cors';
import express, { Application, Request, Response } from 'express';

const app = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.get('/', (req: Request, res: Response) => {
  res.send('hello BSDK');
});

export default app;
