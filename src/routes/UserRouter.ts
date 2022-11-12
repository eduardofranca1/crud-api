import { Router } from "express";
import UserController from "../controllers/UserController";
import { ensureUserAuthenticated, validateSchema } from "../middlewares";
import { userSchema, userSchemaQuery, loginSchema } from "../schemas";

const router = Router();

/**
 * @openapi
 * /login:
 *   post:
 *     tags:
 *       - User
 *     summary: User login
 *     requestBody:
 *      description: To user sign in the system
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/login'
 *     responses:
 *       200:
 *         description: Success. Return JWT
 *       401:
 *         description: Unauthorized. Email or password incorrect
 *       500:
 *         description: Internal Server Error
 */
router.post("/login", validateSchema(loginSchema), UserController.login);

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
 *            $ref: '#/components/schemas/user'
 *     responses:
 *       201:
 *         description: Created. Return user id
 *       400:
 *         description: Bad request. Email already exists in the system
 *       500:
 *         description: Internal Server Error
 */
router.post("/user", validateSchema(userSchema), UserController.create);

/**
 * @openapi
 * /user:
 *   get:
 *     tags:
 *       - User
 *     summary: Find all users
 *     description: Find all users  registered in the system
 *     responses:
 *       200:
 *         description: Ok
 *       500:
 *         description: Internal Server Error
 */
router.get("/user", ensureUserAuthenticated, UserController.listAll);

/**
 * @openapi
 * /user/findById:
 *   get:
 *     tags:
 *       - User
 *     summary: Find user by id
 *     description: Find user by id
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
 *         description: Success. Return an user object
 *       400:
 *         description: Bad request. User id is required
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/user/findById",
  ensureUserAuthenticated,
  validateSchema(userSchemaQuery),
  UserController.findById
);

/**
 * @openapi
 * /user:
 *   put:
 *     tags:
 *       - User
 *     summary: Update an user
 *     requestBody:
 *      description: To update an user
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/updateUser'
 *     responses:
 *       200:
 *         description: Success. User updated
 *       400:
 *         description: Bad request. Email already exists in the system
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.put(
  "/user",
  ensureUserAuthenticated,
  validateSchema(userSchema),
  UserController.updateUser
);

/**
 * @openapi
 * /user/softDelete:
 *   put:
 *     tags:
 *       - User
 *     summary: Disabled an user
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
 *         description: User was disabled
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.put(
  "/user/softDelete",
  ensureUserAuthenticated,
  UserController.softDelete
);

/**
 * @openapi
 * /user:
 *   delete:
 *     tags:
 *       - User
 *     summary: Delete an user
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
 *         description: User was deleted
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.delete(
  "/user",
  ensureUserAuthenticated,
  validateSchema(userSchemaQuery),
  UserController.deleteUser
);

export default router;
