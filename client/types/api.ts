export interface CoinPrice {
    currency: string;
    rate: number;
    updatedAt: string;
}

export interface CoinsData {
    rate: number;
    rank: number;
    name: string;
    code: string;
    allTimeHigh: number;
    symbol: string;
}

export type ApiResponse = CoinsData[];