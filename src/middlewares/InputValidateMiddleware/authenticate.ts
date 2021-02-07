import { Request, Response, NextFunction } from 'express';

import authSchemaPost from './schema/authenticate/post';

import utils from '../../utils';

const inputValidate = (req: Request, res: Response, next: NextFunction) => {
  const input = { ...req.body, ...req.params, ...req.query };
  const options = {
    abortEarly: false
  };

  const schema = authSchemaPost;

  const { error } = schema.validate(input, options);

  if (error) {
    const message = error.details.map(
      (detail) => detail.message.replace(/(")|(")/g, ''),
    );

    const { code, data } = utils.errorResponse({ message, code: 400 });
    return res.status(code).send(data);
  }

  next();
}

export default inputValidate;