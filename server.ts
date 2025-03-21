import express from 'express';
import * as path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import morgan from 'morgan';
import cors from 'cors';

import testRoute from './routes/test'

import authRoute from './routes/Api/auth';
import reqResetRoute from './routes/Api/reqReset';
import resetPasswordRoute from './routes/Api/resetPassword';
import usersRoute from './routes/Api/user';
import productsRoute from './routes/Api/product';
import publicProductsRoute from './routes/Api/publicProduct'
import sellersRoute from './routes/Api/seller'
import testProductRoute from './routes/Api/testProduct'

import searchCarsRoute from './routes/Api/searchCars'
import filterCarRoute from './routes/Api/filterCars';
import refreshRoute from './routes/Api/refresh'
import logoutRoute from './routes/Api/logout'

import corsOptions from './config/corsOptions';
import { requireAuth } from './middleware/requireAuth';



dotenv.config();
const app : express.Application = express();
const PORT: number = Number(process.env.PORT) || 3100;  

// Middleware to parse JSON body & parse URL-encoded bodies (for form submissions)
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors(corsOptions));
app.use(morgan('dev'))

app.get('/', (req: express.Request, res: express.Response) => {
    res.status(404).send('THIS IS SERVER!');
})
// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/users',usersRoute )
app.use("/auth", authRoute)
app.use('/forgot-password', reqResetRoute)
app.use('/reset-password', resetPasswordRoute)
app.use('/refresh', refreshRoute)
app.use('/search', searchCarsRoute)
app.use('/filter', requireAuth, filterCarRoute)
app.use("/sellers", sellersRoute)
app.use("/publicproducts", publicProductsRoute)

//Test Case
app.use("/test", requireAuth, testRoute)
app.use("/testproduct", requireAuth, testProductRoute)

//API Routes
app.use("/products", requireAuth, productsRoute)
app.use('/logout', requireAuth, logoutRoute)

// Start the server
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})