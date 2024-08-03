import { Request, Response } from 'express';
import { Crypto, CryptoDocument } from './models';

const ONE_SECOND_IN_MS = 1000;

async function fetchList(req: Request, res: Response): Promise<void> {
    try {
        const coins: CryptoDocument[] = await Crypto.find({}).sort({ rank: 1 }).select({ price: 0 }).exec();
        if (!coins.length) {
            throw new Error("Something went wrong, No coins found");
        }
        res.send(coins);
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            res.status(500).send({ message: error.message });
        } else {
            res.status(500).send({ message: 'An unknown error occurred' });
        }
    }
}

async function fetchPrice(req: Request, res: Response): Promise<void> {
    try {
        let { code } = req.params;
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });
        code = code.toUpperCase();

        const interval = setInterval(() => fetchAndSendData(res, code), 5 * ONE_SECOND_IN_MS);

        req.on('close', () => {
            clearInterval(interval);
        });
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            res.status(500).send({ message: error.message });
        } else {
            res.status(500).send({ message: 'An unknown error occurred' });
        }
    }
}

async function fetchAndSendData(res: Response, code: string): Promise<void | Response> {
    try {
        const coin: CryptoDocument | null = await Crypto.findOne({ code }).select({ price: 1 }).exec();
        if (!coin) {
            return res.status(404).send({ message: "Coin not found" });
        }
        res.write(`data: ${JSON.stringify(coin.price)}\n\n`);
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            res.status(500).send({ message: error.message });
        } else {
            res.status(500).send({ message: 'An unknown error occurred' });
        }
    }
}

export { fetchList, fetchPrice };
