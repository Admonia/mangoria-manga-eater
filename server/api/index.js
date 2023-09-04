const express = required('express');
const router = express.Router();

//get /api/health
router.get('health', (re,res,next) => {
    res.send('OK');
});

//Router: api/users

router.use('/users', require('./users'));

export default router;