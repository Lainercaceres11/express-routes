import { Router } from "express";
import { USERS } from "../bd.js";
import authByEmailPwd from "../helpers/auth-by-email-pwd.js";

const authRouter = Router();

//Endpoint publico
authRouter.get("/publico", (req, res) => res.send("Endpoint publico"));

//Endpoint autenticado
authRouter.post("/autenticado", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.sendStatus(400);

  try {
    const user = authByEmailPwd(email, password);
    return res.send(`Usuario ${user.name} autenticado`);
  } catch (error) {
    return res.sendStatus(401);
  }
});

//Endpoint autorizado
authRouter.post("/autorizado", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.sendStatus(400);

  try {
    const user = authByEmailPwd(email, password);
    if (user.rol !== "admin") return res.sendStatus(403);
    return res.send(`Usuario administrador ${user.name}`);
  } catch (error) {
    return res.sendStatus(401);
  }
});

export default authRouter;
