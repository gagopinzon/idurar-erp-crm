const createCRUDController = require('@/controllers/middlewaresControllers/createCRUDController');

const productCategoryController = createCRUDController('ProductCategory');

// Sobrescribir el método create con nuestro controlador personalizado
const create = require('./create');
productCategoryController.create = create;

module.exports = productCategoryController;
