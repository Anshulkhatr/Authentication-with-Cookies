import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectDB from './config/dbConfig.js'
import authRoutes from './routes/userRoutes.js'
import errorHandler from './middlewares/errorHandler.js'
import todoRoutes from './routes/todoRoutes.js'

dotenv.config()
connectDB()

const app = express()
const PORT = process.env.PORT || 4040

app.use(cors({
    origin: process.env.CLIENT_URL || true,
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.json({
        message: `api is running on ${PORT}`
    })
})

app.use('/api/auth', authRoutes)

app.use('/api', todoRoutes)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is listen on PORT ${PORT}`)
})