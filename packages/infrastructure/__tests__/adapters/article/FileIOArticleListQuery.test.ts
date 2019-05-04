import { FileIO } from '../../../src/filesystem/FileIO';
import { IArticleMetaFile } from '../../../src/respository/article/IArticleMetaFile';
import { IArticleMetaItem } from '../../../src/respository/article/IArticleMetaItem';
import { FileIOArticleListQuery } from '../../../src/adapters/article';
import { application } from '@devsite/core';
jest.mock('../../../src/filesystem/FileIO');

describe('FileIOArticleListQuery', () => {
  it('sort by updatedAt', async () => {
    const items: IArticleMetaItem[] = [
      {
        id: '1',
        title: 'Article Title 1',
        summary: 'Article Summary 1',
        createdAt: new Date('2019-05-03T00:00:00.000Z').toISOString(),
        updatedAt: new Date('2019-05-03T00:00:00.000Z').toISOString(),
      },
      {
        id: '2',
        title: 'Article Title 2',
        summary: 'Article Summary 2',
        createdAt: new Date('2019-05-03T01:00:00.000Z').toISOString(),
        updatedAt: new Date('2019-05-03T01:00:00.000Z').toISOString(),
      },
      {
        id: '3',
        title: 'Article Title 3',
        summary: 'Article Summary 3',
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
      order: new application.support.Asc(),
    });

    expect(result1).toEqual({
      count: 2,
      items: items.map(item => ({
        title: item.title,
        summary: item.summary,
        updatedAt: item.updatedAt,
      }) as application.article.IArticleListItem).slice(0, 2),
    } as application.article.IArticleList);

    const result2 = await query.invoke({
      offset: 0,
      limit: 2,
      sortBy: 'updatedAt',
      order: new application.support.Desc(),
    });

    expect(result2).toEqual({
      count: 2,
      items: items.map(item => ({
        title: item.title,
        summary: item.summary,
        updatedAt: item.updatedAt,
      }) as application.article.IArticleListItem).slice(1, 3),
    } as application.article.IArticleList);
  });
});
