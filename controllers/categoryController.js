const slugify = require("slugify");
const Category = require("../models/categoryModel");

const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    //validation
    if (!name) {
      return res.status(401).send({
        messege: "Name is required",
      });
    }
    //checkexisting
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category Alreagy Exists",
      });
    }
    //if not then save it
    const category = await new Category({ name, slug: slugify(name) }).save();
    res.status(200).send({
      success: true,
      message: "New Category Created",
      category,
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        error,
        messege: "Error in Cagtegory",
      });
  }
};

const updateCategoryContoller = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        error,
        messege: "Error in update",
      });
  }
};

const categoryController = async (req, res) => {
  try {
    const category = await Category.find({});
    res.status(200).send({
      success: true,
      messege: "All Category List",
      category,
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        error,
        messege: "Error while getting all carts",
      });
  }
};

const singleCategoryController = async (req, res) => {
  const slug = req.params.slug;
  try {
    const category = await Category.findOne({ slug });
    console.log("Found category:", category);
    res.status(200).send({
      success: true,
      message: "Get Single Category successfully",
      category,
    });
  } catch (error) {
    console.log(error).res({
      success: false,
      error,
      messege: "Error while single Category",
    });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category Deleted success ",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      messege: "error while deleting Category",
    });
  }
};

module.exports = {
  createCategoryController,
  updateCategoryContoller,
  categoryController,
  singleCategoryController,
  deleteCategoryController,
};
