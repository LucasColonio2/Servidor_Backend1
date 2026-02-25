import { Router} from "express";
import {getAllUsers, createUser} from "../controllers/users.controller.js"


const router = Router ()

//Traer todos los usuarios
router.get("/", getAllusers);

//Crear un usurio
router.post("/", createUser)

export default router