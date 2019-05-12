import {Request, Response} from 'express';
import {application} from '@devsite/core';
import {articleListQuery} from '../../provider';

export const getArticleListAction = async (req: Request, res: Response) => {
  const criteria: application.article.IArticleListCriteria = req.query;
  const list = await articleListQuery.invoke(criteria);

  res.status(200).send(list);
};
