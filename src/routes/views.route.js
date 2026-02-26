import { Router } from "express"
import {viewProducts,getProductDetail

} from "../controllers/views.controller.js"


const router = Router()

router.get("/products", viewProducts)
router.get("/products/:pid", getProductDetail)




export default router