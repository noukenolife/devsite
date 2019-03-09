export default class Id<V> {
  protected _value: V;
  public constructor(value: V) {
    this._value = value;
  }
  public get value() { return this._value; }
}
