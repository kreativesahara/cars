import express from 'express';
import * as path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import morgan from 'morgan';
import cors from 'cors';
import cron from 'node-cron';

import testRoute from './routes/test'

import authRoute from './routes/Api/auth';
import reqResetRoute from './routes/Api/reqReset';
import resetPasswordRoute from './routes/Api/resetPassword';
import usersRoute from './routes/Api/user';
import productsRoute from './routes/Api/product';
import publicProductsRoute from './routes/Api/publicProduct'
import sellersRoute from './routes/Api/seller'

import testProductRoute from './routes/Api/testProduct'
import subscriptionRoutes from './routes/Api/subscribe';

import searchCarsRoute from './routes/Api/searchCars'
import filterCarRoute from './routes/Api/filterCars';
import refreshRoute from './routes/Api/refresh'
import logoutRoute from './routes/Api/logout'

import corsOptions from './config/corsOptions';
import { requireAuth } from './middleware/requireAuth';

import { checkExpiredSubscriptions } from './controllers/subscriptionController';



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
app.use('/seller_profile', express.static(path.join(__dirname, 'seller_profile')));
app.use('/api/users',usersRoute )
app.use("/api/auth", authRoute)
app.use('/api/forgot-password', reqResetRoute)
app.use('/api/reset-password', resetPasswordRoute)
app.use('/api/refresh', refreshRoute)
app.use('/api/search', searchCarsRoute)
app.use("/api/sellers", sellersRoute)
app.use("/api/publicproducts", publicProductsRoute)

app.use('/api/subscriptions',requireAuth, subscriptionRoutes);
//Test Case
app.use('/api/filter', requireAuth, filterCarRoute)
app.use("/test", requireAuth, testRoute)
app.use("/testproduct", requireAuth, testProductRoute)

//API Routes
app.use("/api/products", requireAuth, productsRoute)
app.use('/api/logout', requireAuth, logoutRoute)


cron.schedule('0 0 * * *', () => {
    console.log('Running subscription expiry check...');
    checkExpiredSubscriptions();
});

// Start the server
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})