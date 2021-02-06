import Joi from 'joi';

const validate = Joi.object({
  page: Joi.number()
    .integer()
    .min(1),

  limit: Joi.number()
    .integer()
    .min(1)
    .max(50)
});

export default validate;