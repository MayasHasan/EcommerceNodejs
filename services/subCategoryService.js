const SubCategory = require("../models/subCategoryModel");

const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} = require("./handlersFactory");

exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObj = filterObject;
  next();
};

module.exports.getSubCategories = getAll(SubCategory);

module.exports.createSubCategory = createOne(SubCategory);

module.exports.getSubCategory = getOne(SubCategory);

module.exports.updateSubCategory = updateOne(SubCategory);

module.exports.deleteSubCategory = deleteOne(SubCategory);
