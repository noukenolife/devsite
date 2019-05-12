import { FileIO } from '../../../src/filesystem';
import { IArticleMetaFile } from '../../../src/respository/article/IArticleMetaFile';
import { IArticleMetaItem } from '../../../src/respository/article/IArticleMetaItem';
import { FileIOArticleListQuery } from '../../../src/adapters/article';
import { application } from '@devsite/core';
jest.mock('../../../src/filesystem');

describe('FileIOArticleListQuery', () => {
  it('sort by updatedAt', async () => {
    const items: IArticleMetaItem[] = [
      {
        id: '1',
        title: 'ArticleModule Title 1',
        content: 'ArticleModule Summary 1',
        createdAt: new Date('2019-05-03T00:00:00.000Z').toISOString(),
        updatedAt: new Date('2019-05-03T00:00:00.000Z').toISOString(),
      },
      {
        id: '2',
        title: 'ArticleModule Title 2',
        content: 'ArticleModule Summary 2',
        createdAt: new Date('2019-05-03T01:00:00.000Z').toISOString(),
        updatedAt: new Date('2019-05-03T01:00:00.000Z').toISOString(),
      },
      {
        id: '3',
        title: 'ArticleModule Title 3',
        content: 'ArticleModule Summary 3',
        createdAt: new Date('2019-05-03T01:00:00.000Z').toISOString(),
        updatedAt: new Date('2019-05-03T01:00:00.000Z').toISOString(),
      },
    ];

    const fileIOMock: jest.Mocked<FileIO> = new FileIO({
      dir: '',
      encoding: 'utf8',
    }) as any;

    fileIOMock.readJSON.mockImplementation(async (relativeFilePath: string) => {
      return {
        items,
      } as IArticleMetaFile;
    });

    const query = new FileIOArticleListQuery(fileIOMock);

    const result1 = await query.invoke({
      offset: 0,
      limit: 2,
      sortBy: 'updatedAt',
      order: application.support.Orders.ASC,
    });

    expect(result1).toEqual({
      count: 2,
      items: items.map(item => ({
        id: item.id,
        title: item.title,
        content: item.content,
        updatedAt: item.updatedAt,
      }) as application.article.IArticleListItem).slice(0, 2),
    } as application.article.IArticleList);

    const result2 = await query.invoke({
      offset: 0,
      limit: 2,
      sortBy: 'updatedAt',
      order: application.support.Orders.DESC,
    });

    expect(result2).toEqual({
      count: 2,
      items: items.map(item => ({
        id: item.id,
        title: item.title,
        content: item.content,
        updatedAt: item.updatedAt,
      }) as application.article.IArticleListItem).slice(1, 3),
    } as application.article.IArticleList);
  });
});
