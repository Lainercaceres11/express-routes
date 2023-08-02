import express from "express";
import dotenv from "dotenv"
import accountRouter from "./router/account.js";

dotenv.config()

const expressApp = express();

const PORT = process.env.PORT;

//MIDDLEWARE PARA ENVIAR VARIOS FORMATOS
expressApp.use(express.json())
expressApp.use(express.text())
expressApp.use("/account", accountRouter)

//Ruta que no tiene middleware de account
expressApp.get("/raiz", (req, res)=>{
    res.send();
})




expressApp.listen(PORT, ()=> console.log(`Puerto levantado en el ${PORT}`))