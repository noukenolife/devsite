import {getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {IArticleList} from '@/store/models/article/IArticleList';

export interface IArticleListModuleState {
  articleList: IArticleList;
}

@Module({ dynamic: true, store, name: 'articleListModule', namespaced: true })
export default class ArticleListModule extends VuexModule implements IArticleListModuleState {
  public articleList: IArticleList = {
    count: 0,
    items: [],
  };

  @Mutation
  public set(articleList: IArticleList) {
    this.articleList = articleList;
  }

  @Mutation
  public deleteArticleById(articleId: string) {
    const idx = this.articleList.items
      .findIndex((item) => item.id === articleId);
    if (this.articleList.items[idx]) {
      this.articleList.items[idx].deletedAt = new Date().toISOString();
    }
  }
}

export const articleListModule = getModule(ArticleListModule);
