import {application} from '@devsite/core';
import {ENDPOINTS} from '@/api/endpoints';
import {articleModule} from '@/store/modules/article/ArticleModule';
import {API} from '@/api/API';

export class GetArticleById {

  public constructor(protected _api: API) {}

  public async invoke(articleId: string) {
    articleModule.setArticle(
      await this._api.invoke<application.article.IArticle>({
        ...ENDPOINTS.GET_ARTICLE(articleId),
      }),
    );
  }
}
