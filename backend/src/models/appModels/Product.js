const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  
  sku: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true,
  },
  
  name: {
    type: String,
    required: true,
    trim: true,
  },
  
  description: {
    type: String,
    trim: true,
  },
  
  brand: {
    type: String,
    trim: true,
    // Nota: Guardamos el nombre de la marca como string para flexibilidad
    // Alternativamente podría ser: type: mongoose.Schema.ObjectId, ref: 'ProductBrand'
  },
  
  unit: {
    type: String,
    required: true,
    enum: ['piece', 'box', 'kg', 'g', 'liter', 'ml', 'm', 'cm', 'm2', 'm3', 'set', 'pack', 'dozen', 'unit'],
    default: 'piece',
  },
  
  inventory: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  
  minStock: {
    type: Number,
    default: 0,
    min: 0,
  },
  
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  
  cost: {
    type: Number,
    default: 0,
    min: 0,
  },
  
  category: {
    type: String,
    trim: true,
    // Nota: Guardamos el nombre de la categoría como string para flexibilidad
    // Alternativamente podría ser: type: mongoose.Schema.ObjectId, ref: 'ProductCategory'
  },
  
  barcode: {
    type: String,
    trim: true,
  },
  
  image: {
    type: String,
    trim: true,
  },
  
  status: {
    type: String,
    enum: ['active', 'inactive', 'discontinued'],
    default: 'active',
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
productSchema.pre('save', function(next) {
  this.updated = Date.now();
  next();
});

productSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Product', productSchema);

