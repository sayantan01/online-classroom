/**
 * @swagger
 * components:
 *   schemas:
 *     NewUser_Input:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: abc
 *         email:
 *           type: string
 *           example: abc@gmail.com
 *         password:
 *            type: String
 *            example: abcpass
 *         usertype:
 *            type: String
 *            example: teacher
 
 *     NewUser_Output:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: abc
 *         email:
 *           type: string
 *           example: abc@gmail.com
 *         password:
 *            type: String
 *            example: abcpass
 *         isTeacher:
 *            type: Boolean
 *            example: true
 *         classrooms:
 *            type: array
 *            example: []
 
 *     NewUserLogin_Input:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: abc@gmail.com
 *         password:
 *            type: String
 *            example: abcpass
 
 *     NewUserLogin_Output:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           example: ""
 *         email:
 *           type: string
 *           example: abc@gmail.com
 *         isTeacher:
 *           type: bool
 *           example: true
 *         classrooms:
 *            type: array
 *            example: []
 */

/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: user signup.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUser_Input'
 *     responses:
 *       200:
 *         description: signup successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/NewUser_Output'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                  type: String
 *                  example: Email already exists
 *       500:
 *          description: Internal server error
 */

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: user login.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUserLogin_Input'
 *     responses:
 *       200:
 *         description: signup successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NewUserLogin_Output'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                  type: String
 *                  example: email is required
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                  type: String
 *                  example: Incorrect password
 *       500:
 *          description: Internal server error
 */
