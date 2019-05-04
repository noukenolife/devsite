import { IArticleListItem } from '@/application/article/IArticleListItem';

export interface IArticleList {
  count: number;
  items: IArticleListItem[];
}
