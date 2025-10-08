const mongoose = require('mongoose');

const Model = mongoose.model('Product');

const create = async (req, res) => {
  let body = req.body;

  // Asignar el usuario que crea el producto
  body['createdBy'] = req.admin._id;

  // Creating a new document in the collection
  const result = await new Model(body).save();

  // Returning successfull response
  return res.status(200).json({
    success: true,
    result,
    message: 'Producto creado exitosamente',
  });
};

module.exports = create;
