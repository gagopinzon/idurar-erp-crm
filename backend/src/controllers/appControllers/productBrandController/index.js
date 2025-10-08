const createCRUDController = require('@/controllers/middlewaresControllers/createCRUDController');

const productBrandController = createCRUDController('ProductBrand');

// Sobrescribir el método create con nuestro controlador personalizado
const create = require('./create');
productBrandController.create = create;

module.exports = productBrandController;
