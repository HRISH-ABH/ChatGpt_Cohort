import express from 'express';


import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
const app = express();
//to use EJS
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); //public folder's content will be accessible

//health
app.get('/', (req, res) => {
    console.log('health check');
    
    res.status(200).json({
        message: 'ok'
    });
})
app.use("/auth",authRoutes);




export default app;