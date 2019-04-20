import {Request, Response} from 'express-serve-static-core';
import {saveArticle} from '../../provider';

export const saveArticleAction = async (req: Request, res: Response) => {
  const result = await saveArticle.invoke(req.body);
  res.status(200).send(result);
};
