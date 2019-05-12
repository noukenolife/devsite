import {application, domain} from '@devsite/core';
import * as path from 'path';
import {adapters, filesystem} from '@devsite/infrastructure';

const fileIO: filesystem.FileIO = new filesystem.FileIO({
  dir: path.resolve(__dirname, './output'),
  encoding: 'utf8',
});

export const articleByIdQuery: application.article.IArticleByIdQuery =
  new adapters.article.FileIOArticleByIdQuery(fileIO);

export const articleListQuery: application.article.IArticleListQuery =
  new adapters.article.FileIOArticleListQuery(fileIO);

export const articleRepository: domain.article.IArticleRepository =
  new adapters.article.FileIOArticleRepository(fileIO);

export const saveArticle: application.article.SaveArticle =
  new application.article.SaveArticle(articleRepository);

export const deleteArticle: application.article.DeleteArticle =
  new application.article.DeleteArticle(articleRepository);
