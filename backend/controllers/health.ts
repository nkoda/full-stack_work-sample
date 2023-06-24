import { Request, Response } from 'express';
import fs from 'fs';
import { JSONProductsPath } from '../utils/connect';

const JSON_FILE_PATH = JSONProductsPath
/**
 * Handles the health check request.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {void}
 * @throws {Error} If the JSON file does not exist or is corrupted.
 */
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
        res.status(500).json({ error: 'Health check failed,' + error.message});
    }
};