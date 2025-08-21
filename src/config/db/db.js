import mongoose from "mongoose"

const connectDB=()=>{
     mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Connected Successfully!");
        
     }).catch(()=>{
        console.log("Error connecting DB!");
        
     });
}
export default connectDB;