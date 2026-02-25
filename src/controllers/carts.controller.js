import Cart from "../models/cart.model.js"
import User from "../models/user.model.js"
import Product from "../models/product.model.js"
import mongoose from "mongoose"

//Añadir producto a carrito
export const addProductToCart = async (req, res) => {
    const { cid, pid } = req.params
    const { quantify } = req.body

    //Validacion de si existe usuario, si hay stock del producto y si hay cantidad del producto que quiere el usuario
    if (!cid || !pid || quantify === undefined) {
        return res.status(400).json({ message: "Todos los campos son requeridos" })
    }
    //-----------------------------------------


    //Si existe  producto en carrito le agrega 1
    const updated = await Cart.updateOne(
        {
            _id: new mongoose.Types.ObjectId(cid),
            "products.product": pid
        },
        { $inc: {"products.$.quantify": quantify } }
    );

    // Si no existe el producto lo agregamos
    if (updated.modifiedCount === 0) {
        await Cart.updateOne(
            { _id: new mongoose.Types.ObjectId(cid) },
            {
                $push: {
                    products: {
                        product: pid,
                        quantity: quantify
                    }
                }
            }
        )
    }

    const cart = await Cart.findById(cid).populate("products.product");
    res.status(200).json({
        message: "Producto agregado correctamente",
        cart
    })
};



//Elimiar carrito completo
export const deletecart = async (req, res) => {
    const { uid } = req.params

    //Validacion para ver si se esta mandando por endpoiun el ID del user
    if (!uid) {
        return res.status(400).json({ message: "User ID is required" })
    }
    //-----------------------------------------------------------------

    //Validacion para ver si el user existe
    const userExists = await User.findById(uid)
    if (!userExists) {
        return res.status(400).json({ message: "User does no exist" })
    }
    //---------------------------------------

    const result = await Cart.deleteone({ user: uid })
    res.json(result)
}

//Controlador para eliminar producto del carrito del usuario
export const deleteProductFromcart = async (req, res) => {
    const { cid, pid } = req.params
console.log(cid)
console.log(pid)
    //Validacion para ver si se mandan el id del carrito y del producto 
    if (!cid || !pid) {
        return res.status(400).json({ message: "All fields are required" })
    }
    //---------------------------------------------


    //Verifica si existe el carrito del ID que se paso por parametro
    const cart = await Cart.findById(cid)
    if (!cart) {
        return res.status(404).json({ message: "Carrito no encontrado" })
    }
    //------------------------------------------


    //Validacion para saber si existen un producto en el carrito o devuelve error
    const productExist = cart.products.some(p => p.product.toString() === pid)

    //Validacion para verificar si el producto se encuentra en el carrito
    if (!productExist) {
        return res.status(404).json({ message: "Producto no encontrado en el carrito" })
    }
    //----------------------------------------


    const result = await Cart.updateOne(
        { user: cid },
        { $pull: { product: { product: pid } } }
    )
    res.json(result, { messege: "Producto eliminado del carrito" })
}


export const getAllcarts = async (req, res) => {
    const carts = await Cart.find().populate("user", "firstName lastName");
    res.json(carts)
}

