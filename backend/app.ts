import express, { Express, Request, Response, NextFunction } from "express";

import healthRoutes from './routes/health';
import productRoutes from './routes/products';
import SwaggerSpec  from './utils/swagger';
import swaggerUi from 'swagger-ui-express'

const port: number = 3000;
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

app.use(express.json());

app.use('/', healthRoutes);

app.use('/api', productRoutes);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(SwaggerSpec));

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send('<h1>404: Page not found.</h1>');
});

app.listen({port: 3000});
