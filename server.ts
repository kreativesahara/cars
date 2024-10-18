import express from 'express';
import * as path from 'path';
import usersRoute from './routes/Api/user';
import productsRoute from './routes/Api/product';
import imagesRoute from './routes/Api/image';
//import authRoute from './routes/Api/auth';
import testRoute from './routes/test'
import uploadRoute from './routes/Api/upload'
import cors from 'cors';
import corsOptions from './config/corsOptions';

const app : express.Application = express();
const PORT: number = Number(process.env.PORT) || 3100;  

// Middleware to parse JSON body & parse URL-encoded bodies (for form submissions)
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));


// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.get('/', (req: express.Request, res: express.Response ) => {
    res.status(404).send('THIS IS SERVER!');
})

app.use('/users',usersRoute )
app.use("/products", productsRoute)
app.use("/image", imagesRoute)
//app.use("/auth", authRoute)

//Test Case
app.use("/test", testRoute)
app.use("/upload",uploadRoute)

// Start the server
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})