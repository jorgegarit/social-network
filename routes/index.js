const router = require('express').Router();

// importing the api routes
const apiRoutes = require('./api');

// adding /api for api routes
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send('<h1>404 Error!</h1>');
});

module.exports = router; 