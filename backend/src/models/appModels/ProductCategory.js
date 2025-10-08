const mongoose = require('mongoose');

const productCategorySchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  
  description: {
    type: String,
    trim: true,
  },
  
  color: {
    type: String,
    trim: true,
  },
  
  createdBy: { 
    type: mongoose.Schema.ObjectId, 
    ref: 'Admin',
    required: true,
  },
  
  created: {
    type: Date,
    default: Date.now,
  },
  
  updated: {
    type: Date,
    default: Date.now,
  },
});

// Middleware para actualizar la fecha de actualización
productCategorySchema.pre('save', function(next) {
  this.updated = Date.now();
  next();
});

productCategorySchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('ProductCategory', productCategorySchema);

