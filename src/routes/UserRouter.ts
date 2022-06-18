import { Router } from "express";
import UserController from "../controllers/UserController";
import { ensureUserAuthenticated, validateSchema } from "../middlewares";
import { userSchema, userSchemaQuery, authSchema } from "../schemas";

const router = Router();

router.post("/login", validateSchema(authSchema), UserController.login);
router.post("/user", validateSchema(userSchema), UserController.create);

router.get("/user", ensureUserAuthenticated, UserController.listAll);
router.get(
  "/user/findById",
  ensureUserAuthenticated,
  validateSchema(userSchemaQuery),
  UserController.findById
);

router.put(
  "/user",
  ensureUserAuthenticated,
  validateSchema(userSchema),
  UserController.updateUser
);

router.delete(
  "/user",
  ensureUserAuthenticated,
  validateSchema(userSchemaQuery),
  UserController.deleteUser
);

export default router;
