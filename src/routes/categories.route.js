import { Router } from "express";
import {getAllCategories, createCategory} from "../controllers/categories.controller.js" 
const router = Router ();

router.get ("/", getAllCategories)

router.post ("/", createCategory)

export default router