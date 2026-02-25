import User from "../models/user.model.js"


//Traer todos los usuarios
export const getAllUsers = async (req,res)=> {
    const users = await User.find ();
    res.json(users)
}

//Crear un usuario
export const createUser = async (req,res)=> {
    const {firstName, lastName, email} = req.body;
//Validacion que llego bien la informacion por body
    if (!firstName || !lastName || !email){
        return res.status(400).json ({message: "Todos los campos son requeridos"})
    }
//-----------------------------------------
    const user = await User.create(req.body);
    res.json (user)
}