import { FileIO } from '../../../src/filesystem';
import { FileIOArticleByIdQuery } from '../../../src/adapters/article/FileIOArticleByIdQuery';
import { IArticleFile } from '../../../src/respository/article/IArticleFile';
import { application } from '@devsite/core';
jest.mock('../../../src/filesystem');

describe('FileIOArticleByIdQuery', () => {
  it('should get a articleModule by the id', async () => {
    const fileIOMock: jest.Mocked<FileIO> = new FileIO({
      dir: '',
      encoding: 'utf8',
    }) as any;

    const articleFileObj: IArticleFile = {
      id: '1',
      title: 'ArticleModule Title',
      content: 'ArticleModule Content',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    fileIOMock.readJSON.mockImplementation(async (relativeFilePath: string) => articleFileObj);

    const query = new FileIOArticleByIdQuery(fileIOMock);
    const article = await query.invoke('1');

    expect(article).toEqual({
      id: articleFileObj.id,
      title: articleFileObj.title,
      content: articleFileObj.content,
      createdAt: articleFileObj.createdAt,
      updatedAt: articleFileObj.updatedAt,
    } as application.article.IArticle);
  });
});
