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
 *     summary: Get cars based on specified conditions
 *     description: Retrieve a list of cars based on filtering criteria, sorting options, and pagination.
 *     tags:
 *       - Car
 *     parameters:
 *       - name: condition
 *         in: query
 *         description: Filtering criteria (e.g., car make, year, etc.)
 *         required: false
 *         schema:
 *           type: object
 *       - name: sort
 *         in: query
 *         description: Sorting order for the results (e.g., price, year).
 *         required: false
 *         schema:
 *           type: object
 *       - name: select
 *         in: query
 *         description: Fields to be returned (e.g., 'make model year').
 *         required: false
 *         schema:
 *           type: string
 *       - name: limit
 *         in: query
 *         description: Number of cars to return
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: skip
 *         in: query
 *         description: Number of cars to skip (pagination)
 *         required: false
 *         schema:
 *           type: integer
 *           default: 0
 *     responses:
 *       200:
 *         description: List of cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Internal Server Error
 */

router.get('/getWhere',getWhere);
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
router.post('/create',createCar)

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

router.delete('/deleteIds',deleteCars)


module.exports=router;






