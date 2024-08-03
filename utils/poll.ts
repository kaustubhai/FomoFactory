import { Crypto } from "../models";
import { callLiveCoinWatchAPI, CryptoData } from "./apiCalls";

const ONE_SECOND_IN_MS = 1000;

async function updatePrices(): Promise<void> {
    try {
        const data: CryptoData[] = await callLiveCoinWatchAPI();

        for (let crypto of data) {
            const dataToUpdate = {
                $set: {
                    rate: crypto.rate,
                },
                $push: {
                    price: {
                        $each: [{
                            rate: crypto.rate,
                            updatedAt: new Date()
                        }],
                        $slice: -20
                    }
                }
            };

            await Crypto.findOneAndUpdate(
                { code: crypto.code },
                dataToUpdate,
            );
        }
    } catch (error) {
        console.error('Error updating prices:', error);
    }
}

async function startFetchingPrices(): Promise<void> {
    try {
        const data: CryptoData[] = await callLiveCoinWatchAPI();

        for (let crypto of data) {
            const dataToUpdate = {
                name: crypto.name,
                symbol: crypto.webp32,
                code: crypto.code,
                allTimeHigh: crypto.allTimeHighUSD,
                rank: crypto.rank,
                rate: crypto.rate,
                $push: {
                    price: {
                        rate: crypto.rate,
                        updatedAt: new Date()
                    }
                }
            };

            await Crypto.findOneAndUpdate(
                { code: crypto.code },
                dataToUpdate,
                { upsert: true, new: true },
            );
        }

        setInterval(async () => {
            await updatePrices();
        }, 5 * ONE_SECOND_IN_MS);
    } catch (error) {
        console.error('Error starting price fetching:', error);
    }
}

export { startFetchingPrices };
