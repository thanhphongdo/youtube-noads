import * as express from 'express';

export class BaseApi {

    router: express.Router;

    constructor(router: express.Router) {
        this.router = router;
    }
}