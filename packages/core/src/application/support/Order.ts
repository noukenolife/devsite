export abstract class Order {
  public readonly value!: string;
}

export class Desc extends Order {
  public readonly value = 'desc';
}
export class Asc extends Order {
  public readonly value = 'asc';
}
