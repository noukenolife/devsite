import IRepository from "@/domain/support/IRepository";
import ArticleTagId from "@/domain/article/ArticleTagId";
import ArticleTag from "@/domain/article/ArticleTag";
import ArticleId from "@/domain/article/ArticleId";

export default interface IArticleTagRepository extends IRepository<ArticleTagId, ArticleTag> {
  findByArticleId(articleId: ArticleId): Promise<ArticleTag[]>
}
