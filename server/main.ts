import * as http from 'http';
import * as express from 'express';
// import * as cors from 'cors';
import { ExampleApi } from './apis';

export class MainServer {

    app: express.Express;
    router: express.Router;
    server: http.Server;

    constructor() {
        this.app = express();
        this.router = express.Router();

        // this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    startServer(port?: number) {
        this.addRouter();
        this.server = http.createServer(this.app);
        this.server.listen(port || 27210);
    }

    addRouter() {
        new ExampleApi(this.router);
        this.app.use('/', this.router);
    }
}