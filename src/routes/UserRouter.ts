import { Router } from "express";
import UserController from "../controllers/UserController";
import { validateSchema } from "../middleware/validateSchema";
import { userSchema, userSchemaQuery } from "../schemas/UserSchema";

const router = Router();

router.post("/user", validateSchema(userSchema), UserController.create);

router.get("/user", UserController.listAll);
router.get(
  "/user/findById",
  validateSchema(userSchemaQuery),
  UserController.findById
);

router.put("/user", validateSchema(userSchema), UserController.updateUser);

router.delete(
  "/user",
  validateSchema(userSchemaQuery),
  UserController.deleteUser
);

export default router;
