import { Request, Response, NextFunction } from 'express';

import userSchemaGet from './schema/user/get';
import userSchemaShow from './schema/user/show';
import userSchemaPost from './schema/user/post';
import userSchemaPut from './schema/user/put';
import userSchemaDel from './schema/user/delete';

import utils from '../../utils';

const inputValidate = (req: Request, res: Response, next: NextFunction) => {
  const input = { ...req.body, ...req.params, ...req.query };
  const options = {
    abortEarly: false
  };

  let schema = null;
  switch (req.method.toLowerCase()) {
    case 'get':
      schema = req.params.id ? userSchemaShow : userSchemaGet;
      break;

    case 'post':
      schema = userSchemaPost;
      break;

    case 'put':
      schema = userSchemaPut;
      break;

    default:
      schema = userSchemaDel;
      break;
  }

  const { error } = schema.validate(input, options);

  if (error) {
    const message = error.details.map(
      (detail) => detail.message.replace(/(")|(")/g, ''),
    );

    return utils.errorResponse(res, { message, code: 400 });
  }

  next();
}

export default inputValidate;