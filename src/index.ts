import express from 'express';
import { appDataSource } from './data-source';
import { routes } from './routes/routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger.json';

appDataSource.initialize().then(() => {

    const app = express();

    app.use(express.json());

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    app.use("/v1", routes);

    return app.listen(process.env.PORT)

})