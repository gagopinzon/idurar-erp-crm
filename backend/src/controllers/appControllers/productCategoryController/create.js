const mongoose = require('mongoose');

const Model = mongoose.model('ProductCategory');

const create = async (req, res) => {
  let body = req.body;

  // Asignar el usuario que crea la categoría
  body['createdBy'] = req.admin._id;

  // Creating a new document in the collection
  const result = await new Model(body).save();

  // Returning successfull response
  return res.status(200).json({
    success: true,
    result,
    message: 'Categoría creada exitosamente',
  });
};

module.exports = create;
