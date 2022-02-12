import { Router } from "express";
import { UserController } from "../controllers";

const router = Router();

router.post("/user", UserController.create);

router.get("/user", UserController.listAll);
router.get("/user/findById", UserController.findById);

router.put("/user", UserController.updateUser);

router.delete("/user", UserController.deleteUser);

export default router;
