import { Order } from '@/application/support/Order';

export interface ISortable {
  sortBy: PropertyKey;
  order: Order;
}
