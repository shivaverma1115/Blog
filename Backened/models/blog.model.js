const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    Title: { type: String, require: true },
    Image: { type: String, require: true },
    Description: { type: String, require: true },
},{timestamps: true})

const blogModel = mongoose.model('blog', blogSchema);

module.exports = {
    blogModel
}