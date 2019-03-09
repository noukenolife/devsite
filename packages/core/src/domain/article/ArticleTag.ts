import ArticleId from "@/domain/article/ArticleId";
import Entity from "@/domain/support/Entity";
import ArticleTagId from "@/domain/article/ArticleTagId";

export default class ArticleTag extends Entity<ArticleTagId> {
  protected _articleId: ArticleId;
  protected _value: string;

  public constructor(id: ArticleTagId, articleId: ArticleId, value: string) {
    super(id);
    this._articleId = articleId;
    this._value = value;
  }

  get value() { return this._value; }
}
