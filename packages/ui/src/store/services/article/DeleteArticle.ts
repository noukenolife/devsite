import {API} from '@/api/API';
import {ENDPOINTS} from '@/api/endpoints';
import {articleListModule} from '@/store/modules/article/ArticleListModule';

export class DeleteArticle {

  public constructor(protected _api: API) {}

  public async invoke(articleId: string) {
    await this._api.invoke(ENDPOINTS.DELETE_ARTICLE(articleId));
    articleListModule.deleteArticleById(articleId);
  }
}
