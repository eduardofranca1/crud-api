import { Router } from "express";
import { authenticate, validateSchema } from "../middlewares";
import {
  createUserSchema,
  disabledUserSchema,
  queryIdSchema,
  updateUserSchema,
} from "../schemas";
import { UserController } from "../controllers";

const router = Router();

// *            $ref: '#/components/schemas/user/createUser'
/**
 * @openapi
 * /user:
 *   post:
 *     tags:
 *       - User
 *     summary: Create new user
 *     requestBody:
 *      description: To register a new user
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Dudu
 *              email:
 *                 type: string
 *                 example: "dudu@example.com"
 *              password:
 *                 type: string
 *                 example: "123456"
 *              confirmPassword:
 *                 type: string
 *                 example: "123456"
 *            required:
 *              - name
 *              - email
 *              - password
 *              - confirmPassword
 *     responses:
 *       201:
 *         description: Created. Return _id, name and email.
 *       400:
 *         description: Bad request. Email already exists in the system.
 *       500:
 *         description: Internal Server Error.
 */
router.post("/user", validateSchema(createUserSchema), UserController.create);

/**
 * @openapi
 * /user:
 *   get:
 *     tags:
 *       - User
 *     summary: Find all users
 *     description: Find all users registered in the system.
 *     responses:
 *       200:
 *         description: Ok
 *       500:
 *         description: Internal Server Error
 */
router.get("/user", authenticate, UserController.findAll);

/**
 * @openapi
 * /user/findById:
 *   get:
 *     tags:
 *       - User
 *     summary: Find user by id
 *     description: Find a user by id.
 *     parameters:
 *     - in: query
 *       name: _id
 *       description: User id
 *       required: true
 *       schema:
 *        type: string
 *        format: uuid
 *     responses:
 *       200:
 *         description: Success. Return a user object.
 *       400:
 *         description: Bad request. User id is required.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal Server Error.
 */
router.get(
  "/user/findById",
  authenticate,
  validateSchema(queryIdSchema),
  UserController.findById
);

/**
 * @openapi
 * /user:
 *   put:
 *     tags:
 *       - User
 *     summary: Update a user
 *     parameters:
 *      - in: query
 *        name: _id
 *        description: User id
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *     requestBody:
 *      description: To update a user.
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Dudu Updated
 *              email:
 *                 type: string
 *                 example: "duduupdated@example.com"
 *            required:
 *              - name
 *              - email
 *     responses:
 *       200:
 *         description: Success. User updated.
 *       400:
 *         description: Bad request. Email already exists in the system.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal Server Error.
 */
router.put(
  "/user",
  authenticate,
  validateSchema(updateUserSchema),
  UserController.update
);

/**
 * @openapi
 * /user/disabled:
 *   put:
 *     tags:
 *       - User
 *     summary: Disabled a user
 *     parameters:
 *      - in: query
 *        name: _id
 *        description: User id
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *     requestBody:
 *      description: To disabled a user.
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              disabled:
 *                type: boolean
 *                example: true
 *            required:
 *              - disabled
 *     responses:
 *       200:
 *         description: User updated.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal Server Error.
 */
router.put(
  "/user/disabled",
  authenticate,
  validateSchema(disabledUserSchema),
  UserController.disabled
);

/**
 * @openapi
 * /user:
 *   delete:
 *     tags:
 *       - User
 *     summary: Delete a user
 *     parameters:
 *      - in: query
 *        name: _id
 *        description: User id
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *     responses:
 *       204:
 *         description: User was deleted.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal Server Error.
 */
router.delete(
  "/user",
  authenticate,
  validateSchema(queryIdSchema),
  UserController.delete
);

export default router;
