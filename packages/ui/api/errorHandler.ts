import {NextFunction, Request, Response} from 'express';
import {domain} from '@devsite/core';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {

  if (!err) { next(); }

  switch (err.constructor) {
    case domain.support.EntityNotFound:
      return res.status(404).json({ message: err.message });
    default:
      return res.status(500).json({ message: err.message });
  }
}
