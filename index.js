import express from "express";
import dotenv from "dotenv"

import accountRouter from "./router/account.js";
import authRouter from "./router/auth.js";
import authToken from "./router/auth_token.js";
import authSesion from "./router/auth_session.js";
import cookieParser from "cookie-parser";

dotenv.config()

const expressApp = express();

const PORT = process.env.PORT;

//MIDDLEWARE PARA ENVIAR VARIOS FORMATOS
expressApp.use(express.json())
expressApp.use(express.text())
expressApp.use(cookieParser())

//RUTAS
expressApp.use("/account", accountRouter)
expressApp.use("/auth", authRouter )
expressApp.use("/auth_token", authToken)
expressApp.use("/auth_session", authSesion)

//Ruta que no tiene middleware de account
expressApp.get("/raiz", (req, res)=>{
    res.send();
})




expressApp.listen(PORT, ()=> console.log(`Puerto levantado en el ${PORT}`))