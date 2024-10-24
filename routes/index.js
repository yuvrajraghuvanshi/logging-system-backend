
const router=require('express').Router();
const authRoutes=require('./authRoute/index')
const logRoutes=require('./logRoute/index')


router.use('/auth',authRoutes)
router.use('/logs',logRoutes)


module.exports=router
