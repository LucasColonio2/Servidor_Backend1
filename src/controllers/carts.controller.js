import Cart from "../models/cart.model.js"
import User from "../models/user.model.js"



//Elimiar carrito completo
export const deletecart = async (req,res) =>{
    const {uid} = req.params

    //Validacion para ver si se esta mandando por endpoiun el ID del user
    if(!uid){
        return res.status(400).json ({message: "User ID is required"})
    }
    //-----------------------------------------------------------------

    //Validacion para ver si el user existe
    const userExists= await User.findById(uid)
    if(!userExists){
        return res.status (400).json ({message: "User does no exist"})
    }
    //---------------------------------------
    
    const result = await Cart.deleteone ({user:uid})
    res.json(result)
}


export const deleteProductFromcart = async (req,res)=> {
    const {uid,pid} = req.params
    if(!iud ||!pid){
        return res.status (400).json({message:"All fields are required"})
    }
    const result = await Cart.updateOne (
        {user:uid}, {$pull: {product:{product:pid}}}

    )
    res.json(result, {messege:"Producto eliminado del carrito"})
}


export const getAllcarts = async (req, res)=>{
const carts = await Cart.find();
res.json(carts)
}

export const createCart = async (req, res) => {
    const {uid, pid, quantify} = req.params;

    //Validacion--------
    if(!uid || !pid || !quantify){
        return res.status(400).json({message: "Todos los campos son requeridos"})
    }
    //------------------------

    const newCart = await Cart.create({
        user:uid,
        products:[{
            product:pid,
            quantify: quantify
        }]
    });
    res.json(newCart)
}