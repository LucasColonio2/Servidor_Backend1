import mongoose, { Types } from "mongoose"

const categorySchema  = new mongoose.Schema({
    name: {
        type: String,
        index:true,
    },
    description: String,

})

const Category = mongoose.model("Category", categorySchema)
export default Category;
