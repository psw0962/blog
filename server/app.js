import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan';
import config from './config'

const app = express();
const {MONGO_URI} = config

app.use(hpp())
app.use(helmet())
app.use(cors({
    origin: true,
    credentials: true,
}))
app.use(morgan('dev'))

mongoose.connect(MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connecting Success!!'))
.catch((e) => console.log(e))

app.get('/')

export default app;