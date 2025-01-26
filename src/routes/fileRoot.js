const express = require('express')
const router = express.Router()
const imageUpload=require('../middleware/uploadImages')
const modelUpload=require('../middleware/uploadModel')
const {uploadModel,uploadImages,getFileById} = require('../controllers/fileController')
const { auth } = require('../middleware/auth')

router.post('/uploadModelToCar/:id',auth(['admin']),modelUpload,uploadModel)
router.get('/getById/:id',getFileById)
router.post('/uploadImagesToCar/:id',auth(['admin']),imageUpload,uploadImages)

module.exports=router 
/**
 * @swagger
 * tags:
 *   name: File
 *   description: File upload, retrieval, and deletion for cars (images, 3D models, etc.)
 */

/**
 * @swagger
 * /api/file/uploadModelToCar/{id}:
 *   post:
 *     summary: Upload a 3D model to a car
 *     description: Upload a 3D model file to a car by car ID. The file will be saved and associated with the car's `model3D` field.
 *     tags:
 *       - File
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the car to associate the model with
 *         schema:
 *           type: string
 *           example: '60f2c7af45b6a4221c8f2359'
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The 3D model file to upload (e.g., .glb, .obj, etc.)
 *                 example: 'model_3d.glb'
 *     responses:
 *       200:
 *         description: File uploaded successfully and associated with the car
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'File uploaded successfully'
 *                 fileId:
 *                   type: string
 *                   description: The ID of the uploaded 3D model file
 *                   example: '60f2c7af45b6a4221c8f2359'
 *       400:
 *         description: No file provided for upload or invalid car ID
 *       404:
 *         description: Car not found
 *       500:
 *         description: Internal server error
 *     security:
 *       - BearerAuth: []
 *     x-roles: ['admin']  # Only admins can upload 3D models to a car
 */

/**
 * @swagger
 * /api/file/uploadImagesToCar/{id}:
 *   post:
 *     summary: Upload images to a car
 *     description: Upload image files and associate them with the car's `images` field. Multiple images can be uploaded at once.
 *     tags:
 *       - File
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the car to associate the images with
 *         schema:
 *           type: string
 *           example: '60f2c7af45b6a4221c8f2359'
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                   description: Image files to upload
 *                 description: The image files for the car (e.g., .jpg, .png)
 *                 example: 
 *                   - 'car_front.jpg'
 *                   - 'car_back.jpg'
 *     responses:
 *       200:
 *         description: Files uploaded successfully and associated with the car
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Files uploaded successfully'
 *                 fileIds:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: List of file IDs associated with the uploaded images
 *                     example: ['60f2c7af45b6a4221c8f2360', '60f2c7af45b6a4221c8f2361']
 *       400:
 *         description: No files provided for upload or invalid car ID
 *       404:
 *         description: Car not found
 *       500:
 *         description: Internal server error
 *     security:
 *       - BearerAuth: []
 *     x-roles: ['admin']  # Only admins can upload images to a car
 */

/**
 * @swagger
 * /api/file/getById/{id}:
 *   get:
 *     summary: Get file by ID
 *     description: Retrieve a file by its ID from the GridFS storage. The file could be an image or a 3D model.
 *     tags:
 *       - File
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the file to retrieve
 *         schema:
 *           type: string
 *           example: '60f2c7af45b6a4221c8f2359'
 *     responses:
 *       200:
 *         description: File retrieved successfully
 *         content:
 *           application/octet-stream: {}
 *       404:
 *         description: File not found
 *       500:
 *         description: Internal server error
 */
