const express = require('express');
const router=express.Router();
const userController = require('../controllers/userController'); 
const { auth } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Operations related to users
 *   
 */


/**
 * @swagger
 * /api/users/getUsersWhere:
 *   post:
 *     summary: Get users based on conditions (POST request)
 *     description: Retrieve a list of users based on the specified condition, sorting, and pagination. The parameters are passed in the request body.
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               condition:
 *                 type: object
 *                 description: The condition to filter the users (e.g., active users, by role).
 *               sort:
 *                 type: object
 *                 description: The sorting conditions for the users (e.g., by last name).
 *               select:
 *                 type: string
 *                 description: Fields to be selected (e.g., 'firstName lastName').
 *               limit:
 *                 type: integer
 *                 description: Number of users to retrieve.
 *                 default: 1
 *               skip:
 *                 type: integer
 *                 description: Number of users to skip (pagination).
 *                 default: 0
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal Server Error
 */
router.get('/getUsersWhere',auth(['admin']),userController.getUsersWhere);

/**
 * @swagger
 * /api/users/updateUser:
 *   put:
 *     summary: Update user profile
 *     description: Update the details of the logged-in user or an admin updating another user's profile.
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phoneNum:
 *                 type: string
 *               phoneNum2:
 *                 type: string
 *               email:
 *                 type: string
 *               photo:
 *                 type: string
 *                 description: A base64-encoded string for the user's photo.
 *     responses:
 *       200:
 *         description: Successfully updated the user profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid user data
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */

router.put('/updateUser/:userId',auth(['user','admin']),userController.updateProfile)

/**
 * @swagger
 * /api/users/delete:
 *   delete:
 *     summary: Delete a user
 *     description: Delete a user from the database by their ID or multiple users by a list of IDs. Only accessible by admins.
 *     tags:
 *       - User
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
 *                 description: The ID of the user to delete.
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of user IDs to delete.
 *     responses:
 *       200:
 *         description: User(s) deleted successfully
 *       400:
 *         description: Invalid user ID or list of IDs
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/delete/:userId',auth(['admin']),userController.deleteUsers)




module.exports=router;