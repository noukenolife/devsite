import { IFileConverter } from '@/filesystem/IFileConverter';
import { domain } from '@devsite/core';
import { IArticleFile } from '@/respository/article/IArticleFile';

export class ArticleFileConverter implements IFileConverter<domain.article.Article, IArticleFile> {
  fromEntity(entity: domain.article.Article): IArticleFile {
    return {
      id: entity.id.value,
      title: entity.title,
      content: entity.content,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };
  }

  toEntity(obj: IArticleFile): domain.article.Article {
    return new domain.article.Article(
      new domain.article.ArticleId(obj.id),
      obj.title,
      obj.content,
      new Date(obj.createdAt),
      new Date(obj.updatedAt),
    );
  }
}
