const router = require('express').Router();
const userRoutes = require('./user-routes');

// prefix for bot user and thoughts
router.use('/users', userRoutes);

module.exports = router;