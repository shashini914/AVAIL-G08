// MongoDB connection string for a cluster hosted on MongoDB Atlas
// Replace 'aadil' and '12345' with your own username and password
dbPassword = 'mongodb+srv://aadil:12345@cluster0.kbplbu0.mongodb.net/?retryWrites=true&w=majority';

// Export the connection password string as a module
module.exports = {
    mongoURI: dbPassword
};
