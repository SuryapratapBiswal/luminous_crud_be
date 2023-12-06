import mongoose from "mongoose";

export const Connection = async () => {
    const URL = process.env.MONGODB_URL
    try {
        await mongoose.connect(URL, {
            tls:true,
        });
        console.log(`Database connection established`);
    } catch (error) {
        console.log(`Error while connecting with database: ${error.message}`);
    }
};

export default Connection;