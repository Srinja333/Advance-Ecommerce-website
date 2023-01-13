const express = require("express");

const router = express.Router(); //new router object

const {
  create,
  productById,
  read,
  remove,
  update,
  list,
  listRelated,
  listCategories,
  listBySearch,
  photo,
  listSearch
} = require("../controllers/product");

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

const { userById } = require("../controllers/user");

router.get("/product/:productId", read);

router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);

//console.log(create.data);

router.delete(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);

router.put(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  update
);

router.get("/products", list);

router.get("/products/search", listSearch);

router.get("/products/related/:productId", listRelated);

router.get("/products/categories", listCategories);

router.post("/products/by/search", listBySearch);
//console.log(photo);
router.get("/product/photo/:productId", photo); //photo used as a middleware

//console.log(photo.data);//particular product's all details/no data usetrp in mongo

router.param("userId", userById);
//console.log(photo.data);

//console.log(photo);
router.param("productId", productById);

module.exports = router;
