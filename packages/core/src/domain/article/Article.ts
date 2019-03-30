import { ArticleId } from '@/domain/article/ArticleId';
import { Entity } from '@/domain/support/Entity';

export class Article extends Entity<ArticleId> {
  protected _title: string;
  protected _content: string;
  protected _createdAt: Date;
  protected _updatedAt: Date;

  public constructor(id: ArticleId, title: string, content: string) {
    super(id);
    this._title = title;
    this._content = content;
    this._createdAt = new Date();
    this._updatedAt = new Date();
  }

  public update(title: string = this._title, content: string = this._content) {
    this._title = title;
    this._content = content;
    this._updatedAt = new Date();
  }
}
