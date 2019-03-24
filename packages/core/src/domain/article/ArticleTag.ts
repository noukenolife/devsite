import { ArticleId } from '@/domain/article/ArticleId';
import { ArticleTagId } from '@/domain/article/ArticleTagId';
import { Entity } from '@/domain/support/Entity';

export class ArticleTag extends Entity<ArticleTagId> {
  protected _articleId: ArticleId;
  protected _value: string;

  public constructor(id: ArticleTagId, articleId: ArticleId, value: string) {
    super(id);
    this._articleId = articleId;
    this._value = value;
  }

  get value() { return this._value; }
}
