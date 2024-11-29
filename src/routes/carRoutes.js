const express = require('express')
const router=express.Router();
const {createCar,getCarById,getWhere, updateCar, deleteCars}=require('../controllers/carController.js')
const {auth} = require('../middleware/auth.js')

/**
 * @swagger
 * tags:
 *   name: Car
 *   description: Operations related to cars
 */



/**
 * @swagger
 * /api/cars/getById/{id}:
 *   get:
 *     summary: Get a car by ID
 *     description: Retrieve details of a specific car using its unique ID.
 *     tags:
 *       - Car
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the car to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: Car not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/getById/:id',getCarById);

/**
 * @swagger
 * /api/cars/getWhere:
 *   post:
 *     summary: Get cars based on dynamic search parameters
 *     description: Retrieve a list of cars based on search filters, sorting, field selection, and pagination. Only accessible by authenticated users with 'admin' or 'user' roles.
 *     tags:
 *       - Car
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               condition:
 *                 type: object
 *                 description: Filters to apply to the query (e.g., make, model, year).
 *                 example:
 *                   make: 'Tesla'
 *                   year: { "$gte": 2020 }
 *               sort:
 *                 type: object
 *                 description: Sorting rules (e.g., sort by price, year).
 *                 example:
 *                   pricePerDay: 1  # 1 means ascending order, -1 means descending order
 *               select:
 *                 type: string
 *                 description: Fields to include in the result. Leave empty to include all fields.
 *                 example: 'make model year pricePerDay'
 *               limit:
 *                 type: integer
 *                 description: The number of cars to return.
 *                 example: 10
 *               skip:
 *                 type: integer
 *                 description: The number of cars to skip (for pagination).
 *                 example: 0
 *     responses:
 *       200:
 *         description: List of cars matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 *       400:
 *         description: Invalid search parameters or data
 *       401:
 *         description: Unauthorized - Authentication required
 *       500:
 *         description: Internal Server Error
 */

router.get('/getWhere', auth(['admin', 'user']), getWhere);

/**
 * @swagger
 * /api/cars/create:
 *   post:
 *     summary: Create a new car
 *     description: Add a new car to the inventory. Only accessible by admin users.
 *     tags:
 *       - Car
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     responses:
 *       201:
 *         description: Car created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal Server Error
 */
router.post('/create',auth(['admin']),createCar)

/**
 * @swagger
 * /api/cars/update/{id}:
 *   put:
 *     summary: Update car details
 *     description: Update the details of an existing car by its ID. Only accessible by admin users.
 *     tags:
 *       - Car
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the car to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     responses:
 *       200:
 *         description: Car updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Car not found
 *       500:
 *         description: Internal Server Error
 */

router.put('/update/:id',auth(['admin']),updateCar)
/**
 * @swagger
 * /api/cars/deleteIds:
 *   delete:
 *     summary: Delete cars
 *     description: Delete a single car by ID or multiple cars by an array of IDs. Only accessible by admin users.
 *     tags:
 *       - Car
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID of the car to delete (optional if deleting multiple).
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of IDs to delete.
 *     responses:
 *       200:
 *         description: Car(s) deleted successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Car(s) not found
 *       500:
 *         description: Internal Server Error
 */

router.delete('/deleteIds',auth(['admin']),deleteCars)


module.exports=router;






