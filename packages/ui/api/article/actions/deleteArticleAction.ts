import {Request, Response} from 'express';
import {deleteArticle} from '../../provider';
import {application} from '@devsite/core';

export const deleteArticleAction = async (req: Request, res: Response) => {
  const input: application.article.IDeleteArticleInput = req.params;

  await deleteArticle.invoke(input);

  res.status(204).send({
    message: `The article ${input.id} has been deleted.`,
  });
};
