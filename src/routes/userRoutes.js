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
 *   get:
 *     summary: Get users based on conditions
 *     description: Retrieve a list of users based on the specified condition, sorting, and pagination.
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: condition
 *         in: query
 *         description: Condition to filter the users (e.g., active users, by role).
 *         required: false
 *         schema:
 *           type: object
 *       - name: sort
 *         in: query
 *         description: Sorting conditions for the users (e.g., by last name).
 *         required: false
 *         schema:
 *           type: object
 *       - name: select
 *         in: query
 *         description: Fields to be selected (e.g., 'firstName lastName').
 *         required: false
 *         schema:
 *           type: string
 *       - name: limit
 *         in: query
 *         description: Number of users to retrieve.
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: skip
 *         in: query
 *         description: Number of users to skip (pagination).
 *         required: false
 *         schema:
 *           type: integer
 *           default: 0
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
 *         description: Invalid query parameters
 *       404:
 *         description: No users found
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

router.put('/updateUser',auth(['user','admin']),userController.updateProfile)

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
router.delete('/delete',auth(['admin']),userController.deleteUsers)




module.exports=router;