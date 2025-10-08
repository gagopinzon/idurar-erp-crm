const mongoose = require('mongoose');

const productBrandSchema = new mongoose.Schema({
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
  
  website: {
    type: String,
    trim: true,
  },
  
  logo: {
    type: String,
    trim: true,
  },
  
  country: {
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
productBrandSchema.pre('save', function(next) {
  this.updated = Date.now();
  next();
});

productBrandSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('ProductBrand', productBrandSchema);

