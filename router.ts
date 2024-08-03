import express, { Router } from 'express';
import { Request, Response } from 'express';
import { fetchList, fetchPrice } from './controller';

const router: Router = express.Router();

router.get('/list', async (req: Request, res: Response) => {
    try {
        await fetchList(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

router.get('/price/:code', async (req: Request, res: Response) => {
    try {
        await fetchPrice(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

export default router;
