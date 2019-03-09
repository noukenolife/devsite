import IRepository from "@/domain/support/IRepository";
import ArticleId from "@/domain/article/ArticleId";
import Article from "@/domain/article/Article";

export default interface IArticleRepository extends IRepository<ArticleId, Article> {
}
