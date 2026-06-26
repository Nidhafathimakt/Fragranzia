const Category = require("../models/category");

const getCategory= async (req,res) => {
    try{
        const categories = await Category.find();
      res.status(200).json({message: "Category fetched successfully",categories});
    }catch(error){
        res.status(500).json({message: error.message || "Internal server error"})
    }
}

const postCategory= async (req,res) => {
    try {
        // console.log("postProduct")
        const { name, parentCategory, description, status } = req.body;
        console.log(req.body,"===req")
        const categorySection = await Category.create({ name, parentCategory, description, status: status === "active",});
        res.status(201).json({
          message: "Category created successfully",
          data: categorySection,
        });
    
      } catch (error) {
        res.status(500).json({
          message: error.message || "Internal server error",
        });
      }

}
const putCategory= (req,res) => {

}
const deleteCategory = async (req,res) => {
   try{
    const category = await Category.findByIdAndDelete(req.params.id)
    res.json({ message: "Category deleted", category});
  }catch (error) {
    res.status(500).json({ message: error.message || "Internal server error"})
  }
}

module.exports = {getCategory, postCategory, putCategory, deleteCategory}

