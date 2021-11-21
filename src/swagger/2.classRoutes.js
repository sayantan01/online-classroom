/**
 * @swagger
 * components:
 *   schemas:
 *     CreateClassroom_Input:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: sample_classroom
 
 *     CreateClassroom_Output:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           example: Successfully created classroom
 *         classrooms:
 *            type: array
 *            example: []
 
 *     JoinClassroom_Input:
 *       type: object
 *       properties:
 *         passcode:
 *           type: string
 *           example: sample_passcode
 
 *     JoinClassroom_Output:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           example: Successfully joined classroom
 *         classrooms:
 *            type: array
 *            example: []
 
*     FetchClassroom_Output:
 *       type: object
 *       properties:
 *         classrooms:
 *            type: array
 *            example: []
 
 *   securitySchemes:
 *       bearerAuth:            
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT  
 */

/**
 * @swagger
 * /api/classroom/create:
 *   post:
 *     summary: create a classroom.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateClassroom_Input'
 *     responses:
 *       200:
 *         description: Classroom creation successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateClassroom_Output'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                  type: String
 *                  example: Another classroom with same name already exists
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                  type: String
 *                  example: User unauthorized
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                  type: String
 *                  example: Only teachers can create classrooms
 *       500:
 *          description: Internal server error
 */

/**
 * @swagger
 * /api/classroom/join:
 *   post:
 *     summary: join a classroom.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JoinClassroom_Input'
 *     responses:
 *       200:
 *         description: Classroom joining successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JoinClassroom_Output'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                  type: String
 *                  example: Classroom already joined
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                  type: String
 *                  example: User unauthorized
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                  type: String
 *                  example: Only students can join classrooms
 *       500:
 *          description: Internal server error
 */

/**
 * @swagger
 * /api/classroom/fetch:
 *   get:
 *     summary: Fetch the classrooms for a user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched classrooms
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 classrooms:
 *                  type: array
 *                  example: []
 *       500:
 *          description: Internal server error
 */
