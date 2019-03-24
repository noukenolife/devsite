import { Article } from '@/domain/article/Article';
import { ArticleId } from '@/domain/article/ArticleId';
import { IRepository } from '@/domain/support/IRepository';

export interface IArticleRepository extends IRepository<ArticleId, Article> {
}
