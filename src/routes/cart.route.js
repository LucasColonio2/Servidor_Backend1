import {Router} from "express"
import {getAllcarts, 
    addProductToCart,
    deleteProductFromcart,
deletecart} from "../controllers/carts.controller.js"


const router = Router();

router.get ("/", getAllcarts)

//Agregar un producto al carrito
router.post ("/:cid/products/:pid",addProductToCart)

//Borrar producto de carrito del usuario
router.delete("/:cid/products/:pid", deleteProductFromcart)

router.delete ("/:uid", deletecart)

export default router 