import Category from "../models/category.model.js";


export const createCategory = async (req,res) =>{
    const {name, descrition} = req.body
    
    const newCategory = await Category.create()
    res.json (newCategory)
}


export const getAllCategories = async (req,res)=>{
    const categories = await Category.find();
    res.json (categories)}