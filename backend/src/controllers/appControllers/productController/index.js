const createCRUDController = require('@/controllers/middlewaresControllers/createCRUDController');

const productController = createCRUDController('Product');

// Sobrescribir el método create con nuestro controlador personalizado
const create = require('./create');
productController.create = create;

module.exports = productController;
