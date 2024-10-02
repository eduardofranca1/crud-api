import { Router } from "express";
import { validateSchema } from "../middlewares";
import { authSchema } from "../schemas";
import { AuthController } from "../controllers";

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
 *            $ref: '#/components/schemas/auth/auth'
 *     responses:
 *       200:
 *         description: Success. Return JWT
 *       401:
 *         description: Unauthorized. Email or password incorrect
 *       500:
 *         description: Internal Server Error
 */
router.post("/login", validateSchema(authSchema), AuthController.login);

export default router;
