import {Router} from "express"
import {getAllcarts, 
    AddtoCart,
    deleteProductFromcart,
deletecart} from "../controllers/carts.controller.js"


const router = Router();

router.get ("/", getAllcarts)

//Agregar un producto al carrito
router.post ("/:uid/:pid/:quantify",AddtoCart)

//Borrar producto de carrito del usuario
router.delete("/:cid/products/:pid", deleteProductFromcart)

router.delete ("/:uid", deletecart)

export default router 