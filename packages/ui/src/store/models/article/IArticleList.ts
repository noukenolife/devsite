import {application} from '@devsite/core';
import {IArticleListItem} from '@/store/models/article/IArticleListItem';

export interface IArticleList extends application.article.IArticleList {
  items: Array<IArticleListItem>;
}
