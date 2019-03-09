import IArticleRepository from "@/domain/article/IArticleRepository";
import IDeleteArticleInput from "@/application/article/IDeleteArticleInput";
import ArticleId from "@/domain/article/ArticleId";

export default class DeleteArticle {
  protected _articleRepo: IArticleRepository;

  public constructor(articleRepo: IArticleRepository) {
    this._articleRepo = articleRepo;
  }

  public async invoke(input: IDeleteArticleInput): Promise<void> {
    return this._articleRepo.remove(new ArticleId(input.id));
  }
}
