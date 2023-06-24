import swaggerJSDoc from 'swagger-jsdoc'
import { version } from '../package.json'

const options: swaggerJSDoc.Options = {
    definition:{
        openapi: '3.0.0',
        info:{
            title: 'REST API Documentation',
            version: version
        },
        servers: [
            {
              url: 'http://localhost:3000',
              description: 'Development server',
            },
          ],
        },
        apis: ['./routes/*.ts'],
};
      
const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;