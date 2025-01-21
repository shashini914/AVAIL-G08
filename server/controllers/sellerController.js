require('../models/database');
const Category = require('../models/Category');
const Seller = require('../models/Seller');

/**
 * GET /
 * Homepage 
 */
exports.homepage = async(req, res) => {
  try {
    // Declare a constant to limit the number of items to retrieve
    const limitNumber = 5;

    // Use the Category model to retrieve a limited number of categories from the database
    const categories = await Category.find({}).limit(limitNumber);

    // Use the Seller model to retrieve a limited number of the latest sellers from the database
    // Sort by the most recent and limit to the number specified by "limitNumber"
    const latest = await Seller.find({}).sort({_id: -1}).limit(limitNumber);
    
    // Use the Seller model to retrieve a limited number of Painters from the database
    const painter = await Seller.find({ 'category': 'Painter' }).limit(limitNumber);
    
    // Use the Seller model to retrieve a limited number of Tutors from the database
    const Tutors = await Seller.find({ 'category': 'Tutors' }).limit(limitNumber);
    
    // Use the Seller model to retrieve a limited number of Builders from the database
    const Builders = await Seller.find({ 'category': 'Builders' }).limit(limitNumber);
    
    // Use the Seller model to retrieve a limited number of Electricians from the database
    const Electricians = await Seller.find({ 'category': 'Electricians' }).limit(limitNumber);

    // Combine all the services data into an object
    const service = { latest, painter, Tutors, Builders ,Electricians};

    // Render the "index" view and pass in the title, categories and service data as local variables
    res.render('index', { title: 'AVAIL', categories, service } );
  } catch (error) {
    // If an error occurs while executing the function, 
    // Send the error message to the client with a status of 500
    res.satus(500).send({message: error.message || "Error Occured" });
  }
}


/**
 * GET /categories
 * Categories 
 */
exports.exploreCategories = async(req, res) => {
  try {
    // Declare a constant to limit the number of items to retrieve
    const limitNumber = 20;

    // Use the Category model to retrieve a limited number of categories from the database
    const categories = await Category.find({}).limit(limitNumber);

    // Render the "categories" view and pass in the title and categories data as local variables
    res.render('categories', { title: 'Services - Categories', categories } );
  } catch (error) {
    // If an error occurs while executing the function, 
    // Send the error message to the client with a status of 500
    res.satus(500).send({message: error.message || "Error Occured" });
  }
}



/**
 * GET /categories/:id
 * Categories By Id
 */
exports.exploreCategoriesById = async(req, res) => { 
  try {
    // Get the category id from the request parameters
    let categoryId = req.params.id;
    // Declare a constant to limit the number of items to retrieve
    const limitNumber = 20;
    // Use the Seller model to retrieve a limited number of sellers by category id from the database
    const categoryById = await Seller.find({ 'category': categoryId }).limit(limitNumber);
    // Render the "categories" view and pass in the title and categoryById data as local variables
    res.render('categories', { title: 'services - Categories', categoryById } );
  } catch (error) {
    // If an error occurs while executing the function, 
    // Send the error message to the client with a status of 500
    res.satus(500).send({message: error.message || "Error Occured" });
  }
}

 
/**
 * GET /seller/:id
 * Seller 
 */
