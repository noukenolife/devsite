import * as path from 'path';
import { IFileIOOptions } from '../../../src/filesystem/IFileIOOptions';
import { FileIOArticleRepository } from '../../../src/adapters/article';
import { FileIO } from '../../../src/filesystem/FileIO';
import {domain} from '@devsite/core';
import {IArticleMetaFile} from '../../../src/respository/article/IArticleMetaFile';

describe('FileIOArticleRepository', () => {

  const options: IFileIOOptions = {
    encoding: 'utf8',
    dir: path.resolve(__dirname, './'),
  };

  const fileIO = new FileIO(options);

  const repo = new FileIOArticleRepository(fileIO);

  it('save', async () => {
    const id = new domain.article.ArticleId('1');
    const entity = new domain.article.Article(
      id,
      'Article Title',
      'Article Content',
      new Date(),
      new Date(),
    );

    await repo.save(entity);

    const meta: IArticleMetaFile = await fileIO.readJSON(
      FileIOArticleRepository.ARTICLE_META_FILE_PATH,
    );

    expect(meta).toEqual({
      items: [{
        id: entity.id.value,
        title: entity.title,
        summary: entity.content,
        createdAt: entity.createdAt.toISOString(),
        updatedAt: entity.updatedAt.toISOString(),
      }],
    } as IArticleMetaFile);
  });

  it('update', async () => {
    const id = new domain.article.ArticleId('1');
    const entity = new domain.article.Article(
      id,
      'Article Title',
      'Article Content',
      new Date(),
      new Date(),
    );

    await repo.save(entity);

    const meta: IArticleMetaFile = await fileIO.readJSON(
      FileIOArticleRepository.ARTICLE_META_FILE_PATH,
    );

    expect(meta).toEqual({
      items: [{
        id: entity.id.value,
        title: entity.title,
        summary: entity.content,
        createdAt: entity.createdAt.toISOString(),
        updatedAt: entity.updatedAt.toISOString(),
      }],
    } as IArticleMetaFile);
  });

  it('remove', async () => {
    const id = new domain.article.ArticleId('1');

    await repo.remove(id);

    const meta: IArticleMetaFile = await fileIO.readJSON(
      FileIOArticleRepository.ARTICLE_META_FILE_PATH,
    );

    expect(meta).toEqual({
      items: [],
    } as IArticleMetaFile);

    await fileIO.unlink(FileIOArticleRepository.ARTICLE_META_FILE_PATH);
  });
});
