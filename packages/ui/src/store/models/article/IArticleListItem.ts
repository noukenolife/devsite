import {application} from '@devsite/core';
import {ISoftDeletable} from '@/store/models/article/ISoftDeletable';

export interface IArticleListItem
  extends application.article.IArticleListItem, ISoftDeletable {
}
