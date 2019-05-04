import {application, domain} from '@devsite/core';
import * as path from 'path';
import {adapters} from '@devsite/infrastructure';

export const articleRepository: domain.article.IArticleRepository =
  new adapters.article.FileIOArticleRepository({
    dir: path.resolve(__dirname, '../public'),
    encoding: 'utf8',
  });

export const saveArticle: application.article.SaveArticle =
  new application.article.SaveArticle(articleRepository);

export const deleteArticle: application.article.DeleteArticle =
  new application.article.DeleteArticle(articleRepository);
