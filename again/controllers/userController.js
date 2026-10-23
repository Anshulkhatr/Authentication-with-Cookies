import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

const isProduction = process.env.NODE_ENV === 'production'

const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax'
}

const accessTokenCookieOptions = {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000 // 15 minutes
}

const refreshTokenCookieOptions = {
    ...cookieOptions,
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
}

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "1d" })
}

const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "30d" })
}

const registerUser = async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please fill all details")
    }

    let emailExists = await User.findOne({ email })

    if (emailExists) {
        res.status(400)
        throw new Error("Email Already Exists")
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    let user = await User.create({ name, email, password: hashPassword })

    if (!user) {
        res.status(400)
        throw new Error("User could not be created")
    }

    const token = generateToken(user._id)
    const refreshToken = generateRefreshToken(user._id)

    // Set cookies
    res.cookie('token', token, accessTokenCookieOptions)
    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions)

    res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        token,
        refreshToken,
        message: "User registered successfully"
    })
}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400)
        throw new Error("Please fill all details")
    }

    let user = await User.findOne({ email })

    if (!user) {
        res.status(401)
        throw new Error("Invalid credentials")
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        res.status(401)
        throw new Error("Invalid credentials")
    }

    const token = generateToken(user._id)
    const refreshToken = generateRefreshToken(user._id)

    // Set cookies
    res.cookie('token', token, accessTokenCookieOptions)
    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions)

    res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        token,
        refreshToken,
        message: "Login successful"
    })
}

const logoutUser = (req, res) => {
    res.clearCookie('token', cookieOptions)
    res.clearCookie('refreshToken', cookieOptions)

    res.status(200).json({
        message: "Logged out successfully"
    })
}

const privateController = (req, res) => {
    res.json({
        message: 'Access granted to private route',
        user: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email
        }
    })
}

const refreshTokenController = async (req, res) => {
    // Read refreshToken from cookies first, fallback to req.body
    const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken

    if (!refreshToken) {
        res.status(401)
        throw new Error("No Refresh Token Found in cookies or request body")
    }

    try {
        let decode = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
        const user = await User.findById(decode.id)

        if (!user) {
            res.status(401)
            throw new Error("User no longer exists")
        }

        const newToken = generateToken(user._id)

        // Store new access token in cookie
        res.cookie('token', newToken, accessTokenCookieOptions)

        res.status(200).json({
            message: "Token refreshed successfully",
            token: newToken
        })
    } catch (error) {
        res.status(403)
        throw new Error(error.message || "Invalid refresh token")
    }
}

const authController = {
    registerUser,
    loginUser,
    logoutUser,
    privateController,
    refreshTokenController
}

export default authController