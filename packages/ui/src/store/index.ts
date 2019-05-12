import Vue from 'vue';
import Vuex from 'vuex';
import {IArticleModuleState} from '@/store/modules/article/ArticleModule';
import {IArticleListModuleState} from '@/store/modules/article/ArticleListModule';

Vue.use(Vuex);

export interface IRootState {
  articleModule: IArticleModuleState;
  articleListModule: IArticleListModuleState;
}

export default new Vuex.Store<IRootState>({
});
