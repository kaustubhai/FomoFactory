import axios, { AxiosResponse } from 'axios';

const liveCoinWatchAPIKey: string = process.env.API_KEY || "ed29f84d-8fe1-43e4-939b-577b029195ef";
const liveCoinWatchAPIURL = "https://api.livecoinwatch.com/coins/list";

interface CryptoData {
    name: string;
    webp32: string;
    code: string;
    allTimeHighUSD: number;
    rank: number;
    rate: number;
}

interface LiveCoinWatchParams {
    currency: string;
    sort: string;
    order: string;
    offset: number;
    limit: number;
    meta: boolean;
}

async function callLiveCoinWatchAPI(): Promise<any> {
    const params: LiveCoinWatchParams = {
        currency: "USD",
        sort: "rank",
        order: "ascending",
        offset: 0,
        limit: 5,
        meta: true,
    };

    try {
        const response: AxiosResponse<any> = await axios.post(liveCoinWatchAPIURL, params, {
            headers: {
                "content-type": "application/json",
                "x-api-key": liveCoinWatchAPIKey
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error calling LiveCoinWatch API:', error);
        throw error;
    }
}

export { callLiveCoinWatchAPI, CryptoData };

