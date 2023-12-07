const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
    unique: true,
  },
});

categorySchema.index({ slug: 1 });

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
