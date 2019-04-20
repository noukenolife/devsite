import {application, domain} from '@devsite/core';
import {adapters} from '@devsite/infrastructure';
import * as path from 'path';

export const articleRepository: domain.article.IArticleRepository =
  new adapters.article.ArticleFileIORepository({
    dir: path.resolve(__dirname, '../public'),
    encoding: 'utf8',
  });

export const saveArticle: application.article.SaveArticle =
  new application.article.SaveArticle(articleRepository);

export const deleteArticle: application.article.DeleteArticle =
  new application.article.DeleteArticle(articleRepository);
