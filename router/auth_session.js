import { Router } from "express";
import authByEmailPwd from "../helpers/auth-by-email-pwd.js";
import { nanoid } from "nanoid";
import { USERS } from "../bd.js";

const sessions = []
const authSesion = Router();

//Endpoint de autenticacion por cookie 
authSesion.post("/login", (req, res)=>{
    const { email, password } = req.body;

    if (!email || !password) return res.sendStatus(400);
  
    try {
      const {guid} = authByEmailPwd(email, password);

      const sessionId = nanoid();
      sessions.push({sessionId, guid})

      /**@param nombre de la sesion, valor de la cookie, objeto de opciones */
      res.cookie("sessionId", sessionId, {
         httpOnly: true
      })

      return res.send();
    } catch (error) {
      return res.sendStatus(401);
    }
})


//Endpoint para obtener datos de cookies
authSesion.get("/profile", (req, res)=>{
    const {cookies} = req;

    if(!cookies) return res.sendStatus(401)

    const userSession = sessions.find((sesion)=> sesion.sessionId === cookies.sessionId)

     if(!userSession) return res.sendStatus(401)

     const user = USERS.find((user)=> user.guid === userSession.guid)

     if(!user) return res.sendStatus(401)

     delete user.password;

    return res.send(user)
})
export default authSesion;