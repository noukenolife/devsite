import { ArticleId } from '@/domain/article/ArticleId';
import { Entity } from '@/domain/support/Entity';

export class Article extends Entity<ArticleId> {

  public constructor(
    protected _id: ArticleId,
    protected _title: string,
    protected _content: string,
    protected _createdAt: Date = new Date(),
    protected _updatedAt: Date = new Date(),
  ) {
    super(_id);
  }

  public get title(): string { return this._title; }
  public get content(): string { return this._content; }
  public get createdAt(): Date { return this._createdAt; }
  public get updatedAt(): Date { return this._updatedAt; }

  public update(title: string = this._title, content: string = this._content) {
    this._title = title;
    this._content = content;
    this._updatedAt = new Date();
  }
}
