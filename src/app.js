import express from 'express';



const app = express();

//health
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'ok'
    });
})
const port = process.env.PORT || 3000;


export default app;