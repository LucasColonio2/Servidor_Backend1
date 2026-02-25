import { Router} from "express";
import {getAllUsers, createUser} from "../controllers/users.controller.js"


const router = Router ()

//Traer todos los usuarios
router.get("/", getAllUsers);

//Crear un usurio
router.post("/", createUser)

export default router