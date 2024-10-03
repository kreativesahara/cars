import express, { Application } from 'express';
import usersRoute from './routes/Api/user';
import productsRoute from './routes/Api/product';
import cors from 'cors';
import corsOptions from './config/corsOptions';

const app : express.Application = express();
app.use(cors(corsOptions));
const PORT : number = 3100;  

app.get('/', (req: express.Request, res: express.Response ) => {
    res.status(200).send('THIS IS SERVER!');
})

// Middleware to parse JSON body
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/users',usersRoute )
app.use("/products", productsRoute)

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})