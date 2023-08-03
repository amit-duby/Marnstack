import productModel from "./../models/ProductModel.js";
import fs from "fs";
import slugify from "slugify";

export const CreateProduct = async (req, res) => {
  try {
    const { name, slug, category, price, description, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name:
        res.status(500).send({ error: "name is required" });
      case !category:
        res.status(500).send({ error: "category is required" });
      case !price:
        res.status(500).send({ error: "price is required" });
      case !description:
        res.status(500).send({ error: "description is required" });
      case !quantity:
        res.status(500).send({ error: "quantity is required" });
      case photo && photo.size > 1000000:
        res.status(400).send({ error: "photo is required " });
    }
    const product = new productModel({
      ...req.fields,
      slug: slugify(name),
    });
    if (product) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    console.log(photo);
    res.status(200).send({
      success: true,
      message: "create successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in crearing product",
      error,
    });
  }
};
// get all product
export const GetallProduct = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-password")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(202).send({
      success: true,
      counTotal: products.length,
      message: "product is found",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};
// update products

// get one product
export const Getoneproduct = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      //   counTotal: data.length,
      message: "find one product",
      product,
    });
    // console.log(product);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error: error.message,
    });
  }
};
// find photo
export const findphoto = async (req, res) => {
  try {
    const products = await productModel
      .findById(req.params.pid)
      .select("photo");
    if (products.photo.data) {
      res.set("Content-type", products.photo.contentType);
      return res.status(200).send(products.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};
// delete products
export const deleteproduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};
// update product
export const UpdateProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};
export const filterproduct = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "filter error message", error });
  }
};
// total product
export const ProductCount = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      message: "product is counted",
      total,
    });
    // console.log(total);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error will show in productCount page",
      error,
    });
  }
};
// filter product page bys
export const ProductPage = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(203).send({
      success: true,
      products,
    });
    // console.log(products);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};
// search product
export const Searchproductcollection = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(resutls);
    console.log(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

// product details
export const productDetailsCollection = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        // _id: req.params.pid,
        // _id: req.params.cid,
        _id: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
    console.log(products);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};
