const router = require('express').Router();
const products = require('../controllers/products');
const reviews = require('../controllers/reviews');
const users = require('../controllers/users');
const auth = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');
const adminRoute = require('../lib/adminRoute');
const purchases = require('../controllers/purchases');

router.route('/')
  .get(products.index)
  .post(secureRoute, adminRoute, products.create);

router.route('/product/:productId')
  .get(products.show)
  .put(secureRoute, adminRoute, products.update)
  .delete(secureRoute, adminRoute, products.delete);

router.post('/product/:productId/reviews', secureRoute, reviews.create);
router.delete('/product/:productId/reviews/:reviewId', secureRoute, reviews.delete);

router.post('/register', auth.register);
router.post('/login', auth.login);

router.route('/users')
  .get(secureRoute, adminRoute, users.index);

router.route('/users/:userId')
  .put(secureRoute, users.update)
  .get(secureRoute, users.show);


router.post('/checkout', secureRoute, purchases.create);
router.get('/userpurchases', secureRoute, purchases.userPurchasesIndex);
router.get('/mypurchases', secureRoute, purchases.myPurchasesIndex);
router.get('/allpurchases', secureRoute, adminRoute, purchases.allPurchasesIndex);

module.exports = router;
