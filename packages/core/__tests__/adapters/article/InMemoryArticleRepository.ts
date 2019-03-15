import InMemoryRepository from "../../support/InMemoryRepository";
import ArticleId from "@/domain/article/ArticleId";
import Article from "@/domain/article/Article";
import * as uuid from "uuid";

export default class InMemoryArticleRepository extends InMemoryRepository<ArticleId, Article> {
  public async nextId(): Promise<ArticleId> {
    return new ArticleId(uuid.v4());
  }
}
