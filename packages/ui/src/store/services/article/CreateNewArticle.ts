import {articleModule} from '@/store/modules/article/ArticleModule';
import {SaveArticle} from '@/store/services/article/SaveArticle';

export class CreateNewArticle {

  public constructor(protected _saveArticle: SaveArticle) {}

  public async invoke() {
    await articleModule.createNewArticle();
    await this._saveArticle.invoke();
  }
}
