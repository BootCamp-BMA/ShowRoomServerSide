const express =require('express')
const router= express.Router()
const authController=require('../controllers/authController.js')


/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User registration and login operations
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user by providing user details such as first name, last name, phone number, email, and password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: First name of the user
 *                 example: John
 *               lastName:
 *                 type: string
 *                 description: Last name of the user
 *                 example: Doe
 *               phoneNum:
 *                 type: string
 *                 description: Primary phone number of the user
 *                 example: "1234567890"
 *               email:
 *                 type: string
 *                 description: Email address of the user
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: Password for the user account
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for the registered user
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Email already exists
 *       500:
 *         description: Internal Server Error
 */



router.post('/register',authController.register);


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     description: Authenticate a user by providing their email and password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for the authenticated user
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Internal Server Error
 */


router.post('/login',authController.login)

router.get('/signup',(req,res,next)=>{
    res.render('signup')
})
router.get('/login', (req, res, next) => {
    res.render('login');
});


module.exports=router;