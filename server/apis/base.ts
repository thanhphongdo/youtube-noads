import * as express from 'express';
import { HttpService } from '../services/http.service';

export class BaseApi {

    router: express.Router;
    httpService: HttpService;

    constructor(router: express.Router) {
        this.router = router;
        this.httpService = new HttpService();
    }
}