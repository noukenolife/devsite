import {articleListModule} from '@/store/modules/article/ArticleListModule';
import {application} from '@devsite/core';
import {API} from '@/api/API';
import {ENDPOINTS} from '@/api/endpoints';
import {IArticleList} from '@/store/models/article/IArticleList';

export class GetArticleList {

  public constructor(protected _api: API) {}

  public async invoke(criteria: application.article.IArticleListCriteria) {
    const list = await this._api.invoke<IArticleList>({
      ...ENDPOINTS.GET_ARTICLE_LIST,
      params: criteria,
    });

    articleListModule.set({
      ...list,
      items: list.items.map(item => {
        return { ...item, deletedAt: "" };
      }),
    });
  }
}
