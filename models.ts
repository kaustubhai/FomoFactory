import mongoose, { Schema, Document } from 'mongoose';

interface PriceList {
    rate: number;
    currency: string;
    updatedAt: Date;
}

interface CryptoDocument extends Document {
    name: string;
    symbol: string;
    code: string;
    rate: number;
    allTimeHigh: number;
    rank: number;
    price: PriceList[];
}

const priceListSchema: Schema<PriceList> = new Schema({
    rate: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: "USD"
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

const cryptoSchema: Schema<CryptoDocument> = new Schema({
    name: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    rate: {
        type: Number,
        required: true
    },
    allTimeHigh: {
        type: Number,
        required: true
    },
    rank: {
        type: Number,
        required: true
    },
    price: [priceListSchema]
});

const Crypto = mongoose.model<CryptoDocument>('Crypto', cryptoSchema);

export { Crypto, CryptoDocument };
