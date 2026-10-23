import express from 'express'
import authController from '../controllers/userController.js'
import protect from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/register', authController.registerUser)
router.post('/login', authController.loginUser)
router.post('/logout', authController.logoutUser)
router.post('/refresh', authController.refreshTokenController)
router.get('/private', protect, authController.privateController)
router.post('/private', protect, authController.privateController)

router.get("/me", protect, (req, res) => {
    res.status(200).json({
        user: req.user,
    });
});

export default router