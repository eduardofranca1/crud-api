import { Router } from "express";
import { authenticate, validateSchema } from "../middlewares";
import {
  createUserSchema,
  requestIdSchema,
  updatePasswordSchema,
  updateUserSchema,
} from "../schemas";
import { UserController } from "../controllers";

const router = Router();

/**
 * @openapi
 * /user:
 *   post:
 *     tags:
 *       - User
 *     summary: Create a new user
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
 *                 example: "dudu@email.com"
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
router.post(
  "/user",
  validateSchema(createUserSchema, "body"),
  UserController.create
);

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
 * /user/findById/:_id:
 *   get:
 *     tags:
 *       - User
 *     summary: Find user by id
 *     description: Find a user by id.
 *     parameters:
 *     - in: params
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
  "/user/findById/:_id",
  authenticate,
  validateSchema(requestIdSchema, "params"),
  UserController.findById
);

/**
 * @openapi
 * /user/disabled/:_id:
 *   get:
 *     tags:
 *       - User
 *     summary: Disabled a user
 *     parameters:
 *      - in: params
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
router.get(
  "/user/disabled/:_id",
  authenticate,
  validateSchema(requestIdSchema, "params"),
  UserController.disabled
);

/**
 * @openapi
 * /user/:_id:
 *   put:
 *     tags:
 *       - User
 *     summary: Update a user
 *     parameters:
 *      - in: params
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
 *                example: Update name
 *              email:
 *                 type: string
 *                 example: "update@email.com"
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
  "/user/:_id",
  authenticate,
  validateSchema(requestIdSchema, "params"),
  validateSchema(updateUserSchema, "body"),
  UserController.update
);

/**
 * @openapi
 * /user/updatePassword/:_id:
 *   put:
 *     tags:
 *       - User
 *     summary: Update user password
 *     parameters:
 *      - in: params
 *        name: _id
 *        description: User id
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *     requestBody:
 *      description: Update user password.
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              oldPassword:
 *                type: string
 *                example: "123456"
 *              newPassword:
 *                 type: string
 *                 example: "654321"
 *              confirmNewPassword:
 *                 type: string
 *                 example: "654321"
 *            required:
 *              - oldPassword
 *              - newPassword
 *              - confirmNewPassword
 *     responses:
 *       200:
 *         description: Success. Password updated.
 *       400:
 *         description: Bad request. Passwords don't match.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal Server Error.
 */
router.put(
  "/user/updatePassword/:_id",
  authenticate,
  validateSchema(requestIdSchema, "params"),
  validateSchema(updatePasswordSchema, "body"),
  UserController.updatePassword
);

/**
 * @openapi
 * /user/:_id:
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
  "/user/:_id",
  authenticate,
  validateSchema(requestIdSchema, "params"),
  UserController.delete
);

export default router;
