import express from 'express'
import helmet from 'helmet';
import hpp from 'hpp';
import mongoose from 'mongoose';
import morgan from 'morgan';
import config from './config'
import cors from 'cors';

// Routes
import postsRoutes from './routes/api/post';

const app = express();
const {MONGO_URI} = config

app.use(hpp());
app.use(helmet());
app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());

mongoose.connect(MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
.then(() => console.log('MongoDB connecting Success!!'))
.catch((e) => console.log(e))

// Use routes
app.get('/')
app.use('/api/post', postsRoutes)

export default app;