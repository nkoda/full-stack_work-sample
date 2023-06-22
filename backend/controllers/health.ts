import { Request, Response } from 'express';
import fs from 'fs';

const JSON_FILE_PATH = 'TODO'
export const getHealthCheckHandler = (req: Request, res: Response) => {
    try {
        // File existence check
        if (!fs.existsSync(JSON_FILE_PATH)) {
            throw new Error('JSON file does not exist');
        }
        // File read check
        const fileContent = fs.readFileSync(JSON_FILE_PATH, 'utf8');      

        // File integrity check
        try {
            JSON.parse(fileContent);
        } catch (error) {
            throw new Error('JSON file is corrupted');
        }

        // File integrity check
        try {
            JSON.parse(fileContent);
        } catch (error) {
            throw new Error('JSON file is corrupted');
        }

        const data = {
            status: 'Ok',
            uptime: process.uptime(),
            date: new Date()
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Health check failed' });
    }
};