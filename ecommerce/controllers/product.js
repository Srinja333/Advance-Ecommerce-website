const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.productById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          error: "Product not found",
        });
      }
      req.product = product;
      next();
    });
};

exports.read = (req, res) => {
  //console.log(req.product);
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.create = (req, res) => {
  let form = new formidable.IncomingForm(); //IncomingForm is a method of Formidable package and form data sent from react/postman
  form.keepExtensions = true; //whatever image type we getting extenion will be there
  form.parse(req, (err, fields, files) => {
    if (err) {
      //console.log(err);
      return res.status(400).json({
        error: "image could not be uploaded",
      });
    }
    //check for all fields

    const { name, description, price, category, quantity, shipping } = fields;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }
    let product = new Product(fields); //fields-->like name,description etc
    if (files.photo) {
      //for photo & files.photo means user sent photo
      //console.log("FILES PHOTO: ",files.photo);
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.filepath);
      product.photo.contentType = files.photo.mimetype;
      //console.log(product.photo.contentType);//gives only contentType
      //console.log(product.photo.data);//all details related product
    }
    console.log(product.photo.data);
    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

exports.remove = (req, res) => {
  let product = req.product;
  //console.log(req.product);
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      //deletedProduct,
      message: "product deleted successfully",
    });
  });
};

exports.update = (req, res) => {
  const form = new formidable.IncomingForm(); //IncomingForm is a method of Formidable package and form data sent from react/postman
  form.keepExtensions = true; //whatever image type we getting extenion will be there
  form.parse(req, (err, fields, files) => {
    if (err) {
      //console.log(err);
      return res.status(400).json({
        error: "image could not be uploaded",
      });
    }
    //check for all fields

    // const { name, description, price, category, quantity, shipping } = fields;
    // if (
    //   !name ||
    //   !description ||
    //   !price ||
    //   !category ||
    //   !quantity ||
    //   !shipping
    // ) {
    //   return res.status(400).json({
    //     error: "All fields are required",
    //   });
    // }

    //console.log(req.product);
    let product = req.product; //fields-->like name,description etc
    //console.log(product);
    //console.log(req.product);
    product = _.extend(product, fields); //here fields is existed fields
    console.log(product);

    if (files.photo) {
      //for photo & files.photo means user sent photo
      //console.log("FILES PHOTO: ",files.photo);
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.filepath);
      product.photo.contentType = files.photo.mimetype;
    }
    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

/**
 * sell / arrival
 * by sell = /products?sortBy=sold&order=desc&limit=4
 * by arrival = /products?sortBy=createdAt&order=desc&limit=4
 * if no params are sent, then all products are returned
 */

exports.list = (req, res) => {
  console.log("enter");
  let order = req.query.order ? req.query.order : "desc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  Product.find()
    .select("-photo") //deselect photo due to huge size
    .populate("category")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json(products);
    });
};

/**
 * it will find the products based on the req product category
 * other products that has the same category, will be returned
 */
exports.listRelated = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  console.log("category", req.product.category);
  Product.find({ _id: { $ne: req.product }, category: req.product.category }) //$ne is not  equals operator
    .limit(limit)
    .populate("category", "_id name")
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json(products);
    });
};

exports.listCategories = (req, res) => {
  Product.distinct("category", {}, (err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "Categories not found",
      });
    }
    var r = res.json(categories);
    return r;
  });
};

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */

// route - make sure its post
//router.post("/products/by/search", listBySearch);

exports.listBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip) || 0;
  let findArgs = {};

  console.log(sortBy);
  console.log(order);
  console.log(req.body.filters);
  // console.log("findArgs", findArgs);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(findArgs)
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json({ size: data.length, data });
    });
};

exports.photo = (req, res, next) => {
  //console.log(req.product.photo.data);//particular product's all details

  if (req.product.photo.data) {
    //console.log(req.product.photo.data);
    res.set("Content-Type", req.product.photo.contentType);
    //console.log(req.product.photo.contentType);//give image/jpeg
    //console.log(req.product.photo.data);//particular product's all details
    var r = res.send(req.product.photo.data);
    //console.log(req.product.photo.data);
    return r;
    //console.log(req.product.photo.contentType);//only for test nothing initial
    //console.log(req.product.photo.data);//particular product's all details in case of "r"
  }

  //console.log(req.product.photo.data);//nothing

  next();
};

exports.listSearch = (req, res) => {
  //create query object to hold search value and category value
  const query = {};
  //console.log(query);
  //assign search value to query.name

  if (req.query.search) {
    //observation: if i give query.description below i can access products by description property
    query.name = { $regex: req.query.search, $options: "i" };
    //console.log(query.name);
    //assign category value to query.category
    if (req.query.category && req.query.category != "All") {
      query.category = req.query.category;
    }
    //find the product based on query object with 2 properties
    //search and category
    Product.find(query, (err, products) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(products);
    }).select("-photo");
  }
};

exports.decreaseQantity = (req, res, next) => {
  let bulkOps = req.body.order.products.map((item) => {
    //console.log(item);
    return {
      updateOne: {
        filter: { _id: item._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  //update Product
  Product.bulkWrite(bulkOps, {}, (error, products) => {
    if (error) {
      return res.status(400).json({
        error: "could not update product",
      });
    }
    next();
  });
};
