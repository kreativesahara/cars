import express, { Application } from 'express';
import usersRoute from './routes/Api/user';
import billsRoute from './routes/Api/bills';
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
app.use("/bills",billsRoute)
// app.get('/bills', (req: express.Request, res: express.Response)=> {
//     res.send('This are THE BILLS!');
// })
// db.execute(`SELECT * FROM bills`, (err:any, result:any) => {
//     console.error(err);
//     console.log(result);
//})
app.get('/readings', (req: express.Request, res: express.Response)=> {
    res.send('This are THE READINGS!');
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})