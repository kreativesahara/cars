import express, { Application } from 'express';
import * as path from 'path';
import usersRoute from './routes/Api/user';
import productsRoute from './routes/Api/product';
import imagesRoute from './routes/Api/image';
import cors from 'cors';
import corsOptions from './config/corsOptions';

const app : express.Application = express();
const PORT: number = Number(process.env.PORT) ?? 3100;  
app.use(cors(corsOptions));
// Middleware to parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.get('/', (req: express.Request, res: express.Response ) => {
    res.status(200).send('THIS IS SERVER!');
})

// Middleware to parse JSON body
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/users',usersRoute )
app.use("/products", productsRoute)
app.use("/image", imagesRoute)

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})