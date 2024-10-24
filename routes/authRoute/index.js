
const authControllers=require('../../controllers/authControllers/index');
const { protect } = require('../../middlewares/authMiddleware');
const router=require('express').Router();

router.post('/login',authControllers.authController)
router.post('/signup',authControllers.signupController)
router.get('/profile',protect,authControllers.getUserProfile)
router.delete('/delete',protect,authControllers.deleteUser)
router.put('/profile',protect,authControllers.updateUser)
module.exports=router
