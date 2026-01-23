import { Router } from "express";
import { getUsers, addUser, deleteUser, updateUserRole } from "../controllers/user.controller.js";
import { verifyToken, verifyAdmin } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get('/', verifyToken, verifyAdmin, getUsers);
userRouter.post('/', verifyToken, verifyAdmin, addUser);
userRouter.delete('/:userId', verifyToken, verifyAdmin, deleteUser);
userRouter.put('/:userId/role', verifyToken, verifyAdmin, updateUserRole);

export default userRouter;