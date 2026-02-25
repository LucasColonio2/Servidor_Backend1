import {Router} from "express"
import {getAllcarts, 
    createCart,
    deleteProductFromcart
deletecart} from "../controllers/carts.controller.js"


const router = Router();

router.get ("/", getAllcarts)

router.post ("/:uid/:pid/:quantify", createCart)

router.delete("/:uid/:pid", deleteProductFromcart)

router.delete ("/:uid", deletecart)

export default router 