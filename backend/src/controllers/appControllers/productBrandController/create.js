const mongoose = require('mongoose');

const Model = mongoose.model('ProductBrand');

const create = async (req, res) => {
  let body = req.body;

  // Asignar el usuario que crea la marca
  body['createdBy'] = req.admin._id;

  // Creating a new document in the collection
  const result = await new Model(body).save();

  // Returning successfull response
  return res.status(200).json({
    success: true,
    result,
    message: 'Marca creada exitosamente',
  });
};

module.exports = create;
