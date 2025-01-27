const express = require('express');
const router = express.Router();
const apiRootes = require('./apiRoutes.js');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../doc/swaggerConfig.js');  
const { errorHandler } = require('../middleware/errorHandler.js');

// Middleware to log requests
router.use((req, res, next) => {
    const prettyBody = JSON.stringify(req.body, null, 2); // Format body with 2-space indentation
    console.log(`\nRequest Info:
    Method: ${req.method}
    URL: ${req.originalUrl}
    Headers: ${JSON.stringify(req.headers, null, 2)}
    Body: ${prettyBody}\n`);
    next(); // Pass to the next middleware/route
});

// Home route
router.get('/', (req, res, next) => {
    try {
        res.render('HomePage.pug');
    } catch (error) {
        next(error);
    }
});

// API routes
router.use('/api', apiRootes);

// Swagger documentation
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Handle unknown routes
router.all('*', (req, res, next) => {
    try {
        res.status(404).json({ success: false, message: 'Page not found' });
    } catch (error) {
        next(error);
    }
});

// Error handling middleware
router.use(errorHandler);

module.exports = router;
