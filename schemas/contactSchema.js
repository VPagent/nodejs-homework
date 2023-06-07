const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(1).max(50).required(),
  email: Joi.string().email().min(1).max(50).required(),
  phone: Joi.string().min(1).max(50).required(),
});

const validationAddContact = (req, res, next) => {
  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    res.status(400).json({ message: validationResult.error.details });
    return;
  }

  next();
};

module.exports = validationAddContact;
