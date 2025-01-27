const express = require('express');
const router = express.Router();
const {auth}= require('../middleware/auth')
const {getAppointmentById, getAppointmentsWhere, updateAppointment, createAppointment, deleteAppointment}=require('../controllers/appointementController')

/**
 * @swagger
 * tags:
 *   name: Appointment
 *   description: Operations related to appointments
 */

/**
 * @swagger
 * /api/appointement/getById/{id}:
 *   get:
 *     summary: Get an appointment by ID
 *     description: Retrieve details of a specific appointment using its unique ID. Access is restricted to authenticated admin and user roles.
 *     tags:
 *       - Appointment
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the appointment to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Appointment details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       404:
 *         description: Appointment not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/getById/:id',auth(['admin','user']),getAppointmentById)
/**
 * @swagger
 * /api/appointement/getWhere:
 *   get:
 *     summary: Get appointments based on specified conditions
 *     description: Retrieve a list of appointments based on filtering criteria, sorting options, and pagination. Access is restricted to authenticated admin and user roles.
 *     tags:
 *       - Appointment
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: condition
 *         in: query
 *         description: Filtering criteria (e.g., status, user ID)
 *         required: false
 *         schema:
 *           type: object
 *       - name: sort
 *         in: query
 *         description: Sorting order for the results (e.g., appointmentDateTime, status)
 *         required: false
 *         schema:
 *           type: object
 *       - name: select
 *         in: query
 *         description: Fields to be returned (e.g., 'userId carId status')
 *         required: false
 *         schema:
 *           type: string
 *       - name: limit
 *         in: query
 *         description: Number of appointments to return
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: skip
 *         in: query
 *         description: Number of appointments to skip (pagination)
 *         required: false
 *         schema:
 *           type: integer
 *           default: 0
 *     responses:
 *       200:
 *         description: List of appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Internal Server Error
 */


router.get('/getWhere',auth(['admin','user']),getAppointmentsWhere)

/**
 * @swagger
 * /api/appointement/create:
 *   post:
 *     summary: Create a new appointment
 *     description: Add a new appointment. Access is restricted to authenticated admin and user roles.
 *     tags:
 *       - Appointment
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       201:
 *         description: Appointment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: User or car not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/create',auth(['admin','user']),createAppointment)

/**
 * @swagger
 * /api/appointement/update/{id}:
 *   put:
 *     summary: Update appointment details
 *     description: Update the details of an existing appointment by its ID. Access is restricted to authenticated admin and user roles.
 *     tags:
 *       - Appointment
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the appointment to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       200:
 *         description: Appointment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Appointment, user, or car not found
 *       500:
 *         description: Internal Server Error
 */



router.put('/update/:id',auth(['admin','user']),updateAppointment)

/**
 * @swagger
 * /api/appointement/delete:
 *   delete:
 *     summary: Delete an appointment
 *     description: Delete a single appointment by ID or multiple appointments by an array of IDs. Access is restricted to authenticated admin users.
 *     tags:
 *       - Appointment
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
 *                 description: ID of the appointment to delete (optional if deleting multiple)
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of IDs to delete
 *     responses:
 *       200:
 *         description: Appointment(s) deleted successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Appointment(s) not found
 *       500:
 *         description: Internal Server Error
 */

router.delete('/delete',auth(['admin']),deleteAppointment)






module.exports=router