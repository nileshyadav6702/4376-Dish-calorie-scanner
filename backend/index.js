import express from 'express';
import dishRoutes from './routes/dishroute.js';
import mongoose from 'mongoose';
const app = express();
const port = 3000;


app.use(express.json());

app.use("/api/dishes", dishRoutes);
const MONGO_URI = "mongodb://127.0.0.1:27017/dish-api";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('mongo connection established');
  })
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});