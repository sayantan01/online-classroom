/**
 * @swagger
 * components:
 *   schemas:
 *     CreateAssignment_Input:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: Mutex
 *         statement:
 *           type: string
 *           example: create a shared linked list
 *         deadline:
 *           type: string
 *           example: 16/11/21
 *         classroom_id:
 *           type: string
 *           example: 619a019971635b0f38d4ca67
 *                      
 
 *     CreateAssignment_Output:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           example: Successfully created assignment
 *         classrooms:
 *            type: array
 *            example: []
 * 
 *     SubmitAssignment_Input:
 *       type: object
 *       properties:
 *         answer:
 *           type: string
 *           example: sample answer
 *         email:
 *           type: string
 *           example: student@mail
 *         assignment_id:
 *           type: string      
 *           example: 619a331735396668dfcb5646       
 
 *     SubmitAssignment_Output:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           example: Successfully submitted assignment
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
 * /api/assignment/create:
 *   post:
 *     summary: create an assignment.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAssignment_Input'
 *     responses:
 *       200:
 *         description: Assignment creation successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateAssignment_Output'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                  type: String
 *                  example: Invalid classroom id
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
 *                  example: Only classroom owner can create assignments
 *       500:
 *          description: Internal server error
 */

/**
 * @swagger
 * /api/assignment/submit:
 *   post:
 *     summary: submit an assignment.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubmitAssignment_Input'
 *     responses:
 *       200:
 *         description: Assignment submission successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubmitAssignment_Output'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                  type: String
 *                  example: Invalid assignment id
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
 *                  example: You are not enrolled into this classroom
 *       500:
 *          description: Internal server error
 */
