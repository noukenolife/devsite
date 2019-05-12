import {application} from '@devsite/core';
import {API} from '@/api/API';
import {ENDPOINTS} from '@/api/endpoints';
import {articleModule} from '@/store/modules/article/ArticleModule';

export class SaveArticle {

  public constructor(protected _api: API) {}

  public async invoke() {
    const article = articleModule.article;

    const result = await this._api.invoke<application.article.ISaveArticleOutput>({
      ...ENDPOINTS.POST_ARTICLE,
      data: article as application.article.ISaveArticleInput,
    });

    articleModule.setArticle({
      ...article,
      ...result,
    });
  }
}
