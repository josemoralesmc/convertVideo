import express, { Express } from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import multer from "multer"
import VideoRouter from './routes/routes'
import routerSession from './routes/session.routes'
import setUpEnviroment from '../database/awsDB'
import {runMongo} from '../database/mongo'
import cors from 'cors'

const app: Express = express()
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
  origin:'http://localhost:5173',
  credentials: true,
}))
app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))
app.use("/video",upload.single('video'), VideoRouter)

app.use('/auth', routerSession)

setUpEnviroment()
runMongo()

app.listen(8000, () => {
  console.log(
    `server running : http://localhost:8000`
  )
})
