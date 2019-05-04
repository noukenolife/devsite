import { IArticleListCriteria } from '@/application/article/IArticleListCriteria';
import { IArticleList } from '@/application/article/IArticleList';

export interface IArticleListQuery {
  invoke(criteria: IArticleListCriteria): Promise<IArticleList>;
}
