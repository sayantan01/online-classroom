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
 *         attachment:
 *           format: formData
 *           type: file
 *            
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
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/CreateAssignment_Input'
 *     responses:
 *       200:
 *         description: Assignment creation successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/CreateAssignment_Output'
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
