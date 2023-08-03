// import CotegaryModel from "../models/CotegaryModel.js";
import categoryModel from "../models/CotegaryModel.js";
// import ErrorHanler from "./../utills/Errorhandler";

import slugify from "slugify";
// import catchAsync from "./../middleware/catchError";

export const CreateCotegary = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category Already Exisits",
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "new category created",
      category,
    });
    console.log(category);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Errro in Category",
    });
  }
};
// update product
export const UpadateCategary = async (req, res) => {
  try {
    const { name } = req.body;

    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
};

// find category
export const GetallCategary = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(202).send({
      success: true,
      message: "find category",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
      message: "Error while getting all categories",
      success: false,
    });
  }
};

// find one product
export const GetoneCategary = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(203).send({
      success: true,
      message: "find category",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
      message: "Error while getting all categories",
      success: false,
    });
  }
};
// delete product
export const DeleteCategary = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndDelete(id);
    res.status(204).send({
      success: true,
      message: "delet success",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
      message: "Error while getting all categories",
      success: false,
    });
  }
};
