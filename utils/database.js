import mongoose from "mongoose";
export const connectToDB = async () => {
    let isConnected = false;

    mongoose.set('strictQuery', true);
    if(isConnected) {
        console.log('=> using existing database connection');
        return ;
    }
    try {
  mongoose.connect(`${process.env.MONGODB_URI}`, {
    dbName: "sharedPrompts",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('=> using new database connection');


    } catch (error) {
        console.log('=> error while connecting with database');

    }

};