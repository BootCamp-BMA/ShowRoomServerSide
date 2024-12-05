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
 *   get:
 *     summary: Query cars with conditions, sorting, and pagination
 *     description: Retrieve a list of cars from the inventory based on filter conditions, sorting, field selection, and pagination. Accessible by all users.
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
 *                 description: MongoDB-like query object to filter cars.
 *                 example: { "fuelType": "Electric", "isAvailable": true }
 *               sort:
 *                 type: object
 *                 description: MongoDB-like object to sort cars. Use `1` for ascending and `-1` for descending order.
 *                 example: { "pricePerDay": 1, "year": -1 }
 *               select:
 *                 type: string
 *                 description: Comma-separated list of fields to include or exclude in the response.
 *                 example: "make model pricePerDay"
 *               limit:
 *                 type: integer
 *                 description: Maximum number of results to return. Default is 1.
 *                 example: 10
 *               skip:
 *                 type: integer
 *                 description: Number of records to skip for pagination. Default is 0.
 *                 example: 5
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 *       400:
 *         description: Invalid request format or parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid input data
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */


router.get('/getWhere', getWhere);

/**
 * @swagger
 * /api/cars/create:
 *   post:
 *     summary: Create a new car
 *     description: Add a new car to the inventory. Only accessible by admin users.
 *     tags:
 *       - Car
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






