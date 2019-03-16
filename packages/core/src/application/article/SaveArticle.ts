import ISaveArticleInput from '@/application/article/ISaveArticleInput';
import Article from '@/domain/article/Article';
import ArticleId from '@/domain/article/ArticleId';
import IArticleRepository from '@/domain/article/IArticleRepository';

export default class SaveArticle {
  protected _articleRepo: IArticleRepository;

  public constructor(articleRepo: IArticleRepository) {
    this._articleRepo = articleRepo;
  }

  public async invoke(input: ISaveArticleInput): Promise<void> {
    let articleToSave;

    if (input.id) {
      articleToSave = await this._articleRepo.findById(new ArticleId(input.id));
      if (!(articleToSave instanceof Article)) {
        throw Error(); // TODO: Create a custom error class
      } else {
        articleToSave.update(input.title, input.content);
      }
    } else {
      const articleId = await this._articleRepo.nextId();
      articleToSave = new Article(articleId, input.title, input.content);
    }

    return this._articleRepo.save(articleToSave);
  }
}
