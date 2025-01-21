const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/sellerController');
router.use('/route', router);
/**
 * App Routes 
*/
router.get('/', sellerController.homepage);
router.get('/seller/:id', sellerController.exploreRecipe );
router.get('/categories', sellerController.exploreCategories);
router.get('/categories/:id', sellerController.exploreCategoriesById);
router.post('/search', sellerController.searchSeller);
router.get('/explore-latest', sellerController.exploreLatest);
router.get('/explore-random', sellerController.exploreRandom);
router.get('/submit-seller', sellerController.submitSeller);
router.post('/submit-seller', sellerController.submitSellerOnPost);


router.get('/services', sellerController.exploreLatest);



router.get('/aboutus',(req,res) => {
    res.render('aboutus')
  })

  router.get('/testingg',(req,res) => {
    res.render('testingg')
  })





  module.exports = router;