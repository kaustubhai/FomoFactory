import express from 'express';
import connectDB from './utils/mongo';
import dotenv from 'dotenv';
import cors from 'cors';
import { startFetchingPrices } from './utils/poll';
import cryptoRouter from './router';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/kaustubhai';

connectDB(MONGO_URI);

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.send('Server is up & running');
});

app.use('/api/crypto', cryptoRouter);

startFetchingPrices();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
