import Cart from "../models/cart.model.js"
import User from "../models/user.model.js"
import Product from "../models/product.model.js"
import mongoose from "mongoose"


//Actualizar TODOS los productos de un carrito
export const updateCartProducts = async (req, res) => {
    const { cid } = req.params
    const { products } = req.body

if (!cid || !products) {
        return res.status(400).json({ message: "Todos los campos son requeridos" })
    }


    const result = await Cart.updateOne(
        { _id: cid },
        { $set: { products: products } }
    )

    const cart = await Cart.findById(cid)
    res.status(200).json({
        message: "Carrito actualizado",
        cart
    })
}



//Actualizar cantidad de un producto de un carrito
export const updateProductQuantity = async (req, res) => {
    const { cid, pid } = req.params
    const { quantify } = req.body

    //Validacion de si existe usuario, si hay stock del producto y si hay cantidad del producto que quiere el usuario
    if (!cid || !pid || quantify === undefined) {
        return res.status(400).json({ message: "Todos los campos son requeridos" })
    }

    const newQuantify = quantify

    const result = await Cart.updateOne(
        { _id: cid, "products.product": pid },
        {
            $set:
            {
                "products.$.quantify": newQuantify
            }
        }

    )
    const cart = await Cart.findById(cid)
    res.status(200).json({
        message: "Cantidad de producto actualizado",
        cart
    })

}


//Añadir producto a carrito
export const addProductToCart = async (req, res) => {
    const { cid, pid } = req.params
    const { quantify } = req.body

    //Validacion de si existe usuario, si hay stock del producto y si hay cantidad del producto que quiere el usuario
    if (!cid || !pid || quantify === undefined) {
        return res.status(400).json({ message: "Todos los campos son requeridos" })
    }
    //-----------------------------------------


    //Si existe  producto en carrito se le agrega por lo que se pasa en params
    const updated = await Cart.updateOne(
        {
            _id: new mongoose.Types.ObjectId(cid),
            "products.product": pid
        },
        { $inc: { "products.$.quantify": quantify } }
    );

    // Si no existe el producto lo agregamos
    if (updated.modifiedCount === 0) {
        await Cart.updateOne(
            { _id: new mongoose.Types.ObjectId(cid) },
            {
                $push: {
                    products: {
                        product: pid,
                        quantify: quantify
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



//Elimiar productos del carrito
export const deleteAllProducts = async (req, res) => {
    const { cid } = req.params

    //Validacion para ver si se esta mandando por endpoiun el ID del carrito
    if (!cid) {
        return res.status(400).json({ message: "User ID is required" })
    }
    //-----------------------------------------------------------------


    const result = await Cart.updateOne(
        { _id: cid },
        { $set: { products: [] } }

    )
    res.status(200).json({
        message: "Productos eliminados del carrito",
        result
    })
}




//Controlador para eliminar producto del carrito del usuario
export const deleteProductFromcart = async (req, res) => {
    const { cid, pid } = req.params


    //Verifica si existe el carrito del ID que se paso por parametro
    const cart = await Cart.findById(cid)
    if (!cart) {
        return res.status(404).json({ message: "Carrito no encontrado" })
    }
    //------------------------------------------

    //Validacion para saber si existen un producto en el carrito o devuelve error
    const productExist = cart.products.some(p => p.product.toString() === pid)
    if (!productExist) {
        return res.status(404).json({ message: "Producto no encontrado en el carrito" })
    }
    //----------------------------------------


    const result = await Cart.updateOne(
        { _id: cid },
        { $pull: { products: { product: pid } } }
    )
    res.json({ messege: "Producto eliminado del carrito", cart })
}


export const getAllcarts = async (req, res) => {
    const carts = await Cart.find().populate("user", "firstName lastName");
    res.json(carts)
}

