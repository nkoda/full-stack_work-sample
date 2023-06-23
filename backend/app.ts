import express, { Express, Request, Response, NextFunction } from "express";

import healthRoutes from './routes/health';
import productRoutes from './routes/products';

const app: Express = express();

app.use((req: Request, res: Response, next: NextFunction) => { 
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader(
        'Access-Control-Allow-Methods', 
        'OPTIONS, GET, POST, DELETE, PUT'
    );
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Content-Type, Authorization'
    );
    next();
});

// Handle incoming JSON data
app.use(express.json());

app.use('/', healthRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send('<h1>404: Page not found.</h1>');
});

app.listen({ port: 3000 });
