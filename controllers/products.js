const Product = require('../models/product');

const indexRoute = (req, res, next) => {
  Product
    .find()
    .then(products => {
      res.json(products.sort((a, b) => {
        return b.averageRating - a.averageRating;
      }));
    })
    .catch(next);
};

const showRoute = (req, res, next) => {
  Product
    .findById(req.params.productId)
    .then(product => res.json(product))
    .catch(next);
};

const createRoute = (req, res, next) => {
  Product
    .create(req.body)
    .then(product => res.json(product))
    .catch(next);
};

const updateRoute = (req, res, next) => {
  Product
    .findById(req.params.productId)
    .then(product => product.set(req.body))
    .then(product => product.save())
    .then(product => res.json(product))
    .catch(next);
};

const deleteRoute = (req, res, next) => {
  Product
    .findByIdAndDelete(req.params.productId)
    .then(() => res.sendStatus(204))
    .catch(next);
};


module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute
};
