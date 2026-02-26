import { Router } from "express"
import {
    getAllcarts,
    addProductToCart,
    deleteProductFromcart,
    deleteAllProducts,
    updateProductQuantity,
    updateCartProducts
} from "../controllers/carts.controller.js"


const router = Router();

//Traer todos los carritos 
router.get("/", getAllcarts)

//Agregar un producto al carrito
router.post("/:cid/products/:pid", addProductToCart)

//Actualizar cantidad de quantify de un producto especifico de un carrito
router.put("/:cid/products/:pid", updateProductQuantity)

//Actualizar todos los productos de un carrito
router.put("/:cid", updateCartProducts)




//Borrar producto de carrito del usuario
router.delete("/:cid/products/:pid", deleteProductFromcart)

router.delete("/:cid", deleteAllProducts)

export default router 