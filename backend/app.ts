import express, { Express, Request, Response, NextFunction } from "express";

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => { 
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, DELETE, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


//handle incoming json data
app.use(express.json()) 

//API pubic routes
// app.use('/api', publicRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send('<h1> 404: Page not found!!!</h1>')
})

app.listen(8080);