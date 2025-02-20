import e from "express";
import mongoose from "mongoose";

const connect = async () => {

    try {
        console.log("Attempting to connect to database" );
        await mongoose.connect(process.env.MONGO_URI,{});
        console.log("connected to database" );
        
        console.log(process.env.MONGO_URI);
    } catch (error) {
        console.log("Database connection failed");
        console.log(process.env.MONGO_URI);
        process.exit(1);
    }
};

export default connect;