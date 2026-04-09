import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://ayushitkhede4_db_user:YOLqncTSIgpwnCDW@cluster0.9jaumaj.mongodb.net/");
        console.log('mongodb connected successfully');
    } catch (error) {
        console.log(error);
    }
}
export default connectDB;