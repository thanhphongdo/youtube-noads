import * as express from 'express';
import { BaseApi } from './base';

export class ExampleApi extends BaseApi {
    constructor(router: express.Router) {
        super(router);
        this.getExample();
    }

    getExample() {
        this.router.get('/example', (req, res, next) => {
            res.json({
                message: 'this is example API'
            });
        });
    }
}