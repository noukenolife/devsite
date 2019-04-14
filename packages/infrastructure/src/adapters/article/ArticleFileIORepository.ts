import { FileIORepository } from '@/filesystem/FileIORepository';
import { domain } from '@devsite/core';
import * as uuid from 'uuid';
import { ArticleFile } from '@/respository/article/ArticleFile';
import { ArticleFileConverter } from '@/respository/article/ArticleFileConverter';

export class ArticleFileIORepository
  extends FileIORepository<domain.article.ArticleId, domain.article.Article, ArticleFile>
  implements domain.article.IArticleRepository {

  protected _converter: ArticleFileConverter = new ArticleFileConverter();

  public async nextId(): Promise<domain.article.ArticleId> {
    return new domain.article.ArticleId(uuid.v4());
  }
}
