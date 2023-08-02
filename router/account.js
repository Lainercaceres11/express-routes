import express from "express"
import { USERS } from "../bd.js"

const accountRouter = express.Router()

//Creamos middleware en router

accountRouter.use((req, res, next) => {
    console.log(req.ip)
    next()
});

//Obtener usuario por guid
accountRouter.get("/:guid", (req, res)=>{
    const user = USERS.find((user)=> user.guid === req.params.guid)
    if(!user) return res.status(404).send()
    return res.send(user)
})

//Crea usuario por guid y nombre
accountRouter.post("/", (req, res)=>{

    const {guid, name} = req.body

    if(!guid || !name) return res.state(400).send()

    const user = USERS.find((user)=> user.guid === req.params.guid)

    if(user) return res.status(409).send()

    USERS.push({
        guid, name
    })

    return res.send()
})

//Actualizar usuario por nombre
accountRouter.patch("/:guid", (req, res)=>{

    const {name} = req.body

    if(!name) return res.state(400).send()

    const user = USERS.find((user)=> user.guid === req.params.guid)

    if(!user) return res.status(400).send()

    user.name = name

    return res.send(user)
})

//Eliminar usuario
accountRouter.delete("/:guid", (req, res)=>{
    const userIndex = USERS.findIndex((user)=> user.guid === req.params.guid)
    if(userIndex === -1) return res.status(404).send()

    USERS.splice(userIndex, 1)
    return res.send()
})


export default accountRouter;