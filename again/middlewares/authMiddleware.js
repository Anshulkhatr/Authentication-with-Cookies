import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const protect = async (req, res, next) => {
    try {
        // Read token from cookies first, fallback to Authorization header
        let token = req.cookies?.token

        if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
        }

        if (!token) {
            res.status(401)
            throw new Error('Not authorized, no token provided')
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decode.id).select('-password')

        if (!user) {
            res.status(401)
            throw new Error('User not found')
        }

        req.user = user
        next()
    } catch (error) {
        res.status(401)
        throw new Error(error.message || 'Unauthorized Access')
    }
}

export default protect