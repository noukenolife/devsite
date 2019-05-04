import { domain } from '@devsite/core';
import { IArticleFile } from '@/respository/article/IArticleFile';
import { ArticleFileConverter } from '@/respository/article/ArticleFileConverter';

describe('ArticleFileConverter', () => {
  const converter = new ArticleFileConverter();

  const file: IArticleFile = {
    id: '1',
    title: 'Test Title',
    content: 'Test Content',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const entity: domain.article.Article = new domain.article.Article(
    new domain.article.ArticleId(file.id),
    file.title,
    file.content,
    new Date(file.createdAt),
    new Date(file.updatedAt),
  );

  it('fromEntity', () => {
    expect(converter.fromEntity(entity)).toEqual(file);
  });

  it('toEntity', () => {
    expect(converter.toEntity(file)).toEqual(entity);
  });
});
