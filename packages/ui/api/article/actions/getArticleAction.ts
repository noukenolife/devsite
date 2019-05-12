import {Request, Response} from 'express';
import {articleByIdQuery} from '../../provider';
import {application} from '@devsite/core';

export const getArticleAction = async (req: Request, res: Response) => {
  const id: string = req.params && req.params.id;

  const article: application.article.IArticle = await articleByIdQuery.invoke(id);

  res.status(200).send(article);
};
