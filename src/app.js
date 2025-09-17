import cookieParser from 'cookie-parser';
import express from 'express'
import authRoutes from './routes/auth.routes.js';
import chatRoutes from './routes/chat.routes.js';

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/chat",chatRoutes);

app.get("/health",(req,res)=>{
    res.json({
        message:"Success!!"
    })
})



export default app;