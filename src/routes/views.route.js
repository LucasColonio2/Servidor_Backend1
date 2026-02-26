import { Router } from "express"
import {viewProducts,getProductDetail,viewCart

} from "../controllers/views.controller.js"


const router = Router()

router.get("/products", viewProducts)
router.get("/products/:pid", getProductDetail)

router.get("/carts/:cid", viewCart);


export default router