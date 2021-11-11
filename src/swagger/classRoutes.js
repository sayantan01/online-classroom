/**
 * @swagger
 * components:
 *   schemas:
 *     CreateClassroom_Input:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: abc
 
 *     CreateClassroom_Output:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           example: Successfully created classroom
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
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/CreateClassroom_Output'
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
