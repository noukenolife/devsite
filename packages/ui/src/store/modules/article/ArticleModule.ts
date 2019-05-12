import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import {application} from '@devsite/core';
import store from '@/store';

export interface IArticleModuleState {
  article: application.article.IArticle;
}

@Module({ dynamic: true, store, name: 'articleModule', namespaced: true })
export default class ArticleModule extends VuexModule implements IArticleModuleState {
  public article: application.article.IArticle = {
    title: '',
    content: '',
  };

  @Mutation
  public setArticle(article: application.article.IArticle) {
    this.article = article;
  }

  @Action({ commit: 'setArticle' })
  public async createNewArticle() {
    return {
      title: '',
      content: '',
    };
  }
}

export const articleModule = getModule(ArticleModule);
