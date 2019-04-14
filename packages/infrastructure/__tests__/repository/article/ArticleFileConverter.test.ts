import { ArticleFileConverter } from '@/respository/article/ArticleFileConverter';
import { domain } from '@devsite/core';
import { ArticleFile } from '@/respository/article/ArticleFile';

describe('ArticleFileConverter', () => {
  const converter = new ArticleFileConverter();

  const file: ArticleFile = new ArticleFile(
    '1',
    'Test Title',
    'Test Content',
    new Date().toISOString(),
    new Date().toISOString(),
  );

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
