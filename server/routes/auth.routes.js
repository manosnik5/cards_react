import { Router } from "express";
import { login, register} from "../controllers/auth.controller.js";
import { getUsers } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.get('/',verifyToken, getUsers)
authRouter.post('/login', login)
authRouter.post('/register', register)

export default authRouter;