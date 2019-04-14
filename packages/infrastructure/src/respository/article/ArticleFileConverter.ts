import { IFileConverter } from '@/filesystem/IFileConverter';
import { domain } from '@devsite/core';
import { ArticleFile } from '@/respository/article/ArticleFile';

export class ArticleFileConverter implements IFileConverter<domain.article.Article, ArticleFile> {
  fromEntity(entity: domain.article.Article): ArticleFile {
    return new ArticleFile(
      entity.id.value,
      entity.title,
      entity.content,
      entity.createdAt.toISOString(),
      entity.updatedAt.toISOString(),
    );
  }

  toEntity(obj: ArticleFile): domain.article.Article {
    return new domain.article.Article(
      new domain.article.ArticleId(obj.id),
      obj.title,
      obj.content,
      new Date(obj.createdAt),
      new Date(obj.updatedAt),
    );
  }
}
