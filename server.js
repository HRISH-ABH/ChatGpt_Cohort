import "dotenv/config";
import app from "./src/app.js";

import connectDB from "./src/config/db/db.js";
const PORT=process.env.PORT;
connectDB();

app.listen(PORT,()=>{
    console.log("Server running on :"+PORT);
    
})