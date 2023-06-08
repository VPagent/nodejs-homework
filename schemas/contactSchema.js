const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(1).max(50).required(),
  email: Joi.string().email().min(1).max(50).required(),
  phone: Joi.string().min(1).max(50).required(),
});

const validationAddContact = (req, res, next) => {
  const validationResult = schema.validate(req.body);
  const hasReqBody = req.body && Object.keys(req.body).length;

  if (!hasReqBody) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  if (validationResult.error) {
    const [details] = validationResult.error.details;
    const reasonOfError = details.context.label;

    res
      .status(400)
      .json({ message: `missing required ${reasonOfError} field` });
    return;
  }

  next();
};

module.exports = validationAddContact;
