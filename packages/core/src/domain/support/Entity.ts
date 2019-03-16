import Id from '@/domain/support/Id';

export default class Entity<ID extends Id<any>> {
  protected _id: ID;
  public constructor(id: ID) {
    this._id = id;
  }
  public get id() { return this._id; }
}