exports.exploreSeller = async(req, res) => {
  try {
    // Get the seller id from the request parameters
    let sellerId = req.params.id;
    // Use the Seller model to retrieve a seller by id from the database
    const seller = await Seller.findById(sellerId);
    // Render the "seller" view and pass in the title and seller data as local variables
    res.render('seller', { title: 'services - Seller', seller } );
  } catch (error) {
    // If an error occurs while executing the function, 
    // Send the error message to the client with a status of 500
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 

/**
 * POST /search
 * Search 
 */
exports.searchSeller = async(req, res) => {
  try {
    // Get the search term from the request body
    let searchTerm = req.body.searchTerm;
    // Use the Seller model to search for sellers that match the search term
    let seller = await Seller.find( { $text: { $search: searchTerm, $diacriticSensitive: true } });
    // Render the "search" view and pass in the title and seller data as local variables
    res.render('search', { title: 'services - Search', seller } );
  } catch (error) {
    // If an error occurs while executing the function, 
    // Send the error message to the client with a status of 500
    res.satus(500).send({message: error.message || "Error Occured" });
  }
  
}


/**
 * GET /explore-latest
 * Explore Latest 
 */
exports.exploreLatest = async(req, res) => {
  try {
    // Declare a constant to limit the number of items to retrieve
    const limitNumber = 50;
    // Use the Seller model to retrieve the latest sellers from the database
    // Sort by the most recent and limit to the number specified by "limitNumber"
    const seller = await Seller.find({}).sort({ _id: -1 }).limit(limitNumber);
    // Render the "explore-latest" view and pass in the title and seller data as local variables
    res.render('explore-latest', { title: 'services - Explore Latest', seller } );
  } catch (error) {
    // If an error occurs while executing the function, 
    // Send the error message to the client with a status of 500
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 

/**
 * GET /explore-random
 * Explore Random
 */
exports.exploreRandom = async(req, res) => {
  try {
    // Get the total number of sellers in the database
    let count = await Seller.find().countDocuments();
    // Generate a random number within the range of the number of sellers
    let random = Math.floor(Math.random() * count);
    // Use the Seller model to retrieve one random seller from the database, skipping the number of sellers specified by the random number
    let seller = await Seller.findOne().skip(random).exec();
    // Render the "explore-random" view and pass in the title and seller data as local variables
    res.render('explore-random', { title: 'services - Explore Random', seller } );
  } catch (error) {
    // If an error occurs while executing the function, 
    // Send the error message to the client with a status of 500
    res.satus(500).send({message: error.message || "Error Occured" });
  }
}


/**
 * GET /submit-seller
 * Submit seller
*/
exports.submitSeller = async(req, res) => {
  // Retrieve flash messages for errors and submissions
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  
  // Render the submit-seller view with the title, flash messages for errors and submissions
  res.render('submit-seller', { title: 'services - Submit Seller', infoErrorsObj, infoSubmitObj  } );
}

/**
 * POST /submit-seller
 * Submit seller
*/
exports.submitSellerOnPost = async(req, res) => {
  try {

    // Check if any files were uploaded with the request
    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if(!req.files || Object.keys(req.files).length === 0){
      console.log('No Files where uploaded.');
    } else {

      // Process the image file and save it to the public/uploads directory with a unique name
      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;
      uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;
      imageUploadFile.mv(uploadPath, function(err){
        if(err) return res.satus(500).send(err);
      })

    }

    // Create a new seller object using the data from the request body and the image name
    const newSeller = new Seller({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      ingredients: req.body.ingredients,
      category: req.body.category,
      image: newImageName
    });
    
    // Save the new seller object to the database
    await newSeller.save();

    // If the save is successful, store a success message in a flash message and redirect the user to the submit-seller route.
    req.flash('infoSubmit', 'CONGRATULATIONS YOUR PROFILE SUCCESSFULLY ADDED (YOU HAVE 30 DAYS UNTIL TO MAKE THE PAYMENT )')
    res.redirect('/submit-seller');
  } catch (error) {
    // If there is an error, store the error in a flash message and redirect the user to the submit-seller route.
    req.flash('infoErrors', error);
    res.redirect('/submit-seller');
  }
}



// /**
//  * DELETE /seller/:id
//  * Delete a seller
// */
// exports.deleteSeller = async(req, res) => {
//   try {
//     let SellerId = req.params.id;
//     const deletedSeller = await Seller.findByIdAndRemove(SellerId);
//     res.redirect('/explore-latest');
//   } catch (error) {
//     res.satus(500).send({message: error.message || "Error Occured" });
//   }
// }

// /**
//  * PUT /seller/:id
//  * Update a seller
// */
// exports.updateSeller = async(req, res) => {
//   try {
//     let SellerId = req.params.id;
//     const updatedSeller = await Seller.findByIdAndUpdate(SellerId, req.body, {new: true});
//     res.redirect(`/seller/${SellerId}`);
//   } catch (error) {
//     res.satus(500).send({message: error.message || "Error Occured" });
//   }
// }


// Delete seller
async function deleteSeller(){
  try {
    await Seller.deleteOne({ name: 'New name Updated' });
  } catch (error) {
    console.log(error);
 }
}
deleteSeller();


//Update seller
async function updateSeller(){
  try {
    const res = await Seller.updateOne({ name: 'images testing 2' }, { name: 'New name Updated' });
   res.n; // Number of documents matched
    res.nModified; // Number of documents modified
  } catch (error) {
    console.log(error);
  }
}
updateSeller();
