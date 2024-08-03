import mongoose from 'mongoose';

const connectDB = (dbUri: string): void => {
    mongoose.connect(dbUri)
        .then(() => {
            console.log('Database is up');
        })
        .catch((err: Error) => {
            console.error('Error in connecting DB:', err);
        });
};

export default connectDB;
