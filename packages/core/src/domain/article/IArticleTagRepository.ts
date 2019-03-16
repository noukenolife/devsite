import ArticleId from '@/domain/article/ArticleId';
import ArticleTag from '@/domain/article/ArticleTag';
import ArticleTagId from '@/domain/article/ArticleTagId';
import IRepository from '@/domain/support/IRepository';

export default interface IArticleTagRepository extends IRepository<ArticleTagId, ArticleTag> {
  findByArticleId(articleId: ArticleId): Promise<ArticleTag[]>;
}
